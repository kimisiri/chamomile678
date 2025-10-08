import cv2
import os

# Folder containing images
folder_path = "members/"
output_folder = os.path.join(folder_path, "cropped")
os.makedirs(output_folder, exist_ok=True)

crop_size = 200
half_crop = crop_size // 2

def crop_center(event, x, y, flags, param):
    if event == cv2.EVENT_LBUTTONDOWN:
        img, filename = param
        h, w = img.shape[:2]
        
        # Ensure crop doesn't go out of bounds
        x1 = max(x - half_crop, 0)
        y1 = max(y - half_crop, 0)
        x2 = min(x + half_crop, w)
        y2 = min(y + half_crop, h)

        cropped_img = img[y1:y2, x1:x2]
        
        # Save cropped image
        name, ext = os.path.splitext(filename)
        save_path = os.path.join(output_folder, f"{name}_CROPPED{ext}")
        cv2.imwrite(save_path, cv2.resize(cropped_img, (64, 64)))
        print(f"Cropped image saved to {save_path}")

        cv2.destroyAllWindows()  # Close image window after click

# Iterate over all images in the folder
for filename in os.listdir(folder_path):
    if filename.lower().endswith(('.png', '.jpg', '.jpeg', '.bmp', '.tiff')):
        img_path = os.path.join(folder_path, filename)
        img = cv2.imread(img_path)
        
        cv2.imshow(filename, img)
        cv2.setMouseCallback(filename, crop_center, param=(img, filename))
        cv2.waitKey(0)  # Wait until a click is made

cv2.destroyAllWindows()
print("All images processed.")
