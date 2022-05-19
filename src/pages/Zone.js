import React, {Component} from "react";
import Navbar from "../components/Navbar";
import ImgDropAndCrop from "../components/ImgDropAndCrop";
import Title from "../components/Title";

class Zone extends Component {
  render () {
    return (
      <div className='App'>
       <Navbar/>
        <Title/>
        <ImgDropAndCrop/>
      </div>
    )
  }
}

export default Zone;
