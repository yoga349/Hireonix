import React,{useState} from 'react'
import { motion } from 'framer-motion'
import{
  User,
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  CheckCircle,
  AlertCircle,
  Loader,
} from "lucide-react";


const SignUp = () => {

    const [formData,setFormData] = useState({
      fullName:"",
      email:'',
      password:'',
      role:"",
      avatar:null,

    })
  
     const [formState,setFormState] = useState({
      loading:false,
      errors:{},
      showPassword:false,
      avatarPreview:null,
      success:false,
     });

    const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));

    //clear error when user typing
    if(formState.errors[name]){
      setFormState(prev=>({
        ...prev,
        errors:{...prev.errors,[name]:""}
      }));
    }
   };

   const handleRoleChange = (e)=>{

   };

   const validateForm = () =>{

   };

   const handleSubmit = async (e)=>{

   };

    if (formState.success) {
     return (
       <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">
   
         {/* Background Glow */}
         <div className="absolute w-72 h-72 bg-green-400 opacity-30 blur-3xl rounded-full top-10 left-10"></div>
         <div className="absolute w-72 h-72 bg-blue-400 opacity-30 blur-3xl rounded-full bottom-10 right-10"></div>
   
         <motion.div
           initial={{ opacity: 0, scale: 0.85, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.6 }}
           className="bg-white/10 backdrop-blur-xl border border-white/20 p-10 rounded-3xl shadow-2xl text-center w-[360px]"
         >
   
           {/* Icon */}
           <div className="flex justify-center mb-5">
             <div className="bg-green-500/20 p-4 rounded-full">
               <CheckCircle className="text-green-400" size={40} />
             </div>
           </div>
   
           {/* Title */}
           <h2 className="text-2xl font-bold text-white mb-2">
             Account Created!
           </h2>
   
           {/* Message */}
           <p className="text-gray-200 text-sm mb-6">
             Welcome to Hireonix! Your account has been successfully created.
           </p>
           {/* Redirect text */}
                   <div className="flex items-center justify-center gap-2 text-gray-300 text-sm">
                     <Loader className="animate-spin" size={16} />
                     Redirecting to your dashboard...
                   </div>
           
           
                 </motion.div>
               </div>
     );
    }

 return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-indigo-900 to-black px-4">
    
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-8"
    >
      
      {/* Heading */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white">
          Create Account
        </h2>
        <p className="text-gray-300 mt-2">
          Find talent or discover jobs — all in one place!
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-200">Full Name *</label>

          <div className="relative mt-2">
            <User className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border ${
                formState.errors.fullName
                  ? "border-red-400"
                  : "border-white/20"
              } focus:ring-2 focus:ring-purple-400 outline-none transition`}
              placeholder="Enter your full name"
            />
          </div>

          {formState.errors.fullName && (
            <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} />
              {formState.errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="text-sm text-gray-200">Email Address</label>

          <div className="relative mt-2">
            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border ${
                formState.errors.email
                  ? "border-red-400"
                  : "border-white/20"
              } focus:ring-2 focus:ring-purple-400 outline-none transition`}
              placeholder="Enter your email"
            />
          </div>

          {formState.errors.email && (
            <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} />
              {formState.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="text-sm text-gray-200">Password</label>

          <div className="relative mt-2">
            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

            <input
              type={formState.showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full pl-10 pr-10 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border ${
                formState.errors.password
                  ? "border-red-400"
                  : "border-white/20"
              } focus:ring-2 focus:ring-purple-400 outline-none transition`}
              placeholder="Enter your password"
            />

            <button
              type="button"
              onClick={() =>
                setFormState(prev => ({
                  ...prev,
                  showPassword: !prev.showPassword,
                }))
              }
              className="absolute right-3 top-3 text-gray-300 hover:text-white transition"
            >
              {formState.showPassword ? (
                <EyeOff size={18} />
              ) : (
                <Eye size={18} />
              )}
            </button>
          </div>

          {formState.errors.password && (
            <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={16} />
              {formState.errors.password}
            </p>
          )}
        </div>

        {/* Avatar Upload */}
        <div>
          <label className=''>
            Profile Picture (Optional)
          </label>
          <div className=''>
            <div className=''>
              {formState.avatarPreview?(
                <img src={formState.avatarPreview}
                alt="Avatar preview"
                className=""/>

              ):(
                <User className=''/>
              )}
            </div>
           
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
        >
          Create Account
        </button>

      </form>
    </motion.div>
  </div>
);
}

export default SignUp