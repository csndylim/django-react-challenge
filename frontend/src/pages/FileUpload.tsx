import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';

function FileUpload() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadResult, setUploadResult] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('http://localhost:8000/manyapps/fileupload_django/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(response => {
        console.log('File uploaded successfully:', response.data);
        setUploadResult(response.data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input type="file" onChange={handleFileChange} />
      {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Preview" />}
      {selectedFile && <button onClick={handleUpload}>Upload</button>}
      {uploadResult && (
        <div>
          <h2>Result</h2>
          <p>File uploaded successfully:</p>
          <p>File URL: {uploadResult.file}</p>
          <p>Uploaded at: {uploadResult.uploaded_at}</p>
        </div>
      )}
    </div>
  );
}

export default FileUpload;
