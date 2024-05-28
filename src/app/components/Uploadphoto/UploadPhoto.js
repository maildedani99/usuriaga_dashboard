"use client"
import React, { useRef, useState, useContext } from 'react';
import * as request from 'superagent';
import { cloudName, uploadPreset } from './cloudinary';
import styles from './uploadphoto.module.css';
import { AiOutlinePlus } from "react-icons/ai";
import { UploadPhotoContext } from '../../lib/UploadPhotoContext';

const UploadPhoto = (props) => {

    const [photoUrl, setPhotoUrl] = useState(null);
    const fileInputEl = useRef(null);
    const { uploadPhotoArray, setUploadPhotoArray } = useContext(UploadPhotoContext)

    const onPhotoUploaded = (photoIdIn, fileName, response) => {
        setPhotoUrl(response.body.secure_url);
        setUploadPhotoArray([...uploadPhotoArray, response.body.secure_url] )
    };

    const onPhotoSelected = (files) => {
        const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

        for (const file of files) {
            setPhotoUrl(photoUrl + 1);
            const fileName = file.name;

            request
                .post(url)
                .field('upload_preset', uploadPreset)
                .field('file', file)
                .field('multiple', false)
                .on('progress', (progress) => console.debug(photoUrl, file.name, progress))
                .end((error, response) => {
                    onPhotoUploaded(photoUrl, fileName, response);
                });
        }
    };
  
    return (
        <div id="direct_upload">
            { props.num ?
                <div className={styles.__div_foto}>
                    <img src={props.num} />
                </div>

                :

                <form>
                    <div className={styles.__div_inputs_foto}>

                        <div className={styles.__div_foto}>
                            <label className={styles.__label_foto} >
                                <div className={styles.__contenedorAiPlus} >
                                    <AiOutlinePlus fill={'grey'} size={22}/>
                                </div>
                                <p className={styles.__upload}>Añadir imagen</p>
                                <input
                                    className={styles.__input}
                                    name={props.name}
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputEl}
                                    onChange={() => onPhotoSelected(fileInputEl.current.files)}
                                />
                            </label>
                        </div>
                    </div>
                </form>
            }

        </div>
    );
};

export default UploadPhoto;
