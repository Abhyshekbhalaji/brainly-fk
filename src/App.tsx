import React from 'react';
import {Toaster} from 'react-hot-toast'
import './App.css';
import { Provider } from 'react-redux';
import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom';

import AuthForm from './components/ui/AuthForm';
import { store } from './store/store';
import Home from './components/ui/Home';
import ErrorPage from './components/ui/ErrorPage';

import SharedContentPage from './components/ui/SharePage';
function App() {
  const token =localStorage.getItem("token");
  return (

    <React.StrictMode>
      <Provider store={store}>
      <Toaster toastOptions={{
    success: {
      style: {
        background: '#66BB6A',
        fontWeight:"bold",
        color:"white"
      },
    },
    error: {
      style: {
        background: '#f56565',
        fontWeight:'bold',
        color:"white"
      },

    },
  }}/>
 
   <BrowserRouter> 
   <Routes>
 <Route path="/" element={token? <Navigate to="/home" /> :<AuthForm />}/> 
  <Route path="/home" element={token? <Home/>:<Navigate to='/'/>}/> 
  <Route path="/share/link" element={<SharedContentPage/>}/>
  <Route path="*" element={<ErrorPage/>}/> 
  </Routes>
   
   </BrowserRouter>
    </Provider>
    </React.StrictMode>
    
    
  )
}

export default App
