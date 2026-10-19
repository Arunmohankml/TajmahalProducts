import os
import re
import base64
import json

html_path = r"c:\Users\USER\Downloads\FIXED ONE.html"
with open(html_path, "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

print("HTML read successfully.")

base_out_dir = r"c:\Users\USER\Desktop\client\Tajmahalproducts\public"
os.makedirs(base_out_dir, exist_ok=True)

scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Total script tags: {len(scripts)}")

# 1. Extract ASSETS from Script 6
s6 = scripts[6]
asset_matches = re.findall(r'"(images/[^"]+)"\s*:\s*"data:image/([^;]+);base64,([^"]+)"', s6)
print(f"Total assets found in Script 6: {len(asset_matches)}")

for rel_path, img_type, b64_str in asset_matches:
    full_path = os.path.join(base_out_dir, rel_path.replace("/", os.sep))
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    try:
        data = base64.b64decode(b64_str)
        with open(full_path, "wb") as img_f:
            img_f.write(data)
    except Exception as e:
        print(f"Error saving {rel_path}: {e}")

print("Script 6 assets saved.")

# 2. Extract body base64 images
img_tags = re.findall(r'<img[^>]+>', html)
site_images = {}
for i, tag in enumerate(img_tags):
    src_m = re.search(r'src="data:image/([^;]+);base64,([^"]+)"', tag)
    alt_m = re.search(r'alt="([^"]*)"', tag)
    if src_m:
        img_type = src_m.group(1)
        b64_str = src_m.group(2)
        alt = alt_m.group(1) if alt_m else f"image_{i}"
        safe_name = re.sub(r'[^a-zA-Z0-9_\-]', '_', alt)[:35].strip('_') or f"img_{i}"
        filename = f"images/site/{safe_name}.{img_type.replace('jpeg','jpg')}"
        full_path = os.path.join(base_out_dir, filename.replace("/", os.sep))
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        try:
            data = base64.b64decode(b64_str)
            with open(full_path, "wb") as img_f:
                img_f.write(data)
            site_images[f"img_{i}"] = f"/{filename}"
            print(f"Saved body img #{i} -> /{filename}")
        except Exception as e:
            print(f"Error saving body img #{i}: {e}")

# 3. Extract KAZZAK_PHOTOS from Script 0
s0 = scripts[0]
kaz_idx = s0.find("KAZZAK_PHOTOS")
kazzak_items = []
if kaz_idx != -1:
    kaz_end = s0.find("];", kaz_idx)
    kaz_chunk = s0[kaz_idx:kaz_end]
    kaz_entries = re.findall(r'img:\s*"data:image/([^;]+);base64,([^"]+)",\s*color:\s*[\'"]([^\'"]+)[\'"]', kaz_chunk)
    print(f"Kazzak entries found: {len(kaz_entries)}")
    for idx, (img_type, b64_str, color) in enumerate(kaz_entries):
        filename = f"images/kazzak/kazzak_{idx+1:02d}.jpg"
        full_path = os.path.join(base_out_dir, filename.replace("/", os.sep))
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        try:
            data = base64.b64decode(b64_str)
            with open(full_path, "wb") as img_f:
                img_f.write(data)
            kazzak_items.append({
                "idx": idx + 1,
                "title": f"Kazzak – {color}",
                "img": f"/{filename}",
                "size": "Dimensions on request",
                "color": color,
                "price": "Price on request",
                "material": "100% Hand-Spun Wool",
                "weave": "Hand-Knotted",
                "finish": "Traditional Herbal Wash",
                "style": "Caucasian / Geometric Medallion",
                "info": f"A hand-knotted Kazzak carpet in a {color} colourway, woven with dense tribal medallions in the Caucasian style."
            })
        except Exception as e:
            print(f"Error saving Kazzak {idx}: {e}")

# Save kazzak items to a json file
with open(os.path.join(base_out_dir, "kazzak_items.json"), "w", encoding="utf-8") as f:
    json.dump(kazzak_items, f, indent=2)

print(f"Kazzak photos extracted: {len(kazzak_items)}")

# 4. Check all other collections in scripts
print("\n--- Inspecting Script 2, 3, 4, 5 ---")
# Script 2: Kashan P-109
print("Script 2 sample:")
print(scripts[2][:300])

# Let's inspect the entire text content of the HTML body to extract all text, history, certifications, contacts, etc.
