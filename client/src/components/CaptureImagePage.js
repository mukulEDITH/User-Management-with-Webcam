import React, { useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';
import '../components/CaptureImage'

const CaptureImagePage = () => {
  const webcamRef = React.useRef(null);
  const [image, setImage] = useState(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);

    // Send captured image to backend
    axios.post('/api/capture-image', { image: imageSrc })
      .then(response => {
        console.log(response.data);
        // Handle success response
      })
      .catch(error => {
        console.error('Error capturing image:', error);
        // Handle error
      });
  }, [webcamRef]);

  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Capture Image</button>
      {image && <img src={image} alt="Captured Image" />}
    </>
  );
};

export default CaptureImagePage;
