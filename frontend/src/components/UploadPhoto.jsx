import { useState } from "react";

export default function UploadPhoto({ setUploadedImage }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const handleFileChange = (e) => {
    if (e.target.files) {
      const uploadedFile = e.target.files[0];
      setFile(uploadedFile); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (file && title) {
      setUploadedImage({ image: URL.createObjectURL(file), file, title });
    } else {
      alert("Please upload a file and enter a title");
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg lg:max-w-2xl bg-white rounded-lg shadow-md p-6">
      <p className="mb-4 text-center">
        Upload a photo of your room to see how different flooring options would look.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
            Choose a file
          </label>
          <input
            type="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Image Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter a title for your image"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
        >
          START UPLOAD
        </button>
      </form>
    </div>
  );
}


import PropTypes from 'prop-types';

UploadPhoto.propTypes = {
  setUploadedImage: PropTypes.func.isRequired,
};
