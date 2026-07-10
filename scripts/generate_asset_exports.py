from pathlib import Path
from urllib.request import Request, urlopen
from PIL import Image, ImageDraw, ImageFont, ImageOps
from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen.canvas import Canvas

ROOT = Path(__file__).parents[1] / "public" / "assets" / "exports"
NAVY, BLUE, TEAL, GOLD, PAPER, INK = "#1c2c44", "#2c4263", "#3d8c8f", "#d6b055", "#ffffff", "#111827"
DISCLAIMER = "Independent Concept - created by Ger'Quia Abner. Not official Precision Management collateral."

def font(size, bold=False):
    try: return ImageFont.truetype("arialbd.ttf" if bold else "arial.ttf", size)
    except OSError: return ImageFont.load_default()

def draw_preview(name, title, kicker, size=(1400, 900), accent=GOLD):
    image = Image.new("RGB", size, PAPER); d = ImageDraw.Draw(image)
    w, h = size; d.rectangle((0, 0, w, 92), fill=NAVY); d.rectangle((0, 92, w, 104), fill=accent)
    logo = Image.open(ROOT / "source-images" / "official-logo.png").convert("RGBA")
    logo.thumbnail((80, 80)); image.paste(logo, (70, 130), logo)
    d.text((175, 166), "PRECISION MANAGEMENT", font=font(21, True), fill=NAVY)
    d.text((70, 270), kicker.upper(), font=font(18, True), fill=TEAL)
    d.text((70, 315), title, font=font(46, True), fill=NAVY)
    d.rectangle((70, 400, w - 70, 405), fill=GOLD)
    photo = Image.open(ROOT / "source-images" / "hero-atlanta.jpg").convert("RGB")
    photo = ImageOps.fit(photo, (int(w*.56), h-520), method=Image.Resampling.LANCZOS)
    image.paste(photo, (70, 450))
    d.rectangle((int(w*.64), 450, w-70, h-120), fill=NAVY)
    d.text((int(w*.67), 500), "COMPREHENSIVE", font=font(23, True), fill="#ffffff")
    d.text((int(w*.67), 535), "MANAGEMENT.", font=font(30, True), fill=GOLD)
    d.text((int(w*.67), 595), "80+ properties", font=font(17), fill="#ffffff")
    d.text((int(w*.67), 630), "11,000+ units", font=font(17), fill="#ffffff")
    d.text((int(w*.67), 665), "20+ years", font=font(17), fill="#ffffff")
    d.text((70, h-68), DISCLAIMER, font=font(14), fill=BLUE)
    image.save(ROOT / "previews" / name, "WEBP", quality=92)

def pdf(filename, title, subtitle, columns):
    # Browser print routes are the canonical PDF source; this script only generates raster and logo assets.
    return
    path = ROOT / filename; path.parent.mkdir(parents=True, exist_ok=True)
    c = Canvas(str(path), pagesize=letter); w, h = letter
    c.setFillColor(HexColor(NAVY)); c.rect(0, h-88, w, 88, fill=1, stroke=0)
    c.setFillColor(HexColor(GOLD)); c.rect(54, h-124, 85, 5, fill=1, stroke=0)
    c.setFillColor(white); c.roundRect(48, h-76, 46, 46, 4, fill=1, stroke=0)
    c.drawImage(str(ROOT / "source-images" / "official-logo.png"), 53, h-71, width=36, height=36, preserveAspectRatio=True, anchor="c", mask="auto")
    c.setFillColor(white); c.setFont("Helvetica-Bold", 16); c.drawString(108, h-54, "PRECISION MANAGEMENT")
    c.setFillColor(HexColor(NAVY)); c.setFont("Helvetica-Bold", 30); c.drawString(54, h-180, title)
    c.setFillColor(HexColor(BLUE)); c.setFont("Helvetica", 12); c.drawString(54, h-205, subtitle)
    c.drawImage(str(ROOT / "source-images" / "hero-atlanta.jpg"), 330, h-370, width=228, height=125, preserveAspectRatio=True, anchor="c", mask="auto")
    y = h-265
    for heading, body in columns:
        c.setFillColor(HexColor(TEAL)); c.setFont("Helvetica-Bold", 11); c.drawString(54, y, heading.upper())
        c.setFillColor(HexColor(INK)); c.setFont("Helvetica", 11)
        text = c.beginText(54, y-20); text.setLeading(16)
        for line in body: text.textLine(line)
        c.drawText(text); y -= 95
    c.setStrokeColor(HexColor(GOLD)); c.line(54, 58, w-54, 58)
    c.setFillColor(HexColor(BLUE)); c.setFont("Helvetica", 7); c.drawString(54, 42, DISCLAIMER)
    c.save()

def logo(name, contents):
    (ROOT / "logo-system" / name).write_text(contents, encoding="utf-8")

def main():
    for folder in ["brand-guidelines", "logo-system", "owner-acquisition", "resident-communication", "print-collateral", "digital-marketing", "website-ui", "previews", "source-images"]: (ROOT / folder).mkdir(parents=True, exist_ok=True)
    official_logo = urlopen(Request("https://precisionmngmt.com/assets/pm-logo-bKw79Q51.svg", headers={"User-Agent": "Mozilla/5.0"})).read()
    (ROOT / "logo-system" / "precision-management-official-logo.svg").write_bytes(official_logo)
    for url, filename in [("https://precisionmngmt.com/assets/hero-atlanta-DFBqbnJA.jpg", "hero-atlanta.jpg")]:
        (ROOT / "source-images" / filename).write_bytes(urlopen(Request(url, headers={"User-Agent": "Mozilla/5.0"})).read())
    svg_open = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 180">'
    primary = svg_open + '<rect width="640" height="180" fill="#ffffff"/><rect x="24" y="24" width="132" height="132" fill="#1c2c44"/><path d="M72 55h43c24 0 38 14 38 34 0 22-16 36-40 36H96v29H72V55zm24 20v30h16c11 0 17-5 17-15s-6-15-17-15H96z" fill="#d6b055"/><text x="184" y="88" font-family="Arial,sans-serif" font-size="40" font-weight="700" fill="#1c2c44">PRECISION</text><text x="187" y="122" font-family="Arial,sans-serif" font-size="22" letter-spacing="7" fill="#2c4263">MANAGEMENT</text></svg>'
    logo("primary-logo.svg", primary); logo("horizontal-logo.svg", primary); logo("monogram.svg", svg_open + '<rect width="180" height="180" fill="#1c2c44"/><path d="M50 42h55c30 0 48 18 48 45 0 29-21 47-50 47H80v34H50V42zm30 25v42h21c14 0 21-7 21-21s-7-21-21-21H80z" fill="#d6b055"/></svg>'); logo("one-color-logo.svg", primary.replace("#d6b055", "#1c2c44")); logo("reversed-logo.svg", primary.replace('#ffffff', '#1c2c44').replace('#1c2c44', '#ffffff', 1).replace('#2c4263', '#ffffff'))
    (ROOT / "logo-system" / "README.md").write_text("# Logo system\n\n`precision-management-official-logo.svg` is the official mark supplied from precisionmngmt.com and used in this independent proof-of-work presentation. The remaining concept marks were created by Ger'Quia Abner and are not official Precision Management assets.\n", encoding="utf-8")
    previews = [("brand-guidelines-preview.webp", "Brand guidelines", "System reference"), ("owner-one-sheet-preview.webp", "Owner acquisition", "Owner one-sheet"), ("resident-notice-preview.webp", "Resident communication", "Maintenance notice"), ("business-card-preview.webp", "Business card", "Print collateral"), ("letterhead-preview.webp", "Corporate letterhead", "Print collateral"), ("linkedin-post-preview.webp", "Precision at scale", "LinkedIn owner campaign"), ("email-header-preview.webp", "Owner update", "Email header"), ("website-hero-preview.webp", "Property management, with clear next steps.", "Website hero"), ("mobile-ui-preview.webp", "Owner and resident paths", "Mobile UI")]
    for item in previews: draw_preview(*item)
    pdf("website-ui/website-ui-concept.pdf", "Website/UI Concept", "A website concept organized around the company’s actual service paths.", [("Owner path", ["Work With Us: assessment, proposal, onboarding, and ongoing excellence."]), ("Resident path", ["Find resident support and clear service information."]), ("Portfolio context", ["Multifamily management across conventional, student, and affordable housing."])])

if __name__ == "__main__": main()
