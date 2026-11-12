#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
ファビコン一式を「E」の文字で作り直す（2026-11-12 本人指示「コーヒー豆でなく、シンプルにアルファベットの E に」）。

  python3 scripts/make_favicon.py

書体はサイトのロゴ・見出しと同じ Cormorant Garamond（600）。
SVG は文字を図形（path）にして埋め込むので、書体が入っていない端末でも同じ形で出る。
色は旧アイコンと同じ: 地 #f8f5f0（生成り）／文字 #7a5a45（茶）。
"""
import io, pathlib
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
from PIL import Image, ImageDraw, ImageFont

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "favicons"
WOFF = ROOT / "node_modules/@fontsource/cormorant-garamond/files/cormorant-garamond-latin-600-normal.woff"
BG, FG = "#f8f5f0", "#7a5a45"

font = TTFont(WOFF)
glyphs = font.getGlyphSet()
name = font.getBestCmap()[ord("E")]
bp = BoundsPen(glyphs); glyphs[name].draw(bp)
x0, y0, x1, y1 = bp.bounds
pen = SVGPathPen(glyphs); glyphs[name].draw(pen)

# ── SVG（100×100 の円の中に E。高さを 60 にそろえて中央に置く）──
scale = 60 / (y1 - y0)
tx = 50 - (x0 + x1) / 2 * scale
ty = 50 + (y0 + y1) / 2 * scale
svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
	<circle cx="50" cy="50" r="50" fill="{BG}" />
	<path transform="translate({tx:.2f} {ty:.2f}) scale({scale:.5f} -{scale:.5f})" fill="{FG}" d="{pen.getCommands()}" />
</svg>
'''
(OUT / "favicon.svg").write_text(svg, encoding="utf-8")

# ── PNG / ICO（woff を ttf にして PIL で描く）──
font.flavor = None
buf = io.BytesIO(); font.save(buf)


def draw(size, round_bg, ratio):
    """size px の画像。round_bg=True は円い地、False は全面の地（iOS・Android が角を丸める）"""
    S = size * 4  # 4倍で描いて縮める（小さい大きさでも縁がなめらか）
    im = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    if round_bg:
        d.ellipse((0, 0, S - 1, S - 1), fill=BG)
    else:
        d.rectangle((0, 0, S, S), fill=BG)
    f = ImageFont.truetype(io.BytesIO(buf.getvalue()), 10)
    # 字の高さが S*ratio になる大きさを求める
    l, t, r, b = f.getbbox("E"); px = 10 * (S * ratio) / (b - t)
    f = ImageFont.truetype(io.BytesIO(buf.getvalue()), round(px))
    l, t, r, b = f.getbbox("E")
    d.text(((S - (r - l)) / 2 - l, (S - (b - t)) / 2 - t), "E", font=f, fill=FG)
    return im.resize((size, size), Image.LANCZOS)


draw(96, True, 0.60).save(OUT / "favicon-96x96.png")
draw(180, False, 0.50).convert("RGB").save(OUT / "apple-touch-icon.png")
draw(192, False, 0.44).convert("RGB").save(OUT / "web-app-manifest-192x192.png")  # maskable: 安全域の内側に収める
draw(512, False, 0.44).convert("RGB").save(OUT / "web-app-manifest-512x512.png")
ico = draw(48, True, 0.68)
ico.save(OUT / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
print("done:", sorted(p.name for p in OUT.iterdir()))
