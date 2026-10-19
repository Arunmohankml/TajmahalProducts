import re

with open(r"c:\Users\USER\Downloads\News.html", "r", encoding="utf-8", errors="ignore") as f:
    hn = f.read()

print("News length:", len(hn))
headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', hn)
print("News headings:", [re.sub(r'<[^>]+>', '', h).strip() for h in headings[:10]])

with open(r"c:\Users\USER\Downloads\Products.html", "r", encoding="utf-8", errors="ignore") as f:
    hp = f.read()

print("\nProducts length:", len(hp))
p_headings = re.findall(r'<h[1-4][^>]*>(.*?)</h[1-4]>', hp)
print("Products headings:", [re.sub(r'<[^>]+>', '', h).strip() for h in p_headings[:15]])

# Look for filter names in Products.html
for term in ["SPACES & STYLING", "RUG MATERIAL", "EXPLORE BY COLORS", "WEAVING TYPE", "SORT BY"]:
    pos = hp.find(term)
    print(f"Term '{term}':", pos)
