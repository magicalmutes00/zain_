"""Generate optimized web assets from the official ZAIN logo files in src/assets/.
Originals are preserved untouched. Run from repo root: python scripts/make_brand_assets.py"""
import base64
import io
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "src", "assets")
OUT = os.path.join(ROOT, "public", "assets")
os.makedirs(OUT, exist_ok=True)

FULL = os.path.join(SRC, "zain_logo-removebg.png")  # transparent full logo 1080x588
MARK = os.path.join(SRC, "zain z logo.png")         # transparent Z mark 339x365

# 1) Header/footer logo — width 720 (displayed ~130-150px, plenty for 2x+)
logo = Image.open(FULL).convert("RGBA")
w720 = logo.resize((720, round(logo.height * 720 / logo.width)), Image.LANCZOS)
logo_png = os.path.join(OUT, "zain-logo.png")
w720.save(logo_png, optimize=True)
print("zain-logo.png", w720.size, os.path.getsize(logo_png), "bytes")
logo_webp = os.path.join(OUT, "zain-logo.webp")
w720.save(logo_webp, "WEBP", quality=92, method=6)
print("zain-logo.webp", os.path.getsize(logo_webp), "bytes")

# 2) Favicon mark — square canvas, centered, transparent
mark = Image.open(MARK).convert("RGBA")
side = 160
scale = min(side / mark.width, side / mark.height)
m = mark.resize((round(mark.width * scale), round(mark.height * scale)), Image.LANCZOS)
canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
canvas.paste(m, ((side - m.width) // 2, (side - m.height) // 2), m)
mark_png = os.path.join(OUT, "zain-z-mark.png")
canvas.save(mark_png, optimize=True)
print("zain-z-mark.png", canvas.size, os.path.getsize(mark_png), "bytes")

# 3) favicon.ico (32 + 16) from the same official mark
ico_path = os.path.join(ROOT, "public", "favicon.ico")
canvas.save(ico_path, sizes=[(32, 32), (16, 16)])
print("favicon.ico", os.path.getsize(ico_path), "bytes")

# 4) OG cover — navy canvas + official logo + orange accent (derived, no redrawn text/logo)
NAVY = (12, 49, 89)
ORANGE = (248, 155, 39)
og = Image.new("RGBA", (1200, 630), NAVY + (255,))
lw = 640
lg = w720.resize((lw, round(w720.height * lw / w720.width)), Image.LANCZOS)
og.paste(lg, ((1200 - lw) // 2, (630 - lg.height) // 2 - 30), lg)
og_new = Image.new("RGBA", (1200, 18), ORANGE + (255,))
og.alpha_composite(og_new, (0, 630 - 18))
# small caption using a Windows system font (decorative text only, not the logo)
try:
    from PIL import ImageDraw, ImageFont
    font = ImageFont.truetype(r"C:\Windows\Fonts\segoeuib.ttf", 34)
    draw = ImageDraw.Draw(og)
    text = "Fire Detection & Protection  ·  Electrical  ·  Plumbing  ·  CCTV  ·  LPG  ·  Oman"
    tb = draw.textbbox((0, 0), text, font=font)
    draw.text(((1200 - (tb[2] - tb[0])) // 2, 545), text, font=font, fill=(210, 224, 240, 255))
except Exception as e:  # font optional
    print("caption skipped:", e)
og_png = os.path.join(ROOT, "public", "og-cover.png")
og.convert("RGB").save(og_png, optimize=True)
print("og-cover.png", os.path.getsize(og_png), "bytes")

# 5) embed logo (base64) into og-cover.svg removed — png used instead
print("done")
