import React, {Component} from "react";
import Navbar from "../components/Navbar";
import ImgDropAndCrop from "../components/ImgDropAndCrop";

class Zone extends Component {
  render () {
    return (
      <div className='App'>
        <Navbar/>
        <ImgDropAndCrop/>
      </div>
    )
  }
}

export default Zone;
