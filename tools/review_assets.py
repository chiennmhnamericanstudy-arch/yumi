"""Private visual audit: contact sheets, dimensions, perceptual matches, PDF/video previews."""
from pathlib import Path
import csv, json, subprocess
from PIL import Image, ImageOps, ImageDraw, ImageFont
from pillow_heif import register_heif_opener
import imagehash, pymupdf, imageio_ffmpeg
register_heif_opener()
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'docs/media-audit'
OUT.mkdir(exist_ok=True, parents=True)
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',16)
records=[]
with (OUT/'MEDIA_INVENTORY.csv').open(encoding='utf-8-sig') as f:
    inventory=list(csv.DictReader(f))
images=[(ROOT/'raw-drive'/r['relative_path'],r['category']) for r in inventory if r['media_type']=='image']
images += [(p,'PDF extracted artwork') for p in sorted((ROOT/'assets/art').glob('*')) if p.is_file()]
groups={}
for idx,(p,group) in enumerate(images,1):
    try:
        with Image.open(p) as im:
            im=ImageOps.exif_transpose(im).convert('RGB')
            rec={'id':idx,'path':p.relative_to(ROOT).as_posix(),'group':group,'width':im.width,'height':im.height,'phash':str(imagehash.phash(im)),'low_resolution':min(im.size)<700}
            records.append(rec)
            thumb=ImageOps.contain(im,(270,240))
            tile=Image.new('RGB',(300,300),'#eeeae2');tile.paste(thumb,((300-thumb.width)//2,8))
            d=ImageDraw.Draw(tile);d.text((10,252),f'{idx:03d} | {im.width} x {im.height}',font=font,fill='black')
            d.text((10,277),p.name[:31],font=font,fill='black')
            groups.setdefault(group,[]).append(tile)
    except Exception as e: records.append({'path':str(p),'error':str(e)})
for group,tiles in groups.items():
    for start in range(0,len(tiles),20):
        batch=tiles[start:start+20]; sheet=Image.new('RGB',(1200,300*((len(batch)+3)//4)),'white')
        for j,t in enumerate(batch):sheet.paste(t,((j%4)*300,(j//4)*300))
        sheet.save(OUT/(group.replace(' ','_')+f'-{start//20+1}.jpg'))
(OUT/'VISUAL_INDEX.json').write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8')
raw=[r for r in records if r.get('group')=='Yumi project']; extracted=[r for r in records if r.get('group')=='PDF extracted artwork']
matches=[]
for r in raw:
    best=sorted([(imagehash.hex_to_hash(r['phash'])-imagehash.hex_to_hash(e['phash']),e) for e in extracted],key=lambda x:x[0])[:2]
    matches.append({'original':r['path'],'dimensions':[r['width'],r['height']],'closest':[{'distance':int(d),'path':e['path'],'dimensions':[e['width'],e['height']]} for d,e in best]})
(OUT/'YUMI_COMPARISON.json').write_text(json.dumps(matches,ensure_ascii=False,indent=2),encoding='utf-8')
for p in (ROOT/'raw-drive').rglob('*.pdf'):
    doc=pymupdf.open(p);pages=[]
    for n,page in enumerate(doc):
        pix=page.get_pixmap(matrix=pymupdf.Matrix(.35,.35))
        im=Image.frombytes('RGB',[pix.width,pix.height],pix.samples)
        tile=Image.new('RGB',(300,440),'white'); im.thumbnail((290,405));tile.paste(im,((300-im.width)//2,0))
        ImageDraw.Draw(tile).text((10,415),f'Page {n+1}',font=font,fill='black');pages.append(tile)
    sheet=Image.new('RGB',(1200,440*((len(pages)+3)//4)),'#ddd')
    for j,t in enumerate(pages):sheet.paste(t,((j%4)*300,(j//4)*440))
    sheet.save(OUT/('PDF-'+p.stem+'.jpg'))
    (OUT/('PDF-'+p.stem+'.txt')).write_text('\n'.join(page.get_text() for page in doc),encoding='utf-8')
ffmpeg=imageio_ffmpeg.get_ffmpeg_exe()
video_reports=[]
for n,r in enumerate([r for r in inventory if r['media_type']=='video'],1):
    p=ROOT/'raw-drive'/r['relative_path'];result=subprocess.run([ffmpeg,'-hide_banner','-i',str(p)],capture_output=True,text=True,encoding='utf-8',errors='replace')
    video_reports.append({'path':r['relative_path'],'probe':result.stderr})
    subprocess.run([ffmpeg,'-y','-ss','3','-i',str(p),'-frames:v','1','-vf','scale=800:-1',str(OUT/f'video-{n}.jpg')],capture_output=True)
(OUT/'VIDEO_REVIEW.json').write_text(json.dumps(video_reports,ensure_ascii=False,indent=2),encoding='utf-8')
print(f'Inspected {len(records)} images; {len(matches)} Yumi comparisons. Private contact sheets: {OUT}')
