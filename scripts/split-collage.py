# -*- coding: utf-8 -*-
"""Kolaj goruntuyu 3x2 grid olarak 6 ayri fotografa boler."""
import os
from PIL import Image

SRC = r"C:\Users\issan\.cursor\projects\c-Users-issan-OneDrive-ISMAIL-SANLI-lonestar-agro\assets\c__Users_issan_AppData_Roaming_Cursor_User_workspaceStorage_efe1d9b6ee121e5015352eba9ed37cd2_images_image-e2f7c1fd-6d7c-4ecc-a043-97338edf9abb.png"
OUT_DIR = r"c:\Users\issan\OneDrive\ISMAIL_SANLI\lonestar-agro\assets\images"
# 3 sutun, 2 satir = 6 panel
NAMES = [
    "field-irrigation.jpg",      # sol ust: sulama
    "team-garden.jpg",          # orta ust: bahce ekibi
    "lab-scientist.jpg",        # sag ust: lab
    "tablet-control.jpg",       # sol alt: tablet
    "field-agronomists.jpg",    # orta alt: tarla
    "campus-landscape.jpg",     # sag alt: kampus
]

def main():
    os.makedirs(OUT_DIR, exist_ok=True)
    img = Image.open(SRC).convert("RGB")
    w, h = img.size
    cw, rh = w // 3, h // 2
    for row in range(2):
        for col in range(3):
            i = row * 3 + col
            left, top = col * cw, row * rh
            box = (left, top, left + cw, top + rh)
            crop = img.crop(box)
            out_path = os.path.join(OUT_DIR, NAMES[i])
            crop.save(out_path, "JPEG", quality=88)
            print("Saved:", out_path)
    print("Done. 6 images saved to assets/images/")

if __name__ == "__main__":
    main()
