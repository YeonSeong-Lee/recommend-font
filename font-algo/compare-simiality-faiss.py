import os
import numpy as np
import faiss
from PIL import Image
from pathlib import Path
from tqdm import tqdm
import json

def load_and_preprocess_image(image_path, target_size=(800, 100)):
    """이미지를 로드하고 전처리하는 함수"""
    img = Image.open(image_path).convert('L')  # 흑백 이미지로 변환
    img = img.resize(target_size)
    img_array = np.array(img).flatten() / 255.0
    return img_array

def get_font_vectors(font_dir):
    """폰트 디렉토리에서 모든 이미지를 벡터화"""
    vectors = []
    image_paths = []
    font_name = os.path.basename(font_dir)
    
    for img_path in Path(font_dir).glob('*.png'):
        try:
            vec = load_and_preprocess_image(str(img_path))
            vectors.append(vec)
            image_paths.append(str(img_path))
        except Exception as e:
            print(f"Error processing {img_path}: {e}")
    
    return np.array(vectors), image_paths, font_name

def compare_fonts():
    """폰트들 간의 유사도 비교"""
    output_dir = 'output_images'
    font_dirs = [os.path.join(output_dir, d) for d in os.listdir(output_dir) 
                if os.path.isdir(os.path.join(output_dir, d))]
    
    all_vectors = []
    all_image_paths = []
    font_names = []
    vector_counts = []
    
    # 모든 폰트 이미지를 벡터화
    print("벡터화 진행 중...")
    for font_dir in tqdm(font_dirs):
        vectors, paths, font_name = get_font_vectors(font_dir)
        all_vectors.extend(vectors)
        all_image_paths.extend(paths)
        font_names.append(font_name)
        vector_counts.append(len(vectors))
    
    all_vectors = np.array(all_vectors)
    
    # FAISS 인덱스 생성 및 벡터 추가
    dimension = 800 * 100  # 800x100 이미지의 차원
    index = faiss.IndexFlatL2(dimension)
    index.add(all_vectors.astype('float32'))
    
    # 각 폰트별 평균 유사도 계산
    print("\n폰트 간 유사도 계산 중...")
    n_fonts = len(font_names)
    similarity_matrix = np.zeros((n_fonts, n_fonts))
    
    start_idx = 0
    for i in range(n_fonts):
        end_idx = start_idx + vector_counts[i]
        font_vectors = all_vectors[start_idx:end_idx]
        
        # 현재 폰트의 모든 문자에 대해 가장 가까운 이웃 검색
        k = 5  # 가장 가까운 5개의 이웃 검색
        D, I = index.search(font_vectors.astype('float32'), k)
        
        # 다른 폰트와의 평균 유사도 계산
        for j in range(n_fonts):
            other_start = sum(vector_counts[:j])
            other_end = other_start + vector_counts[j]
            
            # 현재 폰트와 다른 폰트 간의 평균 거리 계산
            mask = (I >= other_start) & (I < other_end)
            if mask.any():
                similarity = 1 / (1 + np.mean(D[mask]))
                similarity_matrix[i, j] = similarity
        
        start_idx = end_idx
    
    # 결과를 저장할 딕셔너리 생성
    similarity_results = {}
    
    # 결과 출력 및 JSON 저장
    print("\n폰트 유사도 결과:")
    print("=" * 50)
    for i in range(n_fonts):
        font_similarities = []
        similar_fonts = [(font_names[j], float(similarity_matrix[i, j])) 
                        for j in range(n_fonts) if i != j]
        similar_fonts.sort(key=lambda x: x[1], reverse=True)
        
        # 결과 출력
        print(f"\n{font_names[i]}와(과) 가장 유사한 폰트들:")
        for font_name, similarity in similar_fonts[:3]:
            print(f"- {font_name}: {similarity:.4f}")
        
        # JSON 결과 저장을 위한 데이터 구조화
        font_similarities = [
            {
                "font_name": font_name,
                "similarity": similarity
            }
            for font_name, similarity in similar_fonts[:5]
        ]
        
        similarity_results[font_names[i]] = font_similarities
    
    # JSON 파일로 저장
    output_file = 'font_similarities.json'
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(similarity_results, f, ensure_ascii=False, indent=2)
    
    print(f"\n유사도 결과가 {output_file}에 저장되었습니다.")

if __name__ == "__main__":
    compare_fonts()
