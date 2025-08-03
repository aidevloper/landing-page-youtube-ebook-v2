import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MobileOptimizedHero = () => {
  const navigate = useNavigate();
  const [currentStudentCount, setCurrentStudentCount] = useState(12847);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStudentCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[60vh] sm:min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
      {/* Mobile-optimized background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-5 w-24 h-24 sm:top-20 sm:left-10 sm:w-72 sm:h-72 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-5 w-32 h-32 sm:bottom-20 sm:right-10 sm:w-96 sm:h-96 bg-green-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center min-h-[60vh] sm:min-h-screen">
          {/* Mobile-optimized content */}
          <div className="text-center lg:text-left space-y-4 sm:space-y-6">
            {/* Trust badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-100/20 backdrop-blur-sm text-emerald-400 px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium">
              <Icon name="TrendingUp" size={14} className="sm:w-4 sm:h-4" />
              <span>Trusted by {currentStudentCount.toLocaleString('en-IN')}+ Students</span>
            </div>

            {/* Mobile-optimized headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-playfair">
              Build Your{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-green-400 bg-clip-text text-transparent">Six-Figure</span>{' '}
              Faceless YouTube Empire{' '}
              <span className="text-green-400">in 30 Days</span>
            </h1>

            {/* Mobile-optimized subheadline */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed">
              Master AI automation to create viral content without showing your face, 
              editing videos, or any technical skills. Complete beginners are earning
              <span className="text-green-400 font-semibold px-1 sm:px-2 py-1 rounded-md"> ₹4,50,000+ monthly</span> 
              with our proven system.
            </p>

            {/* Mobile-optimized benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/90 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                <Icon name="CheckCircle" size={16} className="sm:w-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm font-medium">No Camera Required</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/90 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                <Icon name="CheckCircle" size={16} className="sm:w-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm font-medium">AI Does Everything</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start space-x-2 text-white/90 bg-white/10 backdrop-blur-sm p-2 sm:p-3 rounded-lg">
                <Icon name="CheckCircle" size={16} className="sm:w-5 sm:h-5 text-green-400" />
                <span className="text-xs sm:text-sm font-medium">30-Day Guarantee</span>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-6 text-white/80 text-xs sm:text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} className="sm:w-4 sm:h-4 text-green-400" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={14} className="sm:w-4 sm:h-4 text-green-400" />
                <span>12,000+ Success Stories</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={14} className="sm:w-4 sm:h-4 text-green-400" />
                <span>4.9/5 Rating</span>
              </div>
            </div>
          </div>

          {/* Mobile-optimized image section */}
          <div className="relative mt-6 lg:mt-0">
            <div className="relative z-20">
              <div className="bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl p-2 sm:p-4">
                <Image
                  src="/assets/images/youtube1-1753769145253.jpg"
                  alt="Build a Six-Figure Faceless YouTube Channel in 2025 - AI Powered Ebook"
                  className="w-full h-auto rounded-lg sm:rounded-xl shadow-2xl"
                />
              </div>
              
              {/* Mobile-optimized floating elements */}
              <div className="absolute -top-2 -left-2 sm:-top-6 sm:-left-6 bg-gradient-to-r from-green-400 to-green-600 text-white px-2 sm:px-6 py-1 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl">
                <div className="text-xs font-medium">Monthly Revenue</div>
                <div className="text-sm sm:text-xl font-bold">₹4,50,000+</div>
              </div>
              
              <div className="absolute -bottom-2 -right-2 sm:-bottom-6 sm:-right-6 bg-gradient-to-r from-blue-400 to-blue-600 text-white px-2 sm:px-6 py-1 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl">
                <div className="text-xs font-medium">Success Rate</div>
                <div className="text-sm sm:text-xl font-bold">94.7%</div>
              </div>
              
              <div className="absolute top-1/2 -right-4 sm:-right-10 bg-white text-blue-900 px-2 sm:px-4 py-1 sm:py-3 rounded-lg sm:rounded-xl shadow-2xl">
                <div className="text-xs font-medium">Avg. Setup Time</div>
                <div className="text-xs sm:text-sm font-bold">30 Days</div>
              </div>

              <div className="absolute top-1/4 -left-4 sm:-left-8 bg-green-400/20 backdrop-blur-sm text-green-400 px-2 sm:px-3 py-1 sm:py-2 rounded-lg shadow-lg">
                <div className="text-xs font-medium">AI Powered</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile-optimized scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="flex flex-col items-center space-y-1 sm:space-y-2">
          <Icon name="ChevronDown" size={20} className="sm:w-6 sm:h-6" />
          <span className="text-xs font-medium">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
};

export default MobileOptimizedHero; 