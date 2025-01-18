from PIL import Image, ImageDraw, ImageFont
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
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
# ... (이전 코드의 char_to_vector 함수 포함)

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

def compare_font_with_json(json_path, target_font_path, chars):
    """JSON 데이터와 타겟 폰트를 비교하고, MSE 순으로 정렬하여 반환합니다."""
    loaded_vectors = load_font_vectors(json_path)
    if loaded_vectors is None:
        return None

    target_similarities = []
    for char in tqdm(chars, desc="Comparing Characters"):
        target_vector = char_to_vector(target_font_path, char)
        if target_vector is None or np.all(np.array(target_vector) == 0):
            continue

        char_mse = []
        for font_name, vectors in loaded_vectors.items():
            if char in vectors:
                vector = np.array(vectors[char])
                if np.all(vector == 0):
                    char_mse.append(float('inf'))
                    continue
                try:
                    # MSE 계산
                    mse = np.mean((np.array(target_vector) - vector) ** 2)
                    char_mse.append(mse)
                except ValueError as e:
                    print(f"ValueError: {e}, char: {char}")
                    char_mse.append(float('inf'))
                    continue
            else:
                char_mse.append(float('inf'))
        target_similarities.append(char_mse)
    
    average_mse = []
    font_names = []
    for i, font_name in enumerate(loaded_vectors):
        font_names.append(font_name)
        char_mse_for_font = [mse[i] for mse in target_similarities if len(mse) > i and mse[i] != float('inf')]
        if char_mse_for_font:
            avg_mse = np.mean(char_mse_for_font)
            average_mse.append(avg_mse)
        else:
            average_mse.append(float('inf'))

    # MSE와 폰트 이름을 튜플로 묶기
    font_mse_pairs = []
    for i, mse in enumerate(average_mse):
        if mse != float('inf'):
            font_mse_pairs.append((font_names[i], mse))

    # MSE 오름차순으로 정렬 (MSE가 낮을수록 더 유사)
    sorted_mse = sorted(font_mse_pairs, key=lambda x: x[1])
    
    return sorted_mse

def recommend_top_3_fonts(json_path, target_font_path, chars):
    sorted_mse = compare_font_with_json(json_path, target_font_path, chars)
    if sorted_mse is None:
        return
    
    if not sorted_mse:
        print("No similar fonts found.")
        return

    print(f"'{os.path.basename(target_font_path)}'와 유사한 폰트 TOP 3:")
    for i, (font_name, mse) in enumerate(sorted_mse[1:10]):
        print(f"{i+1}. {font_name} (MSE: {mse:.4f})")

# 사용 예시
json_path = "font_vectors.json"
target_font_path = "./public/fonts/빈폴2020.ttf"
# Range for Latin letters 'A' to 'z'
latin_letters = [chr(i) for i in range(ord('A'), ord('Z') + 1)] + [chr(i) for i in range(ord('a'), ord('z') + 1)]


# Range for Korean Hangul consonants ㄱ (U+3131) to ㅎ (U+314E)
# The range end value should be one more than the last code point, hence 0x314F.
korean_consonants = [chr(i) for i in range(0x3131, 0x314F)]

# Range for Korean Hangul vowels ㅏ (U+314F) to ㅣ (U+3163)
# Similarly, use 0x3164 as the end value since range is end-exclusive.
korean_vowels = [chr(i) for i in range(0x314F, 0x3164)]

# Combine all three lists into one
chars_to_compare = latin_letters + korean_consonants + korean_vowels


if not os.path.exists(target_font_path):
    print(f"Error: Target font file not found: {target_font_path}")
else:
    recommend_top_3_fonts(json_path, target_font_path, chars_to_compare)