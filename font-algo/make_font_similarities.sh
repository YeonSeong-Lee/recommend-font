#!/bin/bash

# Create necessary directories
mkdir -p font_images

# Run Python scripts
echo "Generating font images..."
python3 get_font_image.py

echo "Calculating font similarities..."
python3 orb.py

echo "Done! Font similarities have been generated."
