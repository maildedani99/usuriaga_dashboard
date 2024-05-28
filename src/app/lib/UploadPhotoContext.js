"use client"
import React, { useState } from 'react';

const UploadPhotoContext = React.createContext()
const { Provider, Consumer } = UploadPhotoContext

function UploadPhotoProvider({ children }) {

    const [uploadPhotoArray, setUploadPhotoArray] = useState([])

    
    return (
        <Provider value={{ uploadPhotoArray, setUploadPhotoArray }}>
            {children}
        </Provider>
    )
}

export { UploadPhotoProvider, Consumer as UploadPhotoConsumer, UploadPhotoContext }