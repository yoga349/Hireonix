export const validateEmail = (email)=>{
    if(!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
   }
  //validate password
   const validatePassword = (password)=>{
   if(!password.trim()) return 'password is required';
   return '';
   }