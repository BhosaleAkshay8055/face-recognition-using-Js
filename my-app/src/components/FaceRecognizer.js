import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../App.css';

const FaceRecognizer = () => {
  const navigate = useNavigate();
  const videoRef = useRef();

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

  const handleRecognize = async () => {
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (!detection) return alert("No face detected!");

    const descriptor = Array.from(detection.descriptor);

    const res = await axios.post("http://localhost:5000/recognize", {
      descriptor,
    });

    if (res.data.name) {
      alert(`Hello ${res.data.name} (${res.data.phone})`);
    } else {
      alert(res.data.message);
    }
  };

  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <>
      <div className="recognizeMain">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray",
          }}
            >
          <h2 style={{ display: "inline", color: "white",}}>User Recognize</h2>
        </div>
        <div className="recognize">
           <div
                style={{
                display: "flex",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
                padding: "2%",
                borderRadius: "20px",
                }}
           >
            <video ref={videoRef} className="recognizeVideo" autoPlay />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
          <button onClick={handleRedirect}>Back to Home</button>
          <button onClick={handleRecognize} style={{  marginLeft: '2%',}}>Recognize</button>
        </div>
      </div>
    </>
  );
};

export default FaceRecognizer;
