#!/usr/bin/env python3
"""Inventory a locally downloaded Google Drive folder. No third-party packages.
Usage: python tools/audit_drive_assets.py --root raw-drive
Outputs docs/media-audit/MEDIA_INVENTORY.csv and APPROVAL_TEMPLATE.csv.
Does not copy or publish ANY media.
"""
import argparse,csv,hashlib,collections,os,re,sys,unicodedata
from pathlib import Path

KINDS={'.jpg':'image','.jpeg':'image','.png':'image','.webp':'image','.heic':'image','.heif':'image',
       '.gif':'image','.tif':'image','.tiff':'image','.bmp':'image',
       '.mov':'video','.mp4':'video','.m4v':'video','.avi':'video',
       '.pdf':'pdf'}
EXPECTED={'image':104,'video':3,'pdf':2}
GROUP_HINTS=[('Yumi project',['yumi project','art portfolio']),
             ('Cultural heritage media club',['cultural heritage media club']),
             ('Diary of the Blue Rose',['diary of the blue rose','di thien nguyen','ham can impact day','đi thiện nguyện','hàm cần impact day']),
             ('LHP DEBATE CLUB',['lhp debate club']),
             ('Debate competition',['debate competiton','debate competition']),
             ('Flashmob',['flashmob']),('Film',['film']),('Certificate',['certificate'])]

def norm(s):
    s=s.lower().replace('đ','d')
    return ''.join(c for c in unicodedata.normalize('NFKD',s) if not unicodedata.combining(c))

def group_for(path):
    parts=[norm(t) for t in path.parts[:-1]]
    for name,hints in GROUP_HINTS:
        if any(norm(h) in p for h in hints for p in parts):return name
    return 'UNCLASSIFIED - verify folder location'

def sha256(path):
    h=hashlib.sha256()
    with path.open('rb') as f:
        for block in iter(lambda:f.read(4*1024*1024),b''): h.update(block)
    return h.hexdigest()

def writecsv(path,fields,rows):
    with path.open('w',encoding='utf-8-sig',newline='') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows(rows)

def main():
    p=argparse.ArgumentParser()
    p.add_argument('--root',default='raw-drive',help='Extracted Drive folder, relative to project root')
    p.add_argument('--output',default='docs/media-audit')
    args=p.parse_args()
    src=Path(args.root).resolve();out=Path(args.output).resolve()
    if not src.is_dir():sys.exit(f'ERROR: folder not found: {src}. Extract the entire Drive ZIP first.')
    out.mkdir(parents=True,exist_ok=True)
    rows=[];first_sha={};duplicates=[];watermarked=[];unknown=[]
    for file in sorted(src.rglob('*')):
        if not file.is_file() or file.name.startswith('.') or file.name.lower() in ('thumbs.db','desktop.ini'):continue
        rel=file.relative_to(src).as_posix();typ=KINDS.get(file.suffix.lower(),'other')
        fingerprint=sha256(file) if typ in ('image','video','pdf') else ''
        dup=first_sha.get(fingerprint,'') if fingerprint else ''
        if fingerprint and not dup:first_sha[fingerprint]=rel
        if dup:duplicates.append((rel,dup))
        wm=('watermark' in norm(file.name))
        if wm:watermarked.append(rel)
        if typ=='other':unknown.append(rel)
        row=dict(relative_path=rel,category=group_for(Path(rel)),media_type=typ,extension=file.suffix.lower(),
                 bytes=file.stat().st_size,sha256=fingerprint,duplicate_of=dup,watermark_filename='yes' if wm else 'no')
        rows.append(row)
    fields=list(rows[0]) if rows else ['relative_path','category','media_type','extension','bytes','sha256','duplicate_of','watermark_filename']
    writecsv(out/'MEDIA_INVENTORY.csv',fields,rows)
    # Rescanning must never reset human decisions. Bind retained decisions to
    # the previous inventory hash, so replaced content requires a fresh review.
    old_approval={}
    approval_path=out/'APPROVAL_TEMPLATE.csv'
    if approval_path.exists():
        with approval_path.open(encoding='utf-8-sig',newline='') as f:
            old_approval={r['relative_path']:r for r in csv.DictReader(f)}
    approval=[]
    for r in rows:
        if r['media_type']!='image':continue
        row=dict(relative_path=r['relative_path'],section=r['category'],publish='no',rights_ok='no',privacy_ok='no',
          caption='',notes='Duplicate: '+r['duplicate_of'] if r['duplicate_of'] else ('Watermark: replace with original' if r['watermark_filename']=='yes' else ''),sha256=r['sha256'])
        old=old_approval.get(r['relative_path'])
        if old and old.get('sha256')==r['sha256']:
            for key in ('section','publish','rights_ok','privacy_ok','caption','notes'):row[key]=old.get(key,row[key])
        elif old and old.get('publish','').lower()=='yes':
            row['notes']='Source hash changed or missing; previous decision requires renewed review. '+old.get('notes','')
        approval.append(row)
    writecsv(out/'APPROVAL_TEMPLATE.csv',['relative_path','section','publish','rights_ok','privacy_ok','caption','notes','sha256'],approval)
    c=collections.Counter(x['media_type'] for x in rows)
    groups=collections.Counter(x['category'] for x in rows)
    lines=['# Drive local media audit','',f'Scanned local root: `{src}`','',
           f'Total recognized media: {sum(c.get(t,0) for t in ("image","video","pdf"))}',
           f'Images: {c["image"]} (snapshot 27 Oct 2026: 104)',
           f'Videos: {c["video"]} (snapshot: 3)',f'PDF: {c["pdf"]} (snapshot: 2)',
           f'Unknown types: {c["other"]}',f'Identical-bytes duplicates: {len(duplicates)}','',
           '## Folder categories (includes PDFs and videos)']
    lines+=['- '+k+': '+str(v) for k,v in groups.most_common()]
    lines+=['','## Duplicates (same SHA-256, preserve raw originals)']
    lines+=['- `'+a+'` = `'+b+'`' for a,b in duplicates] or ['- None detected']
    lines+=['','## Watermarked filename flags']
    lines+=['- `'+x+'`' for x in watermarked] or ['- None']
    lines+=['','## Unknown file types']
    lines+=['- `'+x+'`' for x in unknown] or ['- None']
    lines+=['','## Next steps','1. Compare inventory counts with snapshot; investigate deviations, not automatically errors.',
            '2. Open APPROVAL_TEMPLATE.csv in Excel or VS Code, choose only the approved image rows.',
            '3. Set publish=yes AND rights_ok=yes AND privacy_ok=yes; provide a factual caption. Save as UTF-8 CSV.',
            '4. Run `python tools/prepare_approved_assets.py` only after permission review.',
            '5. Do not publish .mov videos, unapproved portraits or images of minors.']
    (out/'MEDIA_AUDIT.md').write_text('\n'.join(lines)+'\n',encoding='utf-8')
    print('Media scan complete:',src)
    print('Recognized:',dict(c),'Total:',len(rows),'Exact duplicates:',len(duplicates))
    print('Inventory:',out/'MEDIA_INVENTORY.csv')
    print('Approval sheet:',out/'APPROVAL_TEMPLATE.csv')
    for k in ('image','video','pdf'):
        if c[k] != EXPECTED[k]:print('NOTE:',k,'count differs from last verified Google Drive snapshot:',EXPECTED[k])
    if not rows:sys.exit('No files found. Check raw-drive folder placement.')

if __name__=='__main__':main()
