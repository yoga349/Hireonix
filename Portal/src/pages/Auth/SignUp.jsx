import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Upload,
  Eye,
  EyeOff,
  UserCheck,
  Building2,
  AlertCircle,
  Loader,
} from "lucide-react";
import {
  validateAvatar,
  validateEmail,
  validatePassword,
} from "../utils/helper";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import uploadImage from "../utils/uploadImage";
import { useAuth } from "../../context/AuthContext";
const SignUp = () => {
  const {login} = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
    avatar: null,
  });

  const [formState, setFormState] = useState({
    loading: false,
    errors: {},
    showPassword: false,
    avatarPreview: null,
    success: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    //clear error when user typing
    if (formState.errors[name]) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: "" },
      }));
    }
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    if (formState.errors.role) {
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, role: "" },
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const error = validateAvatar(file);
      if (error) {
        setFormState((prev) => ({
          ...prev,
          errors: { ...prev.errors, avatar: error },
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, avatar: file }));

      //Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormState((prev) => ({
          ...prev,
          avatarPreview: e.target.result,
          errors: { ...prev.errors, avatar: "" },
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: !formData.fullName ? "Enter full name" : "",
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      role: !formData.role ? "Please select a role" : "",
      avatar: "",
    };

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });
    setFormState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setFormState((prev) => ({ ...prev, loading: true }));

    try {
      let avatarUrl = "";

      //Upload image if present
      if(formData.avatar){
        const imgUploadRes = await uploadImage(formData.avatar);
        avatarUrl = imgUploadRes.imageUrl || "";
      }
      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        name:formData.fullName,
        email:formData.email,
        password:formData.password,
        role:formData.role,
        avatar:avatarUrl || "",
      });

      //Handle successful registration 
      setFormState((prev)=>({
        ...prev,
        loading:false,
        success:true,
        errors:{},
      }));

      const {token,...user} = response.data;

      if(token){
        login(user,token);

        //Redirecting based on role
       navigate(
      formData.role === "employer"
        ? "/employer-dashboard"
        : "/find-jobs"
    );
  
      }
    } catch (error) {
      console.log("error", error);

      setFormState((prev) => ({
        ...prev,
        loading: false,
        errors: {
          submit:
            error.response?.data?.message ||
            "Registration failed. Please try again",
        },
      }));
    }
  };

  

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
          <h2 className="text-3xl font-bold text-white">Create Account</h2>
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
                  setFormState((prev) => ({
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
            <label className="text-sm text-gray-200">
              Profile Picture (Optional)
            </label>
            <div className="flex items-center gap-4 mt-3">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center overflow-hidden border border-white/20">
                {formState.avatarPreview ? (
                  <img
                    src={formState.avatarPreview}
                    alt="Avatar preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="text-gray-300" />
                )}
              </div>
              {/* Upload */}
              <div className="">
                <input
                  type="file"
                  id="avatar"
                  accept=".jpg,.jpeg,.png"
                  onChange={handleAvatarChange}
                  className=""
                />
                <label
                  htmlFor="avatar"
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg cursor-pointer transition"
                >
                  <Upload className="" />
                  <span>Upload profile image</span>
                </label>
                <p className="text-xs text-gray-400 mt-1">JPG,PNG up to 5MB</p>
              </div>
            </div>
            {formState.errors.avatar && (
              <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                <AlertCircle className="" />
                {formState.errors.avatar}
              </p>
            )}
          </div>
          {/* Role Selection */}
          <div>
            <label className="text-sm text-gray-200">I am a *</label>
            <div className="grid grid-cols-2 gap-4 mt-3">
              <button
                type="button"
                onClick={() => handleRoleChange("jobseeker")}
                className={`p-4 rounded-lg border-2 transition-all  flex flex-col items-center justify-center text-center ${
                  formData.role === "jobseeker"
                    ? "border-blue-500 bg-blue-500 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <UserCheck className="mb-2" />
                <div className="font-semibold">Job Seeker</div>
                <div className="text-xs text-gray-400">Looking for work</div>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange("employer")}
                className={`p-4 rounded-lg border-2 transition-all  flex flex-col items-center justify-center text-center ${
                  formData.role === "employer"
                    ? "border-blue-500 bg-blue-500 text-blue-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <Building2 className="mb-2" />
                <div className="font-semibold">Employer</div>
                <div className="text-xs text-gray-400">
                  Hiring talented people
                </div>
              </button>
            </div>

            {formState.errors.role && (
              <p className="text-red-300 text-sm mt-2 flex items-center gap-1">
                <AlertCircle size={16} />
                {formState.errors.role}
              </p>
            )}
          </div>
          {/* Submit Error */}
          {formState.errors.submit && (
            <div className="bg-red-500/20 border border-red-400 text-red-200 px-4 py-2 rounded-lg flex items-center gap-2">
              <AlertCircle size={16} />
              {formState.errors.submit}
            </div>
          )}
          <button
            type="submit"
            disabled={formState.loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg"
          >
            {formState.loading ? (
              <>
                <Loader className="animate-spin" size={18} />
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Create Account</span>
            )}
          </button>
          {/* Login link */}
          <div className="text-center mt-4">
            <p className="text-gray-300 text-sm">
              Already have an account?{""}
              <a
                href="/login"
                className="text-purple-400 hover:text-purple-300 font-semibold transition"
              >
                Sign In
              </a>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;
