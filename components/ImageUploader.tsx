import { useState, ChangeEvent } from 'react';
import { Upload } from 'lucide-react';

interface FileReaderEvent extends ProgressEvent {
  target: FileReader;
}

const ImageUploader = () => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: FileReaderEvent) => {
      const result = e.target.result;
      if (typeof result === 'string') {
        setImageUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <label 
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF</p>
          </div>
          <input
            id="image-upload"
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Preview:</h2>
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <img
              src={imageUrl}
              alt="Uploaded preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;