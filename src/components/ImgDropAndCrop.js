import React, { useRef, useEffect, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import "./custom-image-crop.css";
import MultiCrops from "react-multi-crops";
import { useSelector } from "react-redux";

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
const ImgDropAndCrop = () => {
  const imgName = useSelector((state) => state.counter.imgName);
  const image = useSelector((state) => state.counter.imageSrc);
  const _width = useRef(window.innerWidth);
  const [coordinates, setCoordinates] = useState([]);
  const [width, setWidth] = useState(window.innerWidth - 20);
  const imagePreviewCanvasRef = React.createRef();
  const fileInputRef = React.createRef();
  const [imgSrc, setImgSrc] = useState();
  const [imgSrcExt, setImgSrcExt] = useState();
  const [showZone1, setShowZone1] = useState(false);
  const [showZone, setShowZone] = useState(false);

  const verifyFile = (files) => {
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
  
  useEffect(() => {
    window.onresize = () => {
      const ratio = window.innerWidth / _width.current;
      console.log(ratio, coordinates[0]);
      _width.current = window.innerWidth;
      setWidth(window.innerWidth - 20);
      setCoordinates(
        coordinates.map((c) => ({
          ...c,
          x: c.x * ratio,
          y: c.y * ratio,
          width: c.width * ratio,
        }))
      );
    };
  }, [coordinates]);

  const changeCoordinate = (coordinate, index, coordinates) => {
    setCoordinates(coordinates);
    setShowZone(true);
    setShowZone1(true);
  };

  const deleteCoordinate = (coordinate, index, coordinates) => {
    setCoordinates(coordinates);
  };
  const handleDownloadClick = (event) => {
    console.log("imgName");
    setShowZone(true);
    if (imgSrc) {
      const canvasRef = imagePreviewCanvasRef.current;
      const imageData64 = canvasRef.toDataURL("image/" + imgSrcExt);
      const myFilename = "previewFile." + imgSrcExt;
      // file to be uploaded
      const myNewCroppedFile = base64StringtoFile(imageData64, myFilename);
      console.log(myNewCroppedFile);
      // download file
      downloadBase64File(imageData64, myFilename);
    }
  };

  const handleClearToDefault = (event) => {
    if (event) event.preventDefault();
    const canvas = imagePreviewCanvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setImgSrc(null);
    setImgSrcExt(null);

    fileInputRef.current.value = null;
  };

  const handleFileSelect = (event) => {
    const [file] = event.target.files;
    setImgSrc(URL.createObjectURL(file));
    setImgSrcExt(
      extractImageFileExtensionFromBase64(URL.createObjectURL(file))
    );

    const files = event.target.files;
    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        // imageBase64Data
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            // console.log(myFileItemReader.result)
            setImgSrc(URL.createObjectURL(file));
            setImgSrcExt(
              extractImageFileExtensionFromBase64(URL.createObjectURL(file))
            );
          },
          false
        );
        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  return (
    <div>
      
      <MultiCrops
      height={360}
      width={640}
        
        src={image}
        coordinates={coordinates}
        onChange={changeCoordinate}
        onDelete={deleteCoordinate}
        onLoad={(e) => console.log(e.currentTarget.height)}
      />
     
      <button onClick={handleDownloadClick}>Save</button>
      <canvas />
      {showZone === true && (
        <div className="rowC">
          {coordinates.map((cord) => (
            <div>
              <div class="container" style={{ width: "20%" }}>
                <div class="card-body">
                  <label>zone:{cord.id}</label>
                  <label>name:</label>
                  <input
                    type="text"
                    class="card-subtitle mb-2 text-muted"
                  ></input>
                  <p class="card-text">x:{cord.x}</p>
                  <p class="card-text">y:{cord.y}</p>
                  <p class="card-text">width:{cord.width}</p>
                  <p class="card-text">height:{cord.height}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showZone1 === true && (
        <div>
          <button>Save All</button>
        </div>
      )}
    </div>
  );
};

export default ImgDropAndCrop;
