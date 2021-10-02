export const fileUpload = async ( file ) => {

    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dyigfrbji/upload';
    
    const formData = new FormData();
    
    // react-journal is passed as the upload_preset parameter when calling the upload API (cloudinary.com)
    formData.append('upload_preset', 'react-journal'); 
    
    formData.append('file', file);

    try {
        const resp = await fetch( cloudinaryUrl, {
            method: 'POST',
            body: formData
        });
        if ( resp.ok ){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        } else {
            //throw await resp.json();
            return null;
        }  
    } catch (err) { 
        throw err;
    }
}
