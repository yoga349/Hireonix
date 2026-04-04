import React, { useState } from 'react'
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Loader,
  AlertCircle,
  CheckCircle
} from 'lucide-react'
import { validateEmail } from '../utils/helper';
import { useAuth } from '../../context/AuthContext';
import { validatePassword } from '../utils/helper';
import { API_PATHS } from '../utils/apiPaths';
import axiosInstance from '../utils/axiosinstance';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {login} = useAuth();
          const navigate = useNavigate();

  const [formData,setFormData] = useState({
    email:'',
    password:'',
    rememberMe:false
  })

   const [formState,setFormState] = useState({
    loading:false,
    errors:{},
    showPassword:false,
    success:false
   });
 
  
   const handleInputChange = (e)=>{
    const {name,value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name]:value
    }));
    if(formState.errors[name]){
      setFormState(prev=>({
        ...prev,
        errors:{...prev.errors,[name]:""}
      }));
    }
   };
   const validateForm = ()=>{
    const errors = {
      email:validateEmail(formData.email),
      password:validatePassword(formData.password)
    };
    //empty error
    Object.keys(errors).forEach(key =>{
      if(!errors[key]) delete errors[key];
    });
    setFormState(prev=>({...prev,errors}));
    return Object.keys(errors).length === 0;
   };

   const handleSubmit = async (e)=>{
    e.preventDefault();
    if(!validateForm()) return;

    setFormState(prev=>({...prev,loading:true}));

    try {
  const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
    email: formData.email,
    password: formData.password,
    rememberMe: formData.rememberMe
  });

  const { token, role, ...user } = response.data;

  if (token) {
    login(user, token);

    navigate(
      role === "employer"
        ? "/employer-dashboard"
        : "/find-jobs"
    );
  }

} catch(error){
      setFormState(prev=>({
        ...prev,
        loading:false,
        errors:{
          submit:error.response?.data?.message || 'Login failed. Please check your credentials. '
        }

      }));
    }
   };


   

  return (
    
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 relative overflow-hidden">

  {/* Background glow */}
  <div className="absolute w-72 h-72 bg-purple-400 opacity-30 blur-3xl rounded-full top-10 left-10"></div>
  <div className="absolute w-72 h-72 bg-indigo-400 opacity-30 blur-3xl rounded-full bottom-10 right-10"></div>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl w-[360px]"
  >

    {/* Header */}
    <div className="text-center mb-8">
      <h2 className="text-3xl font-extrabold text-white tracking-wide">
        Welcome Back 👋
      </h2>
      <p className="text-gray-200 text-sm mt-2">
        Login to <span className="font-semibold text-white">Hireonix</span> and start your journey
      </p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">

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
              formState.errors.email ? "border-red-400" : "border-white/20"
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
            className={`w-full pl-10 pr-12 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border ${
              formState.errors.password ? "border-red-400" : "border-white/20"
            } focus:ring-2 focus:ring-purple-400 outline-none transition`}
            placeholder="Enter your password"
          />

          <button
            type="button"
            onClick={() =>
              setFormState(prev => ({
                ...prev,
                showPassword: !prev.showPassword
              }))
            }
            className="absolute right-3 top-3 text-gray-300 hover:text-white transition"
          >
            {formState.showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {formState.errors.password && (
          <p className="text-red-300 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={16} />
            {formState.errors.password}
          </p>
        )}
      </div>

      {/* Submit Error */}
      {formState.errors.submit && (
        <div className="bg-red-500/20 border border-red-400 text-red-200 p-3 rounded-lg text-sm flex gap-2 items-center">
          <AlertCircle size={16} />
          {formState.errors.submit}
        </div>
      )}

      {/* Button */}
      <button
        type="submit"
        disabled={formState.loading}
        className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:scale-[1.02] active:scale-[0.98] transition text-white py-3 rounded-xl flex items-center justify-center gap-2 font-semibold shadow-lg"
      >
        {formState.loading ? (
          <>
            <Loader className="animate-spin" size={18} />
            Logging in...
          </>
        ) : (
          "Sign In"
        )}
      </button>

      {/* Register */}
      <div className="text-center text-sm text-gray-200">
        Don't have an account?{" "}
        <a
          href="/sign-up"
          className="text-white font-semibold hover:underline hover:text-purple-200 transition"
        >
          Create Account
        </a>
      </div>

    </form>
  </motion.div>
</div>
  )
}
export default Login