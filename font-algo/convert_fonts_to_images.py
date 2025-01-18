import os
from PIL import Image, ImageDraw, ImageFont

# Directory containing font files
font_dir = '../public/fonts/'
# Directory to save images
output_dir = 'output_images/'

# Create output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# List of pangrams to render
pangrams = [
    "다람쥐 헌 쳇바퀴에 타고파",
    "동틀 녘 햇빛 포개짐",
    "한폍 터키 참전 용사, 비밀리 돈 남겨",
    "유쾌했던 땃쥐 토끼풀 쫓기 바쁨",
    "체르노빌 같던 후쿠시마 원전 폭발",
    "파티에 참석한 키다리 부자"
]

# Iterate over all font files in the font directory
for font_file in os.listdir(font_dir):
    if font_file.endswith('.ttf') or font_file.endswith('.otf'):
        font_path = os.path.join(font_dir, font_file)
        font_name = os.path.splitext(font_file)[0]
        
        # Create a directory for the font
        font_output_dir = os.path.join(output_dir, font_name)
        os.makedirs(font_output_dir, exist_ok=True)
        
        # Load the font
        font = ImageFont.truetype(font_path, size=40)
        
        for i, pangram in enumerate(pangrams):
            # Create an image with white background
            image = Image.new('RGB', (800, 100), color='white')
            draw = ImageDraw.Draw(image)
            
            # Get text bounding box
            text_bbox = draw.textbbox((0, 0), pangram, font=font)
            text_width = text_bbox[2] - text_bbox[0]
            text_height = text_bbox[3] - text_bbox[1]
            
            # Calculate position
            position = ((image.width - text_width) // 2, (image.height - text_height) // 2)
            
            # Draw text on image
            draw.text(position, pangram, fill='black', font=font)
            
            # Save the image
            image_path = os.path.join(font_output_dir, f"pangram_{i+1}.png")
            image.save(image_path)

print("Fonts have been converted to images and saved in the output_images directory.")
