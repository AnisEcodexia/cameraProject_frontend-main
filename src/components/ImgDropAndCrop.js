
import React, {Component } from "react";
import "react-image-crop/dist/ReactCrop.css";
import "./custom-image-crop.css";
import Form from "react-bootstrap/Form";
import { FormControl } from "react-bootstrap";
import MultiCrops from "react-multi-crops";

import {
  base64StringtoFile,
  downloadBase64File,
  extractImageFileExtensionFromBase64,
  image64toCanvasRef,
} from "./ResuableUtils";


const imageMaxSize = 1000000000; // bytes
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map((item) => {
  return item.trim();
});
class ImgDropAndCrop extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.imagePreviewCanvasRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.state = {
      _width: window.innerWidth,
      coordinates :[],
      width:window.innerWidth - 20,
      label: "",
      error: "",
      showZone1: false,
      showZone: false,
      showLabel: false,
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 2 / 3,
      },
    };
  }

  verifyFile = (files) => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };
  

  handleOnDrop = (files, rejectedFiles) => {
    console.log("files");
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            // console.log(myFileItemReader.result)
            const myResult = myFileItemReader.result;
            this.setState({
              imgSrc: myResult,
              imgSrcExt: extractImageFileExtensionFromBase64(myResult),
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleImageLoaded = (image) => {
    this.setState({ crop: { width: image.width, height: image.height } });
    console.log("zebi");
  };

  handleDragOver = (image) => {
    image.preventDefault();
  };
  componentDidMount(coordinates) {
    window.onresize = () => {
      const ratio = window.innerWidth / this.state._width.current;
      console.log(ratio, this.state.coordinates[0]);
      this.state_width = window.innerWidth;
      this.setState({width:window.innerWidth - 20});
      this.setState(
        {coordinates:
        coordinates.map(c => ({
          ...c,
          x: c.x * ratio,
          y: c.y * ratio,
          width: c.width * ratio
        }))
        }
      );
    };
  }
  handleOnCropChange = (crop) => {
    this.setState({ crop: crop });
  };
  handleOnCropComplete = (crop, pixelCrop) => {
    console.log("crop", crop, "px crop:", pixelCrop);
    this.setState({ showLabel: true });
    const canvasRef = this.imagePreviewCanvasRef.current;
    const { imgSrc } = this.state;
    image64toCanvasRef(canvasRef, imgSrc, crop);
  };

  changeCoordinate = (coordinate, index, coordinates) => {
    coordinates.forEach(c => {console.log(c)})
    
    this.setState({ showZone1: true });
    this.setState({coordinates: coordinates});
  };
  
  deleteCoordinate = (coordinate, index, coordinates) => {
    this.setState({coordinates: coordinates});
  };
  handleDownloadClick = (event) => {
    event.preventDefault();
    this.setState({ label: document.getElementsByName("label")[0].value });
    this.setState({ showZone: true });
    const { imgSrc } = this.state;
    if (imgSrc) {
      const canvasRef = this.imagePreviewCanvasRef.current;

      const { imgSrcExt } = this.state;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);

      const myFilename = "previewFile." + imgSrcExt;

      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      console.log(myNewCroppedFile);
      // download file
      downloadBase64File(imageData64, myFilename);
    }
  };

  handleClearToDefault = (event) => {
    if (event) event.preventDefault();
    const canvas = this.imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.setState({
      imgSrc: null,
      imgSrcExt: null,
      crop: {
        aspect: 1 / 1,
      },
    });
    this.fileInputRef.current.value = null;
  };

  handleFileSelect = (event) => {
    const [file] = event.target.files;
    this.setState({
      imgSrc: URL.createObjectURL(file),
      imgSrcExt: extractImageFileExtensionFromBase64(URL.createObjectURL(file)),
    });

    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            // console.log(myFileItemReader.result)
            this.setState({
              imgSrc: URL.createObjectURL(file),
              imgSrcExt: extractImageFileExtensionFromBase64(
                URL.createObjectURL(file)
              ),
            });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };
  render() {
    const { imgSrc } = this.state;
    return (
      <div>
        <input
          ref={this.fileInputRef}
          type="file"
          accept={acceptedFileTypes}
          multiple={false}
          onChange={this.handleFileSelect}
        />
        <MultiCrops
        src={imgSrc}
        width={this.state.width}
        coordinates={this.state.coordinates}
        onChange={this.changeCoordinate}
        onDelete={this.deleteCoordinate}
        onLoad={e => console.log(e.currentTarget.height)}
      />
      <canvas />
        
        <div className="rowC">
        {this.state.coordinates.map((cord,index) => (  
          <div>
          <div class="container" style={{ width: "20%" }}>
            <div class="card-body">
            <label >Enter name:</label>
              <input type="text" class="card-subtitle mb-2 text-muted"></input>
              <p class="card-text">
                x:{cord.x}
              </p>
              <p class="card-text">
                y:{cord.y}
              </p>
              <p class="card-text">
                width:{cord.width}
              </p>
              <p class="card-text">
                height:{cord.height}
              </p>
            </div>
          </div>
        </div> 
        ))}
        
        </div>
        {this.state.showZone1 === true && (
          <div>
            <button>Save All</button>
          </div>
        )}
      </div>
    );
  }
}

export default ImgDropAndCrop;
