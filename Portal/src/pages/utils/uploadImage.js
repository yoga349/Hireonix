import { API_PATHS } from "./apiPaths.js";
import axiosInstance from "./axiosinstance";

const uploadImage = async(imageFile)=>{
    const formData = new FormData();

    //Append image file to form data
    formData.append('image',imageFile);

    try{
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD,formData,{
            headers:{
                'Content-Type':'multipart/form-data',
            },
        });
        return response.data;
    } catch(error){
        console.error("Enter uploading the image",error);
        throw error;
    }
};

export default uploadImage;