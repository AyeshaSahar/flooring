import { useEffect, useState } from "react";
import { FaSearchPlus, FaSearchMinus } from "react-icons/fa";
import PropTypes from 'prop-types';

export default function Visualizer({ uploadedImage, selectedTexture }) {
  const [zoom, setZoom] = useState(1);
  const [history, setHistory] = useState([]);
  const [customizedImage, setCustomizedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (uploadedImage) {
      setCustomizedImage(null);
    }
  }, [uploadedImage]);

  const zoomIn = () => {
    setHistory([...history, zoom]);
    setZoom((prevZoom) => Math.min(prevZoom + 0.2, 2));
  };

  const zoomOut = () => {
    setHistory([...history, zoom]);
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 1));
  };

  const handleCustomizeImage = async () => {
    if (!uploadedImage.file || !selectedTexture) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', uploadedImage.file);
    formData.append('floorTexture', selectedTexture);

    try {
      const response = await fetch('http://127.0.0.1:5000/customize_room', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setCustomizedImage(data.result);
    } catch (error) {
      console.error('Error customizing image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full md:w-2/3 rounded-lg p-4">
      <div className="relative w-full aspect-video bg-gray-200">
        {customizedImage ? (
          <div className="relative w-full flex items-center justify-center">
            <img
              src={`data:image/png;base64,${customizedImage}`}
              alt="Customized Room"
              style={{ transform: `scale(${zoom})` }}
              className="w-2/3 h-[500px] transition-transform duration-300"
            />
            {isLoading && <p className="absolute bottom-10 text-black text-lg">Loading...</p>}
          </div>
        ) : uploadedImage && uploadedImage.image && uploadedImage.title ? (
          <div className="relative w-full flex items-center justify-center">
            <img
              src={uploadedImage.image}
              alt={uploadedImage.title}
              style={{ transform: `scale(${zoom})` }}
              className="w-2/3 h-[500px] transition-transform duration-300"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
              <h2 className="text-white text-2xl font-bold">
                {uploadedImage.title}
              </h2>
              {isLoading && (
                <div className="mt-2">
                  <div className="animate-spin inline-block w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full"></div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            No Image Uploaded
          </div>
        )}

        {uploadedImage && (
          <>
            <button
              onClick={handleCustomizeImage}
              className={`mt-2 w-full bg-blue-500 text-white py-2 rounded-md ${!selectedTexture || customizedImage ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              disabled={!selectedTexture || isLoading || customizedImage}
            >
              {isLoading ? 'Customizing...' : 'Customize Image'}
            </button>
          </>
        )}

        <div className="absolute bottom-16 left-0 right-0 flex justify-center space-x-2 sm:space-x-4">
          <button
            className="flex items-center px-2 py-1 sm:px-4 sm:py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded"
            onClick={zoomIn}
          >
            <FaSearchPlus className="mr-1 sm:mr-2" /> ZOOM IN
          </button>
          <button
            className="flex items-center px-2 py-1 sm:px-4 sm:py-2 bg-gray-300 hover:bg-gray-400 text-black font-semibold rounded"
            onClick={zoomOut}
          >
            <FaSearchMinus className="mr-1 sm:mr-2" /> ZOOM OUT
          </button>
        </div>
      </div>
    </div>
  );
}

Visualizer.propTypes = {
  uploadedImage: PropTypes.shape({
    file: PropTypes.instanceOf(File),
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  selectedTexture: PropTypes.string,
};


