import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ChapterBreakdownSection = () => {
  const [activeChapter, setActiveChapter] = useState(null);

  const chapters = [
    {
      id: 1,
      title: "Chapter 1 & 2: How to Build & Monetize a YouTube Automation Channel in 30 Days",
      description: "In these chapters, we cover everything you need to know about setting up and monetizing your YouTube channel in just 30 days. You'll learn the basics of automation, tools to use, and how to make your channel profitable quickly without showing your face or spending hours editing videos.",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=400&fit=crop",
      icon: "PlayCircle",
      color: "emerald",
      features: ["30-day setup guide", "Automation basics", "Quick monetization", "No face required"]
    },
    {
      id: 2,
      title: "Chapter 3 to 16: How to Go Viral with the 2025 YouTube Algorithm",
      description: "These chapters dive deep into the latest 2025 YouTube algorithm changes and how you can use automation to leverage them. You'll learn how to create content that gets recommended by YouTube and go viral with minimal effort.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
      icon: "TrendingUp",
      color: "success",
      features: ["2025 algorithm secrets", "Viral content strategies", "Recommendation optimization", "Minimal effort approach"]
    },
    {
      id: 3,
      title: "Chapters 4, 5 & 7: The Best Free & Paid AI Tools to Automate Your Channel",
      description: "Discover which AI tools work best for beginners to automate video creation, editing, and SEO. These tools will handle most of your channel's needs, leaving you with more time to focus on scaling your content and growing your audience.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
      icon: "Zap",
      color: "blue",
      features: ["Free AI tools", "Paid automation", "Video creation", "SEO optimization"]
    },
    {
      id: 4,
      title: "Chapters 6, 8 & 9: High-Profit Niches & AI-Generated Content That Actually Works",
      description: "In these chapters, we'll walk you through the best high-profit niches on YouTube and how to generate content that actually performs. With AI-driven content creation, you'll discover which niches have the highest earning potential.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      icon: "Target",
      color: "purple",
      features: ["High-profit niches", "AI content generation", "Performance optimization", "Earning potential"]
    },
    {
      id: 5,
      title: "Chapters 10, 12 & 13: 3 Passive Income Streams with YouTube Automation",
      description: "Learn how to monetize your YouTube channel in three profitable ways. These chapters reveal strategies to create automated streams of income from ads, affiliate marketing, and digital product sales.",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop",
      icon: "DollarSign",
      color: "emerald",
      features: ["Ad revenue", "Affiliate marketing", "Digital products", "Passive income"]
    },
    {
      id: 6,
      title: "Chapters 11 & 14: Content Schedules That Scale Your Channel to $100K+",
      description: "Discover how to schedule your content strategically to maximize reach and engagement. These chapters will teach you how to scale your channel to a six-figure business by optimizing your content production process.",
      image: "https://images.unsplash.com/photo-1506784365847-bbad939e9335?w=600&h=400&fit=crop",
      icon: "Calendar",
      color: "success",
      features: ["Content scheduling", "Strategic planning", "Six-figure scaling", "Production optimization"]
    },
    {
      id: 7,
      title: "Chapter 17: The Most Common Mistakes That Kill New YouTube Channels",
      description: "We identify and help you avoid the most common mistakes that destroy new YouTube channels. Learn what to do—and what not to do—when building your brand on YouTube.",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop",
      icon: "AlertTriangle",
      color: "red",
      features: ["Common mistakes", "Avoid pitfalls", "Best practices", "Channel protection"]
    },
    {
      id: 8,
      title: "Chapters 18, 20 & 21: Build a Team & Future-Proof Your YouTube Business",
      description: "Learn how to build a team to support your growing YouTube business and automate the process further. These chapters help you create a sustainable, scalable business model that lasts for years.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
      icon: "Users",
      color: "blue",
      features: ["Team building", "Business scaling", "Future-proofing", "Sustainable growth"]
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      emerald: {
        bg: 'bg-emerald-50',
        text: 'text-emerald-600',
        border: 'border-emerald-200',
        hover: 'hover:bg-emerald-100',
        icon: 'text-emerald-600'
      },
      success: {
        bg: 'bg-success/10',
        text: 'text-success',
        border: 'border-success/20',
        hover: 'hover:bg-success/20',
        icon: 'text-success'
      },
      blue: {
        bg: 'bg-blue-50',
        text: 'text-blue-600',
        border: 'border-blue-200',
        hover: 'hover:bg-blue-100',
        icon: 'text-blue-600'
      },
      purple: {
        bg: 'bg-purple-50',
        text: 'text-purple-600',
        border: 'border-purple-200',
        hover: 'hover:bg-purple-100',
        icon: 'text-purple-600'
      },
      red: {
        bg: 'bg-red-50',
        text: 'text-red-600',
        border: 'border-red-200',
        hover: 'hover:bg-red-100',
        icon: 'text-red-600'
      }
    };
    return colorMap[color] || colorMap.emerald;
  };

  return (
    <section className="section-padding bg-gradient-to-br from-muted to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-success/15 rounded-full blur-3xl"></div>
      </div>

      <div className="container-max relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-playfair">
            What You'll Learn in This{' '}
            <span className="text-emerald-600">Complete Ebook</span>
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            A comprehensive breakdown of all 21 chapters that will transform you from a complete beginner 
            to a six-figure YouTube automation expert. Each chapter is designed to build upon the previous one.
          </p>
        </div>

        {/* Chapters Grid */}
        <div className="space-y-12">
          {chapters.map((chapter, index) => {
            const colorClasses = getColorClasses(chapter.color);
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={chapter.id}
                className={`group relative bg-white rounded-2xl p-8 card-shadow hover:shadow-xl transition-all duration-500 overflow-hidden ${
                  activeChapter === chapter.id ? 'ring-2 ring-emerald-500' : ''
                }`}
                onMouseEnter={() => setActiveChapter(chapter.id)}
                onMouseLeave={() => setActiveChapter(null)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${chapter.color}-50 to-${chapter.color}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                
                <div className="relative z-10">
                  <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Image Section */}
                    <div className={`${!isEven ? 'lg:col-start-2' : ''}`}>
                      <div className="relative group">
                        <div className="aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                          <Image
                            src={chapter.image}
                            alt={chapter.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        {/* Overlay with icon */}
                        <div className={`absolute inset-0 bg-gradient-to-t from-${chapter.color}-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center`}>
                          <Icon name={chapter.icon} size={48} className="text-white drop-shadow-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`${!isEven ? 'lg:col-start-1' : ''}`}>
                      {/* Chapter Badge */}
                      <div className={`inline-flex items-center space-x-2 ${colorClasses.bg} ${colorClasses.border} text-${chapter.color}-600 px-4 py-2 rounded-full text-sm font-medium mb-4`}>
                        <Icon name={chapter.icon} size={16} className={colorClasses.icon} />
                        <span>Chapter {chapter.id}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 leading-tight font-playfair">
                        {chapter.title}
                      </h3>

                      {/* Description */}
                      <p className="text-text-secondary text-lg leading-relaxed mb-6">
                        {chapter.description}
                      </p>

                      {/* Features Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {chapter.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2 text-sm text-text-secondary">
                            <Icon name="CheckCircle" size={16} className="text-emerald-600 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Learn More Button */}
                      <button className={`mt-6 inline-flex items-center space-x-2 ${colorClasses.bg} ${colorClasses.hover} ${colorClasses.text} px-6 py-3 rounded-xl font-medium transition-all duration-300 group-hover:scale-105`}>
                        <span>Learn More</span>
                        <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-emerald-50 to-success/10 rounded-2xl p-8 border border-emerald-200">
            <h3 className="text-2xl font-bold text-primary mb-4 font-playfair">
              Ready to Start Your YouTube Automation Journey?
            </h3>
            <p className="text-text-secondary text-lg mb-6">
              Join 12,000+ students who've already transformed their lives with this complete system.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-emerald-600 to-success hover:from-emerald-700 hover:to-success/90 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-lg">
                Get Instant Access Now
              </button>
              <button className="border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300">
                Preview Sample Chapter
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChapterBreakdownSection; 