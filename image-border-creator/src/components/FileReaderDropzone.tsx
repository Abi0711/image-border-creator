import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'
function FileReaderDropzone() {
  const [preview, setPreview] = useState<string | undefined>();
  const [file, setFile] = useState<File | undefined>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if(acceptedFiles.length === 0) return;
    
    setFile(acceptedFiles[0]);

    const reader = new FileReader();
    reader.onload = function(){
      setPreview(reader.result as string)
    }
    reader.readAsDataURL(acceptedFiles[0]);
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/png': ['.png']},
    multiple: false,
  })

  async function handleOnSubmit(e: React.SyntheticEvent){
    e.preventDefault();
    if(!file) return;
    const formData = new FormData();
    formData.append('file', file);
  }

  return (
    <div className="filereader">
      <form onSubmit={handleOnSubmit}>
        <h1>Upload your image file</h1>
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {
            isDragActive ?
              <p>Drop the files here ...</p> :
              <p>Drag 'n' drop some files here, or click to select files</p>
          }
        </div>

        {preview && (
            <div className="img-container">
                <img src={preview} />
            </div>
        )}
        <button>Submit</button>
      </form>
    </div>
  );
}

export default FileReaderDropzone;