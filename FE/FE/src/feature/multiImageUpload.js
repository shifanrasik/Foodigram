import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Carousel } from "react-bootstrap";
import './multiImageUpload.css'
function MultiImageUpload(props) {
    const [images, setImages] = useState([]);

    useEffect(() => {
        if (images.length > 0) {
            //   console.log(images);
            props.multiHandle(images)
        }
    }, [images]);
    const onDrop = (acceptedFiles) => {
        setImages((prevState) => [...prevState, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });
    const checking = () => {
        console.log(images);
        props.setMultiImages(images)
    }
    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the images here ...</p>
            ) : (
                <p style={{
                    width: "200px",
                    background: "#A7C7E7",
                    padding: "0",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    color: "#fff",
                    padding: "7px",
                    borderRadius: "10px",
                }}> <p style={{ fontSize: "22px", margin: "0px"  }} > +</p> <p style={{margin:" 6px"}} >ADD IMAGES</p></p>
            )}

            <div style={{ maxwidth: "600px", width: "600px" }} >
                <Carousel>
                    {images.map((image, index) => (
                        <Carousel.Item key={index}>
                            <img className="d-block w-100" src={URL.createObjectURL(image)} alt={`slide-${index}`} />
                        </Carousel.Item>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}

export default MultiImageUpload;
