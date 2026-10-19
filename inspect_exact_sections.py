import re
with open(r"c:\Users\USER\Downloads\Authentic Handknotted & Hand Woven Rugs From India.html", "r", encoding="utf-8", errors="ignore") as f:
    h = f.read()

# 1. Tapestry of craftsmanship section
idx = h.find("tapestry of craftsmanship")
if idx != -1:
    chunk = h[max(0, idx - 1500):min(len(h), idx + 1500)]
    print("=== TAPESTRY CHUNK ===")
    imgs = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', chunk)
    vids = re.findall(r'<video[^>]+src=["\']([^"\']+)["\']', chunk)
    posters = re.findall(r'poster=["\']([^"\']+)["\']', chunk)
    print("Images:", imgs)
    print("Videos:", vids)
    print("Posters:", posters)

# 2. Threads to Heirlooms / Selecting the perfect threads
idx2 = h.find("Threads to Heirlooms")
if idx2 != -1:
    chunk2 = h[idx2:idx2 + 4000]
    print("\n=== THREADS TO HEIRLOOMS CHUNK ===")
    imgs2 = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', chunk2)
    titles = re.findall(r'class="h3"[^>]*>(.*?)<', chunk2)
    print("Titles:", titles)
    print("Images:", imgs2)

# 3. Products banner
with open(r"c:\Users\USER\Downloads\Products.html", "r", encoding="utf-8", errors="ignore") as f:
    hp = f.read()
idx3 = hp.find("ALL EXCLUSIVE RANGE")
if idx3 != -1:
    chunk3 = hp[max(0, idx3 - 1500):idx3 + 500]
    print("\n=== PRODUCTS BANNER CHUNK ===")
    imgs3 = re.findall(r'<img[^>]+src=["\']([^"\']+)["\']', chunk3)
    bg = re.findall(r'url\(["\']?([^)"\']+)["\']?\)', chunk3)
    print("Images:", imgs3)
    print("Backgrounds:", bg)
