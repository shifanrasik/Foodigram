import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button, Carousel } from "react-bootstrap";
import './multiImageUpload.css'
function MultiImageUploadView(props) {
    const [images, setImages] = useState(props && props.images?props.images :[]);
    // const [imageURL, setImageURL] = useState('');
   
    useEffect(() => {
        // setImages(props.images)
        console.log(images,"images");
      }, [props]);
    const onDrop = (acceptedFiles) => {
        setImages((prevState) => [...prevState, ...acceptedFiles]);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });
    const checking =()=>{
        console.log(images);
        props.setMultiImages(images)
    }
    return (
        <div>
                <div style={{ maxwidth: "600px"}} >
                    <Carousel>
                        {images && images.length > 0&& images.map((image, index) => (
                            <Carousel.Item key={index}>
                                <img className="img" src={image !=""? image : ""} alt={`slide-${index}`} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                </div>
        </div>
    );
}

export default MultiImageUploadView;
