import cloudinary from 'cloudinary';

// Configuration 
cloudinary.config({
    cloud_name: "ducirgwnz",
    api_key: "941554916254513",
    api_secret: "GQV-SrbW7EgT8VRlgNAEBBt_AIY",
});

const cloudinaryUploadImg = async (fileToUploads) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(fileToUploads, (result) => {
            resolve({
                url: result.secure_url,
            }, {
                resorce_type: "auto",
            })
        })
    })
};

export default cloudinaryUploadImg;