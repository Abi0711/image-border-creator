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
      
      {Files && Files.length > 0 && (<ImageBorderCreator Files={Files}/>)
      }
      
    </div>
  );
}

export default App;
