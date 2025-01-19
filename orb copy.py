import cv2
import numpy as np
import os
import tqdm
from multiprocessing import Pool, cpu_count\
    

def orb_similarity(img_path1, img_path2):
    # 1) 이미지 로드 (그레이스케일)
    img1 = cv2.imread(img_path1, cv2.IMREAD_GRAYSCALE)
    img2 = cv2.imread(img_path2, cv2.IMREAD_GRAYSCALE)
    
    # 크기나 위치가 다를 경우, 미리 정렬/리사이즈 필요
    if img1.shape != img2.shape:
        img2 = cv2.resize(img2, (img1.shape[1], img1.shape[0]))

    # 2) ORB 디텍터/디스크립터 생성
    orb = cv2.ORB_create(nfeatures=10000000, scaleFactor=1.1, nlevels=30)

    # 3) 특징점과 디스크립터 추출
    keypoints1, descriptors1 = orb.detectAndCompute(img1, None)
    keypoints2, descriptors2 = orb.detectAndCompute(img2, None)

    # 디스크립터가 없으면(글자가 너무 단순) 유사도 계산이 불가
    if descriptors1 is None or descriptors2 is None:
        return 0.0

    # 4) BFMatcher(Brute Force)로 매칭
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
    matches = bf.match(descriptors1, descriptors2)
    
    # 매칭점 distance 기반 정렬
    matches = sorted(matches, key=lambda x: x.distance)
    
    # 5) 유사도(점수) 계산
    # 여기서는 간단히 평균 distance를 사용 (distance가 작을수록 유사)
    avg_distance = np.mean([m.distance for m in matches])
    # distance 범위에 따라 가중치를 두어 0~1 스케일로 변환하는 식으로 응용 가능
    # 예를 들어 아래처럼 간단히 정규화(예시):
    similarity_score = 1 / (1 + avg_distance)  # 임의의 방식

    return similarity_score

def calculate_font_similarity(args):
    font_dir1, font_dir2 = args
    total_similarity = 0.0
    count = 0

    for char in os.listdir(font_dir1):
        img1_path = os.path.join(font_dir1, char)
        img2_path = os.path.join(font_dir2, char)

        if os.path.exists(img2_path):
            similarity = orb_similarity(img1_path, img2_path)
            total_similarity += similarity
            count += 1

    if count > 0:
        return font_dir2, total_similarity / count
    else:
        return font_dir2, 0.0

if __name__ == "__main__":
    target_font = "data/font_images/Jalnan2TTF.ttf"
    compare_fonts = [os.path.join('data/font_images', a) for a in os.listdir("data/font_images")]
    
    with Pool(cpu_count()) as pool:
        args = [(target_font, font) for font in compare_fonts]
        result = list(tqdm.tqdm(pool.imap(calculate_font_similarity, args), total=len(args), desc="Comparing Fonts"))

    sorted_result = sorted(result, key=lambda x: x[1], reverse=True)

    for font, similarity in sorted_result[:10]:
        print(f"{font}: {similarity:.4f}")
