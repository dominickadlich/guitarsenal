import { useState } from 'react';

import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'


function InputMedia() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files)

    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

    return (
    <>
        <div className="col-span-full">
              <label htmlFor="cover-photo" className="block text-sm/6 font-medium text-gray-100">
                Guitar Photos
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-100/25 px-6 py-10">
                <div className="text-center">
                  <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                  <div className="mt-4 flex text-sm/6 text-gray-600">
                    <label
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:outline-hidden hover:text-indigo-500"
                    >
                      <span>Upload files</span>
                      <input 
                        name="images" 
                        type="file" 
                        accept='image/*'
                        multiple
                        className="sr-only" 
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
              {previews.length > 0 && (
                <div className='flex items-center mt-4 grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                  {previews.map((preview, index) => (
                    <div key={index} className='relative'>
                      <img src={preview} className='h-24 w-24 object-cover rounded-lg' />
                    </div>
                  ))}
                </div>
              )}
        </div>
    </>
    );
}

export default InputMedia;