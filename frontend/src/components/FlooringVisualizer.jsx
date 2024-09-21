import { useState } from "react";
import Navbar from "./Navbar";
import UploadPhoto from "./UploadPhoto";
import Visualizer from "./Visualizer";
import FloorSelector from "./FloorSelector";

export default function FlooringVisualizer() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedTexture, setSelectedTexture] = useState(null); 

  const resetTexture = () => {
    setSelectedTexture(null); 
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <UploadPhoto setUploadedImage={setUploadedImage} />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <Visualizer 
            uploadedImage={uploadedImage} 
            selectedTexture={selectedTexture} 
            resetTexture={resetTexture} 
          />
<FloorSelector setSelectedTexture={setSelectedTexture} uploadedImage={uploadedImage} />
</div>
      </div>
    </div>
  );
}
