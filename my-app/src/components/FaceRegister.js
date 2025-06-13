import React, { useRef, useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FaceRegister = () => {
  const navigate = useNavigate();
  const videoRef = useRef();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");

      startVideo();
    };
    loadModels();
  }, []);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => (videoRef.current.srcObject = stream))
      .catch((err) => console.error(err));
  };

  const handleCapture = async () => {
    console.log("1111111");
    const detections = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!detections) return alert("No face detected!");

    const descriptor = Array.from(detections.descriptor); // convert Float32Array

    // send to backend
    await axios.post("http://localhost:5000/register", {
      name,
      phone,
      descriptor,
    });

    alert("User registered!");
  };

  const handleRedirect = () => {
    navigate("/recognise");
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "gray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2 style={{ color: "white" }}>User Register</h2>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        //   width: "100%",
          backgroundColor: "darkgray",
        //   height: "100vh",
        padding: "3%"
        }}
      >
        <div className="userForm"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault(); // stop default reload
              handleCapture();
            }}
          >
            <input
              type="text"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
            <br></br>
            <br></br>
            <input
              type="number"
              placeholder="Phone"
              required
              onChange={(e) => setPhone(e.target.value)}
            />
            <br></br>
            <br></br>
            <video ref={videoRef} autoPlay width="300" height="200" />
            <br></br>
            <br></br>
            <button type="submit">Capture & Register</button>
          </form>
          <br></br>
          <button onClick={handleRedirect} style={{ marginLeft: "2%" }}>
            Recognise
          </button>
        </div>
      </div>
    </>
  );
};

export default FaceRegister;
