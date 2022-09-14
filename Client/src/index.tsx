import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { ToastContainer, toast, ToastContentProps } from "react-toastify";
import Navbar from './components/Navbar';
import Head from './components/Head';
import Place from './components/place';
import PageNotFound from './components/NotFound'
import { AppProvider } from './context';
import VerifiedPage from './components/VerifiedPage'
import CafePage from './pages/cafePage';
import RestrPage from './pages/restrPage';
import MainPage from './pages/mainPage';
import Footer from './components/footer'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <Router>
        <div className='sticky top-0'>
          <Head />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route path='/cafe' element={<CafePage />} />
            <Route path='/restr' element={<RestrPage />} />
            <Route path='/cafe/:id' element={<Place placeType={0} />} />
            <Route path='/restr/:id' element={<Place placeType={1} />} />
            <Route path='/client/confirm/:confirmationCode' element={<VerifiedPage />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
          <Footer />
        </div>

      </Router>
    </AppProvider>

  </React.StrictMode>
);

