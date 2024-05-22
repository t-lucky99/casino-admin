/* eslint-disable @next/next/no-img-element */
"use client"

import { useState } from "react"
import { useImgStore } from "@/store/zustand";
import { Input } from "@/components/ui/input"

const ImageUpload = () => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const {imageFile, updateImageFile} = useImgStore();

    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if(file) {
            setImage(file);   
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as any);                    
            };
            
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if(!image) return;

        const formData = new FormData();
        formData.append('file', image);
        formData.append('fileNewName', imageFile);

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });


        if(res.ok) {
            const data = await res.json();
            console.log("data:::", data)
            updateImageFile(data.newFileName)
            alert('Image uploaded successfully!');
        } else {
            alert('Image upload failed!');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Input type="file" onChange={handleImageChange} accept="image/*" />
            {preview && <img src={preview} alt="Image Preview" style={{ width: '200px', marginTop: '10px' }} />}
            <button type="submit">Upload Image</button>
        </form>
    );

};

export default ImageUpload;