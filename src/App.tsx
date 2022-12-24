import React, { useRef } from 'react';
import './App.css';
import heic2any from 'heic2any';
function App() {
  const fileInput = useRef(null);

  const handleClick = () => {
    (fileInput as any).current.click();
  };

function downloadBase64File(base64Data: any, fileName: any) {
  const linkSource =base64Data;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

  const handleChange = (e: any) => {
    console.log(e.target.files[0]);
    const filename = e.target.files[0].name
    let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          downloadBase64File(imgBase64Path, filename.replace(/\.[^/.]+$/, "") + '.png');
        };
      };
    heic2any({
      blob: e.target.files[0],
      toType: "image/jpeg",
    }).then((e) => {
      const jpegFile = e as any;
      reader.readAsDataURL(jpegFile);
    });
  };

  return (
    <div className="App">
      <div className="button input" onClick={handleClick}> Upload</div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <div className="button output">Download</div>
    </div>
  );
}

export default App;
