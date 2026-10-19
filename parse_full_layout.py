from bs4 import BeautifulSoup
import re
import os

fp = r"c:\Users\USER\Downloads\Authentic Handknotted & Hand Woven Rugs From India.html"
with open(fp, "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

print("=== HEADER ===")
header = soup.find("header") or soup.find("nav")
if header:
    print(header.prettify()[:2500])

print("\n=== ANNOUNCEMENT BAR ===")
ann = soup.find(class_=re.compile(r'announcement', re.I))
if ann:
    print(ann.get_text(strip=True))

print("\n=== SECTIONS IN HOME PAGE ===")
for sec in soup.find_all("section"):
    cls = sec.get("class", [])
    h2 = sec.find(["h1", "h2", "h3", "h4"])
    h_text = h2.get_text(strip=True) if h2 else ""
    print(f"Section {cls} -> Heading: '{h_text}'")

print("\n=== FOOTER ===")
footer = soup.find("footer")
if footer:
    print(footer.prettify()[:2000])

