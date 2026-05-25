import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'

function FileReaderDropzone() {
    //saves image in base64 string so it can be displayed in img tag
    const [preview, setPreview] = useState<string | undefined>();
    //actual file object that we can maybe send to a python api to creawte border
    const [file, setFile] = useState<File | undefined>();

    //use callback - function is only recreated if dependencies change
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setFile(acceptedFiles[0]);//currently only saves first file
        // URL.createObjectURL(acceptedFiles[0])

        const reader = new FileReader();//browset api that can read files
        reader.onload = function () {
            setPreview(reader.result as string)
        }
        reader.readAsDataURL(acceptedFiles[0]);
    }, [])//means it is created once and

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop, //call the callback function if files are dropped
        accept: { 'image/png': ['.png'] },//only accept png
        multiple: false,//only allow one file at a time
    })

    async function handleOnSubmit(e: React.SyntheticEvent) {
        e.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('file', file);
    }

    return (
        <div className="filereader">
            <form onSubmit={handleOnSubmit}>
                <h1>Upload your image file</h1>
                <div {...getRootProps()}> {/* make this div a drag and drop area for files */}
                    
                    <input {...getInputProps()} />{/* handles user click to browse files. show different text based on state*/}
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