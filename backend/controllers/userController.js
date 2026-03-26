import fs from "fs";
import path from "path";
import User from "../models/User.js";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const updateProfile = async(req,res)=>{
    try{
        const {name,avatar,companyName,companyDescription,companyLogo,resume} = req.body;
        const user = await User.findById(req.user._id);
        if(!user) return res.status(404).json({message:"User not found"});

        user.name = name || user.name;
        user.avatar = avatar || user.avatar;
        user.resume = resume || user.resume;
         //Allowed upadating company info
         if(user.role === "employer"){
            user.companyName = companyName || user.companyName;
            user.companyDescription = companyDescription || user.companyDescription;
            user.companyLogo = companyLogo || user.companyLogo;
         }
         await user.save();

         res.json({
            _id:user._id,
            name:user.name,
            avatar:user.avatar || '',
            role:user.role,
            companyName:user.companyName || '',
            companyDescription:user.companyDescription||'',
            companyLogo:user.companyLogo||'',
            resume:user.resume||'',
       });
    }catch(err){
        res.status(500).json({message:err.message});

    }
};

export const deleteResume = async (req, res) => {
    try {
        const { resumeUrl } = req.body;

        // 1️⃣ Extract filename FIRST
        const fileName = resumeUrl?.split('/')?.pop();

        // 2️⃣ Validate filename (security)
        if (!fileName || fileName.includes("..")) {
            return res.status(400).json({ message: "Invalid file name" });
        }

        // 3️⃣ Get user
        const user = await User.findById(req.user._id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // 4️⃣ Role check
        if (user.role !== "jobseeker") {
            return res.status(403).json({ message: "Only jobseekers can delete resume" });
        }

        // 5️⃣ Build file path
        const filePath = path.join(__dirname, "../uploads", fileName);

        // 6️⃣ Delete file if exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        // 7️⃣ Update DB
        user.resume = '';
        await user.save();

        // 8️⃣ Response
        res.json({ message: "Resume deleted successfully" });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const getPublicProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.params.id).select("-password");
        if(!user) return res.status(404).json({message:"User not found"});
        res.json(user);
    }catch(err){
        res.status(500).json({message:err.message});

    }
}
