import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Curriculum from './pages/Curriculum';
import AcceleratorProgram from './pages/AcceleratorProgram';
import Pricing from './pages/Pricing';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import EmailTemplates from './pages/EmailTemplates';
import Gallery from './pages/Gallery';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import PerformanceOptimizer from './components/PerformanceOptimizer';

function App() {
  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-[#020817]">
        <PerformanceOptimizer />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/accelerator" element={<AcceleratorProgram />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/email-templates" element={<EmailTemplates />} />
          </Routes>
        </main>
        <ChatBot />
        <Footer />
      </div>
    </HashRouter>
  );
}

export default App;
