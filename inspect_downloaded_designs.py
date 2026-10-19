from bs4 import BeautifulSoup
import re
import os

files = [
    r"c:\Users\USER\Downloads\Authentic Handknotted & Hand Woven Rugs From India.html",
    r"c:\Users\USER\Downloads\News.html",
    r"c:\Users\USER\Downloads\Products.html"
]

for fp in files:
    name = os.path.basename(fp)
    print(f"\n==================== {name} ====================")
    with open(fp, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    soup = BeautifulSoup(content[:100000], "html.parser")
    title = soup.title.string if soup.title else "No title"
    print(f"Title: {title}")
    
    # Fonts
    font_links = [l.get("href") for l in soup.find_all("link") if "font" in str(l.get("href")).lower()]
    print(f"Font links: {font_links}")
    
    # Styles / CSS links
    css_links = [l.get("href") for l in soup.find_all("link", rel="stylesheet")]
    print(f"CSS links: {css_links[:5]}")
    
    # Search for font-family in styles
    fonts_found = set(re.findall(r'font-family:\s*([^;]+);', content, re.IGNORECASE))
    print(f"Font-family matches: {list(fonts_found)[:8]}")
    
    # Navigation items
    nav = soup.find("nav") or soup.find("header")
    if nav:
        nav_links = [a.get_text(strip=True) for a in nav.find_all("a") if a.get_text(strip=True)]
        print(f"Header/Nav links ({len(nav_links)}): {nav_links[:10]}")
    else:
        print("No nav/header found in first 100k")
        
    # Find main sections
    sections = re.findall(r'<section[^>]*class=["\']([^"\']+)["\']', content)
    print(f"Section classes: {sections[:10]}")

