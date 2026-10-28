#!/usr/bin/env python3
"""Publish only editorially approved local images into public/media/approved.
Requirements: pip install Pillow pillow-heif (latter only needed for HEIC/HEIF).
Source folder remains untouched. CSV gates: publish=yes, rights_ok=yes,
privacy_ok=yes, caption nonempty. Reads docs/media-audit/APPROVAL_TEMPLATE.csv.
Use --dry-run to list approved files without writing.
"""
import argparse,csv,hashlib,json,re,sys,unicodedata
from pathlib import Path

APPROVAL_FIELDS=('relative_path','section','publish','rights_ok','privacy_ok','caption')
OK_TYPES={'.jpg','.jpeg','.png','.webp','.heic','.heif','.tif','.tiff','.bmp'}
YES={'yes'}

def slug(s):
    s=s.replace('đ','d').replace('Đ','D')
    s=''.join(c for c in unicodedata.normalize('NFKD',s) if not unicodedata.combining(c))
    s=re.sub('[^a-z0-9]+','-',s.lower()).strip('-')
    return (s[:48].strip('-') or 'image')

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--root',default='raw-drive');p.add_argument('--approval',default='docs/media-audit/APPROVAL_TEMPLATE.csv')
    p.add_argument('--dest',default='public/media/approved');p.add_argument('--json',default='src/data/media.generated.json')
    p.add_argument('--dry-run',action='store_true')
    args=p.parse_args()
    src=Path(args.root).resolve();csvpath=Path(args.approval).resolve();dest=Path(args.dest).resolve();catalog=Path(args.json).resolve()
    if not src.is_dir():sys.exit('ERROR: missing raw-drive folder')
    if not csvpath.is_file():sys.exit('ERROR: missing approval CSV; run audit_drive_assets.py first')
    with csvpath.open('r',encoding='utf-8-sig',newline='') as f:
        rd=csv.DictReader(f);missing=set(APPROVAL_FIELDS)-set(rd.fieldnames or [])
        if missing:sys.exit('ERROR: missing columns '+str(sorted(missing)))
        rows=list(rd)
    approved=[r for r in rows if str(r.get('publish','')).strip().lower() in YES]
    errors=[];work=[];seen=set()
    for i,r in enumerate(approved,1):
        rel=r['relative_path'].strip().replace('\\','/')
        path=(src/rel).resolve()
        try:path.relative_to(src)
        except ValueError:errors.append(f'Line {i}: path traversal: {rel}');continue
        if not path.is_file():errors.append(f'Missing: {rel}');continue
        if path.suffix.lower() not in OK_TYPES:errors.append(f'Not an image: {rel}');continue
        if not all(str(r.get(field,'')).strip().lower() in YES for field in ('rights_ok','privacy_ok')):
            errors.append(f'Needs rights/privacy approval: {rel}');continue
        if len(r.get('caption','').strip())<8:errors.append(f'Needs factual caption (at least 8 chars): {rel}');continue
        if 'watermark' in path.name.lower():errors.append(f'Watermarked asset - replace source: {rel}');continue
        full_hash=hashlib.sha256(path.read_bytes()).hexdigest()
        if r.get('sha256')!=full_hash:errors.append(f'Source changed or not audited: {rel}');continue
        h=full_hash[:10]
        if h in seen:errors.append(f'Duplicate approved image content (keep one): {rel}');continue
        seen.add(h)
        name=f'{slug(r.get("section", "misc"))}--{h}.webp'
        work.append((r,path,dest/name))
    if errors:
        print('ERROR: Cannot continue. Fix these items:')
        for x in errors:print(' -',x)
        sys.exit(2)
    print('Validated approved images:',len(work))
    if args.dry_run:
        for r,path,target in work:print(path,'=>',target)
        return
    if not work:
        if not args.dry_run:
            # Remove only previously generated assets, confined to the target.
            remove_revoked(dest,catalog,set())
            catalog.parent.mkdir(parents=True,exist_ok=True)
            catalog.write_text('[]\n',encoding='utf-8')
        print('No approved images. Empty manifest; preview placeholders remain.')
        return
    try:
        from PIL import Image,ImageOps
    except ImportError:sys.exit('Pillow not installed. Run: python -m pip install pillow pillow-heif')
    if any(p.suffix.lower() in ('.heic','.heif') for _,p,_ in work):
        try:
            from pillow_heif import register_heif_opener
            register_heif_opener()
        except ImportError:sys.exit('HEIC file approved but pillow-heif unavailable: python -m pip install pillow-heif')
    dest.mkdir(parents=True,exist_ok=True);catalog.parent.mkdir(parents=True,exist_ok=True)
    manifest=[]
    for r,path,target in work:
        with Image.open(path) as raw:
            im=ImageOps.exif_transpose(raw);im.thumbnail((2000,2000),Image.Resampling.LANCZOS)
            im=im.convert('RGBA' if 'A' in im.getbands() else 'RGB')
            im.save(target,format='WEBP',quality=84,method=6)
            size=list(im.size)
        manifest.append(dict(src='/media/approved/'+target.name,alt=r['caption'].strip(),
                             section=r['section'].strip(),width=size[0],height=size[1]))
    remove_revoked(dest,catalog,{p.name for _,_,p in work})
    catalog.write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print('Published',len(manifest),'image files to',dest)
    print('Generated image catalog:',catalog)
    print('IMPORTANT: file(s) under public/media are publicly accessible after deployment. Confirm approvals.')
def remove_revoked(dest,catalog,keep):
    if not catalog.exists():return
    for item in json.loads(catalog.read_text(encoding='utf-8')):
        name=Path(item['src']).name
        target=(dest/name).resolve()
        if target.parent==dest.resolve() and name not in keep and target.suffix=='.webp' and target.exists():
            target.unlink()

if __name__=='__main__':main()
