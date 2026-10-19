from bs4 import BeautifulSoup
import json
import re

# Inspect News.html
with open(r"c:\Users\USER\Downloads\News.html", "r", encoding="utf-8", errors="ignore") as f:
    h_news = f.read()

soup_news = BeautifulSoup(h_news, "html.parser")
articles = []
for art in soup_news.find_all("article"):
    h = art.find(["h2", "h3", "a"])
    p = art.find("p")
    img = art.find("img")
    date_el = art.find(class_=re.compile(r'date|time', re.I))
    articles.append({
        "title": h.get_text(strip=True) if h else "",
        "excerpt": p.get_text(strip=True) if p else "",
        "img": img.get("src") if img else "",
        "date": date_el.get_text(strip=True) if date_el else "October 2026"
    })

print(f"Found {len(articles)} articles in News.html:")
for a in articles[:6]:
    print(" ", a["title"], "| Img:", a["img"])

# Inspect Products.html categories and filters
with open(r"c:\Users\USER\Downloads\Products.html", "r", encoding="utf-8", errors="ignore") as f:
    h_prod = f.read()

soup_prod = BeautifulSoup(h_prod, "html.parser")

filters = {}
for group in soup_prod.find_all(["div", "fieldset"], class_=re.compile(r'facet|filter', re.I)):
    title_el = group.find(["legend", "span", "button", "p"])
    if title_el:
        title = title_el.get_text(strip=True)
        items = [opt.get_text(strip=True) for opt in group.find_all(["label", "span"]) if opt.get_text(strip=True)]
        if title and items:
            filters[title] = items[:6]

print("\nFilters found in Products.html:", list(filters.keys()))

