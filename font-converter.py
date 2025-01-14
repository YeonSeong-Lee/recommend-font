from PIL import Image, ImageDraw, ImageFont
import numpy as np
import json
import os
from tqdm import tqdm

def char_to_vector(font_path, char, image_size=(64, 64)):
    try:
        font = ImageFont.truetype(font_path, image_size[1] * 3 // 4)
        image = Image.new("L", image_size, color=0)
        draw = ImageDraw.Draw(image)
        width, height = draw.textlength(char, font=font), draw.textbbox((0, 0), char, font=font)[3]
        draw.text(((image_size[0] - width) / 2, (image_size[1] - height) / 2), char, fill=255, font=font)
        return np.array(image).flatten().tolist() # JSON 저장을 위해 list로 변환
    except OSError:
        print(f"Error: Font file not found at {font_path}")
        return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def vectorize_fonts(font_folder, output_json, chars):
    """폰트 폴더 내의 모든 폰트를 벡터화하여 JSON 파일로 저장합니다."""
    font_paths = [os.path.join(font_folder, f) for f in os.listdir(font_folder) if f.lower().endswith(('.ttf', '.otf'))]
    font_vectors = {}

    for font_path in tqdm(font_paths, desc="Vectorizing Fonts"):
        font_name = os.path.basename(font_path)
        font_vectors[font_name] = {}
        for char in chars:
            vector = char_to_vector(font_path, char)
            if vector is not None:
                font_vectors[font_name][char] = vector
            else:
                print(f"Warning: Could not vectorize '{char}' in {font_name}")

    with open(output_json, 'w', encoding='utf-8') as f:
        json.dump(font_vectors, f, separators=(',', ':'), ensure_ascii=False) # ensure_ascii=False 추가

def load_font_vectors(json_path):
    """JSON 파일에서 폰트 벡터 데이터를 로드합니다."""
    try:
        with open(json_path, 'r', encoding='utf-8') as f:
            font_vectors = json.load(f)
            return font_vectors
    except FileNotFoundError:
        print(f"Error: JSON file not found at {json_path}")
        return None
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {json_path}")
        return None

# 사용 예시 (벡터화 및 저장)
font_folder = "public/fonts"
output_json = "font_vectors.json"
# Range for Latin letters 'A' to 'z'
latin_letters = [chr(i) for i in range(ord('A'), ord('z') + 1)]

# Range for Korean Hangul consonants ㄱ (U+3131) to ㅎ (U+314E)
# The range end value should be one more than the last code point, hence 0x314F.
korean_consonants = [chr(i) for i in range(0x3131, 0x314F)]

# Range for Korean Hangul vowels ㅏ (U+314F) to ㅣ (U+3163)
# Similarly, use 0x3164 as the end value since range is end-exclusive.
korean_vowels = [chr(i) for i in range(0x314F, 0x3164)]

# Combine all three lists into one
chars_to_compare = latin_letters + korean_consonants + korean_vowels


vectorize_fonts(font_folder, output_json, chars_to_compare)

# 사용 예시 (JSON 로드 및 비교)
loaded_vectors = load_font_vectors(output_json)

if loaded_vectors:
    print("폰트 벡터 로드 완료")
    # 이제 loaded_vectors를 사용하여 폰트 비교를 수행할 수 있습니다.
    # 예: loaded_vectors["Pretendard-Regular.ttf"]["A"]
else:
    print("폰트 벡터 로드 실패")