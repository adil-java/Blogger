import React from 'react'
// import {BlogCard}from '../components/BlogCard'
import Header from '../components/Header';
// import Bloglist from '../components/Bloglist';

import Bloglist from '../components/Bloglist';
import Newletter from '../components/Newletter';
import Footer from '../components/Footer';


export default function Home() {
  return (
    <>
    <div className=''>

      <Header/>
    </div> 
    <div className='pt-3 '>
      <Bloglist/>
         
   
      </div>
    <Newletter/>
     <Footer />
    </>
   
  )
}

