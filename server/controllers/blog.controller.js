import fs from "fs"
import imagekit from "../configs/imageKit.js";
import Blog from "../models/blog.model.js";
export const addBlog = async(req,res)=>{
    try {
        const{title,description,category,isPublished }=JSON.parse(req.body.blog)
        const imageFile =req.file;

        // check field are present
        if(!title||!description||!category||!imageFile){
            return res.json({sucess:false,message:"Missing required fields"})
        }
        const fileBuffer = fs.readFileSync(imageFile.path)
        const response = imagekit.upload({file:fileBuffer,
            fileName:imageFile.originalname,folder:"/blogs"
        })
        const optimizeImage = imagekit.url({
            path:response.filePath,
            transformation:[{quality:auto},
                {format:"webp"},
                {width:1280}
            ]
        })
        const image = optimizeImage
        await Blog.create({title,description,category,isPublished,image})
        res.json({sucess:true,message:"Blog created sucessfully"})

    } catch (error) {
        res.json({sucess:false,message:error.message})
    }

}