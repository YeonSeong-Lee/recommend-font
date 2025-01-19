from skimage import io
from skimage.metrics import structural_similarity as ssim
import os
import tqdm

def calculate_font_similarity(font_dir1, font_dir2):

	"""
	두 폰트 디렉토리의 ㄱ~ㅎ 이미지 비교하여 유사도 계산
	font_dir1: 기존 폰트 디렉토리 (ㄱ~ㅎ 이미지 포함)
	font_dir2: 새로운 폰트 디렉토리 (ㄱ~ㅎ 이미지 포함)
	"""
	
	total_ssim = 0.0
	count = 0
	
	for char in os.listdir(font_dir1):
		img1_path = os.path.join(font_dir1, char)
		img2_path = os.path.join(font_dir2, char)
		
		if os.path.exists(img2_path):
			img1 = io.imread(img1_path, as_gray=True)
			img2 = io.imread(img2_path, as_gray=True)
			
			# SSIM 계산
			score = ssim(img1, img2)
			total_ssim += score
			count += 1

	# 평균 SSIM 계산
	if count > 0:
		return total_ssim / count
	else:
		return 0.0

if __name__ == "__main__":

	target_font = "data/font_images/Galmuri11.ttf"
	compare_fonts = [os.path.join('data/font_images', a) for a in os.listdir("data/font_images")]
	result = []

	for font in tqdm.tqdm(compare_fonts, "Comparing Fonts"):
		similarity = calculate_font_similarity(target_font, font)
		result.append((font, similarity))
    
	sorted_restul = sorted(result, key=lambda x: x[1], reverse=True)

	for font, similarity in sorted_restul[1:]:
		print(f"{font}: {similarity:.4f}")
