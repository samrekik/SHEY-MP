const cloudinary=require('cloudinary').v2
cloudinary.config({ 
        cloud_name: process.env.cloud_name, 
        api_key: process.env.cloud_Api_Key, 
        api_secret: process.env.cloud_Api_Secret// Click 'View API Keys' above to copy your API secret
    });

    module.exports=cloudinary