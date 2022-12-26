import React, { useRef, useState } from 'react';
import './App.css';
import heic2any from 'heic2any';
function App() {
  const formatList = ['jpeg', 'png', 'gif'];

  const [ selectedFormat, setSelectedFormat] = useState('jpeg');
  
  console.log(formatList)
  const fileInput = useRef(null);
  const [ fileData, sentFileData ] = useState({
    data: '',
    fileName: ''
  })

  const handleClick = () => {
    (fileInput as any).current.click();
  };

  const handleChangeFormat = (e: any) => {
    setSelectedFormat(e.target.value);
  }

  function downloadBase64File() {
    if(fileData.data !== '' && fileData.fileName) {
      const linkSource = fileData.data;
      const downloadLink = document.createElement("a");
      downloadLink.href = linkSource;
      downloadLink.download = fileData.fileName;
      downloadLink.click();
    }
   
  }

  const handleChange = (e: any) => {
    const filename = e.target.files[0].name
    let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          sentFileData({
            data: imgBase64Path,
            fileName: filename.replace(/\.[^/.]+$/, "") + '.' + selectedFormat
          })
        };
      };
    heic2any({
      blob: e.target.files[0],
      toType: "image/" + selectedFormat,
    }).then((e) => {
      const jpegFile = e as any;
      reader.readAsDataURL(jpegFile);
    });
  };

  return (
    <div className="App">
      {
        fileData.data && <img className="preview" src={fileData.data} alt="" onClick={() => {
          downloadBase64File()
        }}/>
      }
      <div className="button input" onClick={handleClick}> Upload</div>
      <input
        type="file"
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <label htmlFor="selectFromat">
        <select name="format" id="selectFormat" value={selectedFormat} onChange={handleChangeFormat}>
          {
            formatList.map((format: string, index: number) => {
              return <option key={index + 1} value={format}>{format}</option>
            })
          }
        </select>
      </label>
      <div className="button output" onClick={() => {
        downloadBase64File()
      }}>Download</div>
    </div>
  );
}

export default App;
