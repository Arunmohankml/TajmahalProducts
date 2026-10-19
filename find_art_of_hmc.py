import re

with open(r"c:\Users\USER\Downloads\Authentic Handknotted & Hand Woven Rugs From India.html", "r", encoding="utf-8", errors="ignore") as f:
    h = f.read()

idx = h.lower().find("art of hmc")
print("Index:", idx)
if idx != -1:
    chunk = h[idx-500:idx+4500]
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', chunk)
    print("Images found:", imgs)
    
# Let's also look for Products banner image in Products.html
with open(r"c:\Users\USER\Downloads\Products.html", "r", encoding="utf-8", errors="ignore") as f:
    hp = f.read()

idx_p = hp.find("collection-banner")
if idx_p != -1:
    chunk_p = hp[idx_p:idx_p+2000]
    imgs_p = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', chunk_p)
    print("Products collection-banner imgs:", imgs_p)
