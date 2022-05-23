import React from "react";
import Navbar from "../components/Navbar";
import Title from '../components/Title';
import UploadForm from '../components/UploadForm';
import Counter from '../features/counter/Counter';

function Upload() {

  return (
    <div className="App">
        <Navbar/>
        <UploadForm/>
        
  </div>
  
  
  );
}

export default Upload;