import React from 'react'
import { useRef, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import avatar from '../images/avatar.jpeg';

const NewPost = ({image}) => {
    const {url, width, height} = image;

    const imgRef = useRef();
    const canvasRef = useRef();

    const handleImage = async () => {
        const detections = await faceapi.detectAllFaces(imgRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();

        canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(imgRef.current);
        faceapi.matchDimensions(canvasRef.current, {
            height,
            width,
        })
        const resized = faceapi.resizeResults(detections, {
            height,
            width,
        })
        faceapi.draw.drawDetections(canvasRef.current, resized);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resized);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resized);
    }

    useEffect(() => {
        const loadModels = () => {
            Promise.all([
                faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
                faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
                faceapi.nets.faceExpressionNet.loadFromUri('/models'),
            ])
                .then(handleImage)
                .catch((e) => console.log(e));
        };

        imgRef.current && loadModels();
    })
    return (
        <div className="container">
            <div className="left" style={{ width, height}}>
                <img ref={imgRef} crossOrigin="anonymous" src={url} alt="" />
                <canvas ref={canvasRef} width={width} height={height} />
            </div>
            <div className="right">
                <div className="newPostCard">
                    <div className="addPost">
                        <img src={avatar} className="fab fa-facebook avatar" alt="avatar" />
                    </div>
                    <div className="postForm form-group">
                        <h1 style={{ color: 'white' }}>Upload picture</h1>
                        <input type="text" placeholder="what's on your mind?" className="postInput" />
                        <label htmlFor="file">
                            <i className="far fa-upload addIcon"></i>
                            <i className="far fa-file-upload addIcon"></i>
                            <i className="far fa-cloud-upload addIcon"></i>
                            <button className="btn-primary">Send</button>
                        </label>
                        <input type="file" id="file" style={{ display: "none" }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewPost
