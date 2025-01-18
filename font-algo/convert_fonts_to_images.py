import os
from PIL import Image, ImageDraw, ImageFont
import sys

def check_font_supports_text(font, text):
    """Check if the font supports all characters in the text."""
    try:
        for char in text:
            # Try to get the glyph for each character
            font.getmask(char)
        return True
    except OSError:
        return False

def render_text_safely(draw, position, text, font, fill='black'):
    """Safely render text, character by character."""
    x, y = position
    for char in text:
        try:
            # Try to render each character individually
            draw.text((x, y), char, fill=fill, font=font)
            # Move x position by the width of the character
            x += draw.textlength(char, font=font)
        except OSError as e:
            print(f"Warning: Could not render character '{char}' - {str(e)}")
            # Skip problematic character and add some space
            x += font.size // 2

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
    "한편 터키 참전 용사, 비밀리 돈 남겨",
    "유쾌했던 땃쥐 토끼풀 쫓기 바쁨",
    "체르노빌 같던 후쿠시마 원전 폭발",
    "파티에 참석한 키다리 부자"
]

# Track successful and failed fonts
successful_fonts = []
failed_fonts = []

# Iterate over all font files in the font directory
for font_file in os.listdir(font_dir):
    if not (font_file.endswith('.ttf') or font_file.endswith('.otf')):
        continue

    font_path = os.path.join(font_dir, font_file)
    font_name = os.path.splitext(font_file)[0]
    
    try:
        # Load the font
        font = ImageFont.truetype(font_path, size=40)
        
        # Create a directory for the font
        font_output_dir = os.path.join(output_dir, font_name)
        os.makedirs(font_output_dir, exist_ok=True)
        
        for i, pangram in enumerate(pangrams):
            # Create an image with white background
            image = Image.new('RGBA', (800, 100), color='white')
            draw = ImageDraw.Draw(image)
            
            try:
                # Get text bounding box
                text_bbox = draw.textbbox((0, 0), pangram, font=font)
                text_width = text_bbox[2] - text_bbox[0]
                text_height = text_bbox[3] - text_bbox[1]
                
                # Calculate position
                position = ((image.width - text_width) // 2, (image.height - text_height) // 2)
                
                # Render text safely
                render_text_safely(draw, position, pangram, font)
                
                # Save the image
                image_path = os.path.join(font_output_dir, f"pangram_{i+1}.png")
                image.save(image_path)
                
            except Exception as e:
                print(f"Error processing pangram {i+1} for font {font_name}: {str(e)}")
                continue
        
        successful_fonts.append(font_name)
        
    except Exception as e:
        print(f"Error processing font {font_name}: {str(e)}")
        failed_fonts.append(font_name)
        continue

# Print summary
print("\nProcessing complete!")
print(f"Successfully processed {len(successful_fonts)} fonts")
print(f"Failed to process {len(failed_fonts)} fonts")

if failed_fonts:
    print("\nFailed fonts:")
    for font in failed_fonts:
        print(f"- {font}")

print("\nFonts have been converted to images and saved in the output_images directory.")
