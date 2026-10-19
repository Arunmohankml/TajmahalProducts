from bs4 import BeautifulSoup
import re
import os

fp_home = r"c:\Users\USER\Downloads\Authentic Handknotted & Hand Woven Rugs From India.html"
with open(fp_home, "r", encoding="utf-8", errors="ignore") as f:
    html_home = f.read()

soup_home = BeautifulSoup(html_home, "html.parser")

print("=== SEARCHING ART OF HMC ===")
for sec in soup_home.find_all("section"):
    txt = sec.get_text()
    if "ART OF HMC" in txt or "Art of HMC" in txt or "art of hmc" in txt:
        print("Found section with ART OF HMC!")
        imgs = [img.get("src") for img in sec.find_all("img")]
        print("Images in this section:", imgs)
        for p in sec.find_all(["p", "h2", "h3", "h4"]):
            print("  Text:", p.get_text(strip=True)[:100])

print("\n=== SEARCHING TAPESTRY OF CRAFTSMANSHIP ===")
for sec in soup_home.find_all("section"):
    txt = sec.get_text()
    if "TAPESTRY OF CRAFTSMANSHIP" in txt:
        print("Found section with TAPESTRY OF CRAFTSMANSHIP!")
        imgs = [img.get("src") for img in sec.find_all("img")]
        video = [v.get("src") or v.get("poster") for v in sec.find_all("video")]
        print("Images:", imgs)
        print("Videos:", video)

print("\n=== SEARCHING CRAFTED WITH SKILL ===")
for sec in soup_home.find_all("section"):
    txt = sec.get_text()
    if "CRAFTED WITH SKILL" in txt:
        print("Found section with CRAFTED WITH SKILL!")
        imgs = [img.get("src") for img in sec.find_all("img")]
        print("Images:", imgs)

fp_prod = r"c:\Users\USER\Downloads\Products.html"
with open(fp_prod, "r", encoding="utf-8", errors="ignore") as f:
    html_prod = f.read()
soup_prod = BeautifulSoup(html_prod, "html.parser")

print("\n=== SEARCHING PRODUCTS BANNER ===")
for sec in soup_prod.find_all("section"):
    txt = sec.get_text()
    if "ALL EXCLUSIVE RANGE" in txt or "PRODUCTS" in txt:
        imgs = [img.get("src") for img in sec.find_all("img")]
        print("Products banner section images:", imgs)

fp_news = r"c:\Users\USER\Downloads\News.html"
with open(fp_news, "r", encoding="utf-8", errors="ignore") as f:
    html_news = f.read()
soup_news = BeautifulSoup(html_news, "html.parser")

print("\n=== NEWS / RUG JOURNAL POSTS ===")
for article in soup_news.find_all(["article", "div"], class_=re.compile(r'article|blog', re.I))[:5]:
    h = article.find(["h2", "h3", "a"])
    img = article.find("img")
    if h:
        print("Blog post:", h.get_text(strip=True), "Img:", img.get("src") if img else "None")

