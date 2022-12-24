import React, { useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const fileInput = useRef(null);

  const handleClick = () => {
    (fileInput as any).current.click();
  };

  const handleChange = (e: any) => {
    console.log(e.target.files[0]);
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
