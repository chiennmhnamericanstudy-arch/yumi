"""Sample private videos across their duration; no copying to public."""
from pathlib import Path
import json,re,subprocess
from PIL import Image,ImageDraw,ImageFont
import imageio_ffmpeg
root=Path(__file__).resolve().parents[1];out=root/'docs/media-audit'
font=ImageFont.truetype('C:/Windows/Fonts/arial.ttf',17)
for i,r in enumerate(json.loads((out/'VIDEO_REVIEW.json').read_text(encoding='utf-8')),1):
    h,m,s=map(float,re.search(r'Duration: (\d+):(\d+):([\d.]+)',r['probe']).groups()); duration=h*3600+m*60+s
    sheet=Image.new('RGB',(1200,660),'#eeeae2')
    for j in range(9):
        sec=duration*(j+.5)/9
        result=subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-v','error','-ss',str(sec),'-i',str(root/'raw-drive'/r['path']),'-frames:v','1','-vf','scale=390:-1','-f','image2pipe','-vcodec','mjpeg','-'],capture_output=True)
        import io
        im=Image.open(io.BytesIO(result.stdout));im.thumbnail((390,190))
        x=(j%3)*400;y=(j//3)*220;sheet.paste(im,(x,y))
        ImageDraw.Draw(sheet).text((x+8,y+195),f'{int(sec//60):02}:{int(sec%60):02}',font=font,fill='black')
    sheet.save(out/f'video-{i}-storyboard.jpg')
print('Three private nine-frame storyboards generated; no audio transcription performed.')
