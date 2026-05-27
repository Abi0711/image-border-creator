import { useState } from 'react';
import './App.css';
import FileUploaderDropzone from './components/FileUploaderDropzone'
import ImageBorderCreator from './components/ImageBorderCreator';

function App() {
  const [Files, setFiles] = useState<string[] | undefined>([]);
  return (
    <div className="App">
      <h1>Stick Border Creator</h1>
      <FileUploaderDropzone onImageUpload={setFiles}/>
      <ImageBorderCreator Files={Files}/>
    </div>
  );
}

export default App;
