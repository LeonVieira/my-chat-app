import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function UploadArea() {
  // Callback triggered when files are dropped or selected
  const onDrop = useCallback((acceptedFiles) => {
    console.log('Uploaded files:', acceptedFiles);
    // Insert your API upload logic here
  }, []);

  // Configure dropzone options
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.gif'], // Accept only images
    },
    multiple: true // Allow multiple files
  });

  // Basic styling configurations
  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '40px',
    borderWidth: 2,
    borderRadius: 8,
    borderColor: isDragActive ? '#00adb5' : '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: isDragActive ? '#f0fdfa' : '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    cursor: 'pointer'
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <div {...getRootProps({ style: baseStyle })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p style={{ color: '#00adb5', fontWeight: 'bold' }}>Drop the files here...</p>
        ) : (
          <p>Drag & drop some files here, or click to select files</p>
        )}
        <small style={{ marginTop: '10px' }}>Only PNG, JPEG, and GIF files are allowed.</small>
      </div>
    </div>
  );
}

