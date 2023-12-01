`use client`;
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import useFundStore from '../utils/store';
import { ipfsUploadImage, ipfsUploadMetadata } from '../utils/ipfsUpload';

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};


export default function ProjectImageUploader(props) {
    const imageURL = useFundStore(state => state.imageURL);
    console.log("imageURL", imageURL )
    const setImageURL = useFundStore(state => state.setImageURL);
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            handleIPFS();
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const handleIPFS = async() => {
        console.log(files);
        const cid = await ipfsUploadImage(files);
        // setImageCID(cid + "/" + files[0].name);

        //`https://ipfs.io/ipfs/${imageCID}`

        const imageCID = `${cid}`

        // const image = `https://ipfs.io/ipfs/${imageCID}`;
        const image = `https://${imageCID}.ipfs.nftstorage.link`;
        // const image = `https://${imageCID}`; 
        console.log(image);
        setImageURL(image);
    }

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.preview) }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
    }, []);

    return (
        <section className="container">

            
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <div>최소 1개 , 최대 5개의 이미지</div>
            </div>
            <div style={thumbsContainer}>
                {thumbs}
            </div>

            {
                imageURL && (
                    <div>
                        <img src={imageURL} alt="Picture of the author" width={500} height={500} />
                    </div>
                )


            }
        </section>
    );
}