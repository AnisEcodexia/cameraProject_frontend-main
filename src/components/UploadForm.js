import React, { useState } from "react";
import ReactPlayer from "react-player";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import { FormControl } from "react-bootstrap";

const UploadForm = () => {
  const [label, setLabel] = useState("");
  const [description, setDescription] = useState("");
  const [floor, setFloor] = useState("");
  const [section, setSection] = useState("");
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [videoFilePath, setVideoFilePath] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const types = ["video/avi", "video/mp4", "image/png"];

  const changeHandler = (e) => {
    let selected = e.target.files[0];
    console.log(selected);
    setShowForm(!showForm);
    if (selected && types.includes(selected.type)) {
      setVideoFilePath(URL.createObjectURL(e.target.files[0]));
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("Please select a video file (.mp4 or .avi)");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file, file.name);
    // formData.append("label", document.getElementsByName("label")[0].value);
    // formData.append("description", document.getElementsByName("description")[0].value);
    // formData.append("floor", document.getElementsByName("floor")[0].value);
    // formData.append("section", document.getElementsByName("section")[0].value);
    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
  } 
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    
    fetch("http://127.0.0.1:8000/upload", requestOptions)
      .then((response) => response.json())
      .then(function (response) {
        console.log(response);
      });
  };

  return (
    <form>
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div></div>}
      </div>

      {showForm && (
        <div className="rowC">
          <div>
            <ReactPlayer url={videoFilePath} controls={true} />
          </div>
          <div style={{ 'margin-left':`200px` }}>
            <div>
              <Form.Label>Label</Form.Label>
              <FormControl
                type="text"
                name="label"
                onChange={() => {
                  if (
                    typeof document.getElementsByName("label")[0] !=
                      "undefined" &&
                    document.getElementsByName("label")[0].value >= 1
                  ) {
                    setLabel(this.value);
                    setError("");
                  } else {
                    setLabel(null);
                    setError("Please select a video file (.mp4 or .avi)");
                  }
                }}
                value={label}
              />
            </div>
            <div>
              <label>Description</label>
              <FormControl
                type="text"
                name="description"
                onChange={() => {
                  if (
                    typeof document.getElementsByName("description")[0] !=
                      "undefined" &&
                    document.getElementsByName("description")[0].value >= 1
                  ) {
                    setDescription(this.value);
                    setError("");
                  } else {
                    setDescription(null);
                    setError("Please select a video file (.mp4 or .avi)");
                  }
                }}
                value={description}
              />
            </div>
            <div>
              <label>Floor</label>
              <FormControl
                type="text"
                name="floor"
                onChange={() => {
                  if (
                    typeof document.getElementsByName("floor")[0] !=
                      "undefined" &&
                    document.getElementsByName("floor")[0].value >= 1
                  ) {
                    setFloor(this.value);
                    setError("");
                  } else {
                    setFloor(null);
                    setError("Please select a video file (.mp4 or .avi)");
                  }
                }}
                value={floor}
              />
            </div>
            <div>
              <label>Section</label>
              <FormControl
                type="text"
                name="section"
                onChange={() => {
                  if (
                    typeof document.getElementsByName("section")[0] !=
                      "undefined" &&
                    document.getElementsByName("section")[0].value >= 1
                  ) {
                    setSection(this.value);
                    setError("");
                  } else {
                    setSection(null);
                    setError("Please select a video file (.mp4 or .avi)");
                  }
                }}
                value={section}
              />
            </div>
            <br></br>
            <div>
              <Button onClick={handleSubmit}> Submit </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default UploadForm;
