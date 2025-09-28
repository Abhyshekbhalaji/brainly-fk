import React, { useState } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
const AuthForm: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
  
     const res= await axios.post('http://localhost:3000/api/v1/login',{username,password}).catch(error => {
        console.error('Error submitting data:', error);
      });
        if(res?.data.success){
          localStorage.setItem("token",res.data.token);
          toast.success("Welcome "+username )

          /// navigation logic here


        }else{
          toast.error("Invalid credentials")
        }
    } else {
       const res=await axios.post('http://localhost:3000/api/v1/signup',{username,password}).catch(error => {
        toast.error(error);
      });

      if(res?.data.success){
        setIsLogin(true);
            toast.success("Signed up successfully")
       clearInput();
      }
    }
  }

  function clearInput(){
     setUsername('')
        setPassword('');
  }
  function handleChange(){
    clearInput();
    setIsLogin(!isLogin);
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6 tracking-tight">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm transition-all duration-200 placeholder-gray-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all duration-200 active:scale-95"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm text-gray-500 mt-6">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            className="text-blue-600 hover:underline font-medium transition-colors duration-200"
            onClick={() => handleChange()}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AuthForm