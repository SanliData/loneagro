"""
Remove bright glow/halo from center of Lonestar Agro logo (flower area).
Output: assets/logo.png
"""
from PIL import Image
import os

img_path = os.path.join(os.path.dirname(__file__), "..", "assets", "logo-original.png")
out_path = os.path.join(os.path.dirname(__file__), "..", "assets", "logo.png")

img = Image.open(img_path).convert("RGBA")
pixels = img.load()
w, h = img.size
cx, cy = w // 2, h // 2

# Center region (flower + glow): ellipse radii ~ 25% of image
rx, ry = int(w * 0.28), int(h * 0.28)

for y in range(h):
    for x in range(w):
        # Only process inside ellipse around center
        dx = (x - cx) / rx if rx else 0
        dy = (y - cy) / ry if ry else 0
        if dx*dx + dy*dy > 1:
            continue
        r, g, b, a = pixels[x, y]
        # Bright white/light pixels (glow) -> soften toward grass green
        luminance = (r + g + b) / 3
        if luminance > 230 and (r > 200 and g > 200 and b > 200):
            # Blend toward darker green to remove glow, keep flower shape
            blend = min(1.0, (luminance - 230) / 25.0)  # only strongest glow
            new_r = int(r * (1 - blend * 0.7) + 60 * blend * 0.7)
            new_g = int(g * (1 - blend * 0.5) + 100 * blend * 0.5)
            new_b = int(b * (1 - blend * 0.7) + 40 * blend * 0.7)
            pixels[x, y] = (min(255, new_r), min(255, new_g), min(255, new_b), a)

img.save(out_path, "PNG")
print("Saved:", out_path)
