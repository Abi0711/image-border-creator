import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'

interface FileUploaderDropzoneProps{
    onImageUpload: (urls: string[]) => void;
}

function FileUploaderDropzone({onImageUpload} : FileUploaderDropzoneProps) {
    //use callback - function is only recreated if dependencies change
    const [numberOfFiles, setnumberOfFiles] = useState<number>(-1);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;
        onImageUpload(acceptedFiles.map(file => URL.createObjectURL(file)));
        setnumberOfFiles(acceptedFiles.length);

    }, [onImageUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, //call the callback function if files are dropped
        accept: { 'image/png': ['.png'] },//only accept png
        multiple: true,//only allow one file at a time
    })


    return (
        <div className="dropzone-container">
                <h2>Upload your PNG file</h2>
                <div  {...getRootProps()}> {/* make this div a drag and drop area for files */}
                    
                    <input {...getInputProps()} />{/* handles user click to browse files. show different text based on state*/}
                    {
                        
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drag 'n' drop some files here, or click to select files. Files must be PNG</p>
                        
                    }
                </div>
                {numberOfFiles !== -1 && (
                <div className=''>
                    Successfully Uploaded {numberOfFiles} file(s).
                </div>
                )}
        </div>
    );
}

export default FileUploaderDropzone;