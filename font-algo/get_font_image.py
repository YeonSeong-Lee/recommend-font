import os
from PIL import Image, ImageDraw, ImageFont
from tqdm import tqdm
import threading
from concurrent.futures import ThreadPoolExecutor

def char_to_vector(font_path, font_name, char, image_size=(2000, 80)):
	try:
		font = ImageFont.truetype(font_path, image_size[1] * 3 // 4)
		image = Image.new("L", image_size, color=0)
		draw = ImageDraw.Draw(image)
		width, height = draw.textlength(char, font=font), draw.textbbox((0, 0), char, font=font)[3]
		draw.text(((image_size[0] - width) / 2, (image_size[1] - height) / 2), char, fill=255, font=font)
		image.save(f"font_images/{font_name}/{char}.png")

	except OSError:
		print(f"Error: Font file not found at {font_path}")
		return None
	except Exception as e:
		print(f"An error occurred: {e}")
		return None

def process_font(font_path, chars):
	font_name = os.path.basename(font_path)
	font_output_dir = f"font_images/{font_name}"

	os.makedirs(font_output_dir, exist_ok=True)

	for char in chars:
		char_to_vector(font_path, font_name, char)

def vectorize_fonts_multithreading(font_folder, chars):
	font_paths = [os.path.join(font_folder, f) for f in os.listdir(font_folder) if f.lower().endswith(('woff2'))]
	
	max_threads = 10  # 동시에 실행할 최대 스레드 수 제한
	with ThreadPoolExecutor(max_threads) as executor:
		futures = [executor.submit(process_font, font_path, chars) for font_path in font_paths]

		for future in tqdm(futures, desc="Vectorizing Fonts"):
			future.result()

if __name__ == "__main__":
	font_folder = "../public/fonts"

	chars_to_compare = ["다람쥐 헌 쳇바퀴에 타고파", "닭 콩팥 훔친 집사", "물컵 속 팥 찾던 형", "동틀 녘 햇빛 포개짐", "자동차 바퀴 틈새가 파랗니", "해태 옆 치킨집 닭맛", "코털 팽 대감네 첩 좋소","1234567890", "The quick brown fox jumps over a(the) lazy dog", "Pack my box with five dozen liquor jugs", "Jackdaws love my big sphinx of quartz"]
	# chars_to_compare = ["다람쥐 헌 쳇바퀴에 타고파"]

	if os.path.exists("font_images"):
		os.system("rm -rf font_images")

	vectorize_fonts_multithreading(font_folder, chars_to_compare)
