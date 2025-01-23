import cv2
import numpy as np
import os
import tqdm
import json
from multiprocessing import Pool, cpu_count

def orb_similarity(img_path1, img_path2):
    img1 = cv2.imread(img_path1, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img_path2, cv2.IMREAD_GRAYSCALE)

    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    orb = cv2.ORB_create(nfeatures=10000000, scaleFactor=1.1, nlevels=30)

    keypoints1, descriptors1 = orb.detectAndCompute(img1, None)
    keypoints2, descriptors2 = orb.detectAndCompute(img2, None)

    if descriptors1 is None or descriptors2 is None:
        return 0.0

    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(descriptors1, descriptors2)

    matches = sorted(matches, key=lambda x: x.distance)

    avg_distance = np.mean([m.distance for m in matches])
    similarity_score = 1 / (1 + avg_distance)

    return similarity_score

def calculate_font_similarity(font_pair):
    font_dir1, font_dir2 = font_pair
    total_similarity = 0.0
    count = 0

    for char in os.listdir(font_dir1):
        img1_path = os.path.join(font_dir1, char)
        img2_path = os.path.join(font_dir2, char)

        if os.path.exists(img2_path):
            similarity = orb_similarity(img1_path, img2_path)
            total_similarity += similarity
            count += 1

    return total_similarity / count if count > 0 else 0.0

def process_target_font(args):
    target_font, compare_fonts, font_images_dir = args
    results = []
    for font in compare_fonts:
        similarity = calculate_font_similarity(
            (os.path.join(font_images_dir, target_font), os.path.join(font_images_dir, font))
        )
        results.append({"font_name": os.path.splitext(os.path.basename(font))[0], "similarity": similarity})
    results = sorted(results, key=lambda x: x["similarity"], reverse=True)
    return os.path.splitext(os.path.basename(target_font))[0], results[1:11]

if __name__ == "__main__":
    font_images_dir = "font_images"
    target_fonts = os.listdir(font_images_dir)
    compare_fonts = os.listdir(font_images_dir)

    tasks = [(target_font, compare_fonts, font_images_dir) for target_font in target_fonts]

    # 멀티프로세싱 Pool 사용
    with Pool(cpu_count()) as pool:
        results = list(tqdm.tqdm(pool.imap_unordered(process_target_font, tasks), total=len(tasks), desc="Processing Fonts"))

    # 결과를 JSON에 저장
    result_dict = {font_name: data for font_name, data in results}

    with open('../data/font_similarities.json', 'w', encoding='utf-8') as file:
        json.dump(result_dict, file, ensure_ascii=False, indent=4)
