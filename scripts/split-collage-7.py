# -*- coding: utf-8 -*-
"""7 panelli kolaji 2-3-2 grid olarak boler (ust 2, orta 3, alt 2)."""
import os
from PIL import Image

SRC = r"C:\Users\issan\.cursor\projects\c-Users-issan-OneDrive-ISMAIL-SANLI-lonestar-agro\assets\c__Users_issan_AppData_Roaming_Cursor_User_workspaceStorage_efe1d9b6ee121e5015352eba9ed37cd2_images_image-1af2ae0b-c9ef-4c6e-9815-67c9c9428abe.png"
OUT_DIR = r"c:\Users\issan\OneDrive\ISMAIL_SANLI\lonestar-agro\assets\images"

# 2-3-2: row0 iki panel, row1 uc panel, row2 iki panel
NAMES = [
    "sub-field-irrigation.jpg",    # 0: sulama tarlasi
    "sub-team-consultation.jpg",   # 1: tarla danismanlik
    "sub-lab-research.jpg",       # 2: lab
    "sub-tablet-control.jpg",      # 3: tablet kontrol
    "sub-campus-landscape.jpg",    # 4: kampus
    "sub-field-discussion.jpg",    # 5: tarla tartisma
    "sub-park-community.jpg",     # 6: park / topluluk
]

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    row_h = h // 3
    idx = 0
    # Row 0: 2 panels
    for col in range(2):
        left, top = col * (w // 2), 0
        box = (left, top, left + w // 2, top + row_h)
        crop = img.crop(box)
        crop.save(os.path.join(OUT_DIR, NAMES[idx]), "JPEG", quality=88)
        print("Saved:", NAMES[idx])
        idx += 1
    # Row 1: 3 panels
    for col in range(3):
        left, top = col * (w // 3), row_h
        box = (left, top, left + w // 3, top + row_h)
        crop = img.crop(box)
        crop.save(os.path.join(OUT_DIR, NAMES[idx]), "JPEG", quality=88)
        print("Saved:", NAMES[idx])
        idx += 1
    # Row 2: 2 panels
    for col in range(2):
        left, top = col * (w // 2), row_h * 2
        box = (left, top, left + w // 2, top + row_h)
        crop = img.crop(box)
        crop.save(os.path.join(OUT_DIR, NAMES[idx]), "JPEG", quality=88)
        print("Saved:", NAMES[idx])
        idx += 1
    print("Done. 7 images in assets/images/")

if __name__ == "__main__":
    main()
