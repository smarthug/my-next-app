import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import useFundStore from '@/utils/store';
import { ipfsUploadImage } from '@/utils/ipfsUpload';
import { useCrowdStepStore } from '../utils/store';

// Styled component for the image
const UploadedImage = styled('img')({
    maxWidth: '100%',
    maxHeight: '200px',
    marginTop: '20px',
});

function ImageUploadButton({imageURL, setImageURL}) {
    // const [image, setImage] = useState(null);
    const setIsLoading = useCrowdStepStore(state => state.setIsLoading);

    // const imageURL = useFundStore(state => state.imageURL);
    // console.log("imageURL", imageURL)
    // const setImageURL = useFundStore(state => state.setImageURL);

    // Function to handle image change
    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            setIsLoading(true)
            const reader = new FileReader();
            // reader.onload = (e) => setImage(e.target.result);
            reader.readAsDataURL(file);


            // const cid = await ipfsUploadImage(files);
            const cid = await ipfsUploadImage([file]);
            // setImageCID(cid + "/" + files[0].name);

            //`https://ipfs.io/ipfs/${imageCID}`

            const imageCID = `${cid}`

            // const image = `https://ipfs.io/ipfs/${imageCID}`;
            const image = `https://${imageCID}.ipfs.nftstorage.link`;
            // const image = `https://${imageCID}`; 
            console.log(image);
            setImageURL(image);
            setIsLoading(false)
        }
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Button
                variant="contained"
                component="label"
            >
                Upload Image
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                />
            </Button>
            <div>
                {imageURL && <UploadedImage src={imageURL} alt="Uploaded" />}

                {/* {image && <UploadedImage src={image} alt="Uploaded" />} */}
            </div>
        </div>
    );
}

export default ImageUploadButton;
