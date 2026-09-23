import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyChooseUs from './components/WhyChooseUs';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Reports from './components/Reports';
import Security from './components/Security';
import CTA from './components/CTA';
import Contact from './components/Contact';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <Hero />
    <WhyChooseUs />
    <Security />
    <CTA />
  </>
);

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
