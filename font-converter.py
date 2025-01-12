from fontTools.ttLib import TTFont
import numpy as np
import json

font_name = 'Pretendard-Regular'
font = TTFont(rf'public/fonts/{font_name}.ttf')
sample_glyph = 'A'
glyph_set = font.getGlyphSet()
glyph_names = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]


def glyph_to_vector(sample_glyph, length=100):
    glyph = font['glyf'].get(sample_glyph)
    coordinates = glyph.getCoordinates(font['glyf'])
    # TODO: 좌표 정규화
    list = [(0, 0) for _ in range(length)]
    list[:len(coordinates[0])] = coordinates[0]
    return list


# 전체 글리프 벡터화
glyph_vectors = {}
for glyph_name in glyph_names:
    glyph_vectors[glyph_name] = glyph_to_vector(glyph_name)


with open(f'data/font/{font_name}.json', 'w', encoding='utf-8') as f:
    json.dump(glyph_vectors, f, ensure_ascii=False, indent=2)
