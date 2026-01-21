import React from 'react'
import Header from '../components/Header';
import Bloglist from '../components/Bloglist';
import Newletter from '../components/Newletter';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <Bloglist />
      </main>
      <Newletter />
      <Footer />
    </div>
  )
}

