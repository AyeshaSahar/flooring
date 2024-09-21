import { useEffect, useState } from "react";
import tile1 from "../assets/tile1.webp";
import tile2 from "../assets/tile2.webp";
import tile3 from "../assets/tile3.webp";
import tile4 from "../assets/tile4.jpg";

const floorOptions = [
  { name: "tile1.webp", displayName: "American Walnut Natural / Studio / Avenue", image: tile1 },
  { name: "tile2.webp", displayName: "Brushed Acacia 4x3x4 / Avenue", image: tile2 },
  { name: "tile3.webp", displayName: "Brushed Acacia Grayfield / Avenue", image: tile3 },
  { name: "tile4.jpg", displayName: "Brushed American Walnut Natural / Avenue", image: tile4 },
  { name: "tile2.webp", displayName: "Brushed Oak Grays Harbor / Avenue", image: tile2 },
  { name: "tile1.webp", displayName: "Brushed Oak Brule / Badlands", image: tile1 },
];

export default function FloorSelector({ setSelectedTexture, uploadedImage }) {
  const [selectedFloor, setSelectedFloor] = useState("");

  useEffect(() => {
    if (uploadedImage) {
      setSelectedFloor("");
      setSelectedTexture(null);
    }
  }, [uploadedImage, setSelectedTexture]);

  const handleSelect = (floorName) => {
    setSelectedFloor(floorName);
    setSelectedTexture(floorName); 
  };

  return (
    <div className="w-full md:w-1/3 bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4">Floor</h2>
      <div className="mb-4">
        <div className="mb-4">
          <select className="w-full p-2 border rounded">
            <option>Kentwood Floors</option>
          </select>
        </div>
        <div className="mb-4">
          <select className="w-full p-2 border rounded">
            <option>Product Types</option>
          </select>
        </div>
        <h3 className="text-lg font-semibold mb-2">Kentwood Floors</h3>
        <div className="grid grid-cols-3 gap-4">
          {floorOptions.map((floor, index) => (
            <div
              key={index}
              className={`text-center cursor-pointer p-2 border ${
                selectedFloor === floor.name ? "border-red-500" : "border-transparent"
              }`}
              onClick={() => handleSelect(floor.name)}
            >
              <img
                src={floor.image}
                alt={floor.displayName}
                className="w-full h-24 object-cover mb-2"
              />
              <p className={`text-xs ${selectedFloor === floor.name ? "text-red-500" : ""}`}>
                {floor.displayName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import PropTypes from "prop-types";

FloorSelector.propTypes = {
  setSelectedTexture: PropTypes.func.isRequired,
  uploadedImage: PropTypes.object, 
};
