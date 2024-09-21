from flask import Flask, request, jsonify
import cv2
import numpy as np
import os
from segment_anything import SamPredictor, sam_model_registry
from flask_cors import CORS
import base64

app = Flask(__name__)
CORS(app)

model_type = "vit_h"
checkpoint_path = "model/sam_vit_h_4b8939.pth"
sam = sam_model_registry[model_type](checkpoint=checkpoint_path)
predictor = SamPredictor(sam)

TEXTURE_FOLDER = 'static/textures'
app.config['TEXTURE_FOLDER'] = TEXTURE_FOLDER

def generate_floor_mask(image):
    h, w = image.shape[:2]
    input_points = np.array([[w//4, h-10], [w//2, h-10], [3*w//4, h-10]])
    input_labels = np.array([1, 1, 1])
    masks, scores, _ = predictor.predict(point_coords=input_points, point_labels=input_labels, multimask_output=True)
    best_mask_index = np.argmax(scores)
    floor_mask = masks[best_mask_index]
    kernel = np.ones((5, 5), np.uint8)
    floor_mask = cv2.dilate(floor_mask.astype(np.uint8), kernel, iterations=2)
    return floor_mask

@app.route('/customize_room', methods=['POST'])
def customize_room():
    try:
        # Get image and floor texture from request
        image_file = request.files['image']
        floor_texture = request.form['floorTexture']
        
        # Read image data
        image_data = image_file.read()
        nparr = np.frombuffer(image_data, np.uint8)
        image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        # Check if the image is valid
        if image is None:
            return jsonify({'error': 'Image not found or cannot be read'}), 400
        
        # Convert to RGB
        image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        
        # Set the image in the SAM model
        predictor.set_image(image)
        floor_mask = generate_floor_mask(image)
        
        # Get the path to the selected floor texture
        floor_texture_path = os.path.join(app.config['TEXTURE_FOLDER'], floor_texture)
        
        # Check if the texture file exists
        if not os.path.exists(floor_texture_path):
            return jsonify({'error': f'Texture {floor_texture} not found'}), 400
        
        # Read the texture image
        floor_texture_image = cv2.imread(floor_texture_path)
        if floor_texture_image is None:
            return jsonify({'error': 'Unable to read floor texture image'}), 400
        
        # Resize the texture image to match the input image
        floor_texture_image = cv2.cvtColor(floor_texture_image, cv2.COLOR_BGR2RGB)
        floor_texture_image = cv2.resize(floor_texture_image, (image.shape[1], image.shape[0]))
        
        # Apply the floor texture to the masked region
        floor_mask = floor_mask.astype(bool)
        result = image.copy()
        result[floor_mask] = floor_texture_image[floor_mask]
        
        # Convert result image to base64 and send as response
        _, buffer = cv2.imencode('.png', cv2.cvtColor(result, cv2.COLOR_RGB2BGR))
        result_base64 = base64.b64encode(buffer).decode('utf-8')
        
        return jsonify({'message': 'Room customized successfully', 'result': result_base64})

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/textures')
def get_textures():
    # List the available textures in the texture folder
    textures = os.listdir(app.config['TEXTURE_FOLDER'])
    return jsonify(textures)

if __name__ == '__main__':
    app.run(debug=True)

