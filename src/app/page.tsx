'use client'

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';

// 클라이언트 사이드에서만 렌더링하는 컴포넌트
const ClientOnly = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <>{children}</>;
};

const SeoulLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY);

        // Determine active section based on scroll position
        const sections = ['hero', 'culture', 'food', 'tech', 'nature', 'visit'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // Set initial scroll position
      setScrollY(window.scrollY);
    }

    // Set loaded state after a short delay to trigger animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', handleScroll);
      }
      clearTimeout(timer);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const scrollToSection = (sectionId: string): void => {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(sectionId);
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          behavior: 'smooth'
        });
      }
      setMobileMenuOpen(false);
    }
  };

  // Navigation items
  const navItems = [
    { id: 'culture', label: 'Culture' },
    { id: 'food', label: 'Food' },
    { id: 'tech', label: 'Innovation' },
    { id: 'nature', label: 'Nature' },
    { id: 'visit', label: 'Visit' }
  ];

  return (
    <ClientOnly>
      <div className="relative font-sans text-gray-900 overflow-hidden">
        {/* Header with transparency based on scroll */}
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/90 backdrop-blur shadow-sm' : 'bg-transparent'
          }`}>
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className={`w-8 h-8 bg-red-500 rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}></div>
              <h1 className={`text-xl font-medium ${scrollY > 50 ? 'text-gray-900' : 'text-white'} ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700`}>
                Seoul Explorer
              </h1>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-1 py-2 text-sm font-medium ${scrollY > 50 ? 'text-gray-900' : 'text-white'
                    } ${activeSection === item.id ? 'opacity-100' : 'opacity-70 hover:opacity-100'} transition-all duration-300`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 rounded-full"></span>
                  )}
                </button>
              ))}
              <button className={`px-5 py-2 rounded-full bg-red-500 text-white text-sm font-medium shadow-md hover:shadow-lg hover:bg-red-600 transition-all ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-300`}>
                Plan Your Trip
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className={`md:hidden ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}
            >
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 bg-white z-50 transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="container mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-red-500 rounded-full"></div>
              <h1 className="text-xl font-medium text-gray-900">Seoul Explorer</h1>
            </div>
            <button onClick={toggleMobileMenu}>
              <X size={24} />
            </button>
          </div>
          <div className="container mx-auto px-6 py-8">
            <nav className="flex flex-col space-y-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex items-center justify-between text-xl font-medium text-gray-900 py-2 border-b border-gray-100"
                >
                  {item.label}
                  <ArrowRight size={18} />
                </button>
              ))}
              <button className="mt-8 w-full px-5 py-3 rounded-full bg-red-500 text-white text-lg font-medium">
                Plan Your Trip
              </button>
            </nav>
          </div>
        </div>

        {/* Hero section */}
        <section
          id="hero"
          className="relative min-h-screen flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))"
          }}
        >
          {/* Background image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1538669715315-155098f0fb1d"
              alt="서울 남산타워 야경"
              className="object-cover object-center"
              fill
              priority
              sizes="100vw"
            />
          </div>

          {/* Content overlay */}
          <div className="relative z-10 container mx-auto px-6 py-16 text-center text-white">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000`}>
              Discover the Soul<br />of <span className="text-red-400">Seoul</span>
            </h1>
            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000 delay-300`}>
              Where ancient traditions meet cutting-edge innovation in Asia&apos;s most dynamic city
            </p>
            <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000 delay-500`}>
              <button className="px-8 py-4 rounded-full bg-red-500 text-white font-medium shadow-lg hover:shadow-xl hover:bg-red-600 transition-all">
                Explore Seoul
              </button>
              <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur text-white font-medium border border-white/30 hover:bg-white/20 transition-all">
                Watch Video
              </button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-700`}>
            <p className="text-white text-sm mb-2">Scroll to discover</p>
            <ChevronDown className="text-white animate-bounce" size={24} />
          </div>
        </section>

        {/* Culture section */}
        <section id="culture" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
                <span className="text-red-500 font-medium mb-2 block">Heritage</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Cultural Wonders at Every Corner</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Seoul&apos;s rich 2,000-year history is preserved in its magnificent palaces, traditional temples, and vibrant cultural districts. Wander through time in a city where the past harmoniously blends with the future.
                </p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <p className="text-gray-700">Five grand royal palaces including UNESCO-listed Changdeokgung</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <p className="text-gray-700">Traditional hanok villages showcasing Korean architecture</p>
                  </li>
                  <li className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 mt-1">
                      <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    </div>
                    <p className="text-gray-700">Vibrant temple stays and traditional tea ceremonies</p>
                  </li>
                </ul>
                <button className="flex items-center text-red-500 font-medium hover:text-red-600 transition-colors">
                  <span>Explore cultural attractions</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
              <div className="w-full lg:w-1/2 h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="경복궁 전경"
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food section */}
        <section id="food" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-red-500 font-medium mb-2 block">Cuisine</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">A Culinary Journey</h2>
              <p className="text-gray-600 text-lg">
                Seoul&apos;s food scene is a vibrant tapestry of flavors, from traditional Korean dishes to innovative fusion cuisine. Discover why this city is becoming a global culinary destination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Food card 1 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="한국의 삼겹살"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Korean BBQ</h3>
                  <p className="text-gray-600 mb-4">
                    Experience the interactive joy of grilling your own marinated meats at the table, a cornerstone of Korean social dining.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">Gangnam</span>
                    <span>₩₩</span>
                  </div>
                </div>
              </div>

              {/* Food card 2 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
                    alt="명동 길거리 음식"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">Street Food Markets</h3>
                  <p className="text-gray-600 mb-4">
                    Dive into Seoul&apos;s vibrant street food culture at historic markets offering everything from bindaetteok to tteokbokki.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">Gwangjang Market</span>
                    <span>₩</span>
                  </div>
                </div>
              </div>

              {/* Food card 3 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-56 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1532347231146-80afc9e3df2b"
                    alt="현대적인 한식"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">New Korean Cuisine</h3>
                  <p className="text-gray-600 mb-4">
                    Discover how innovative chefs are reimagining traditional Korean flavors with modern techniques and presentation.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <span className="mr-4">Itaewon</span>
                    <span>₩₩₩</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button className="px-8 py-4 rounded-full bg-white text-red-500 font-medium border border-red-500 hover:bg-red-500 hover:text-white transition-all">
                Explore Food Guide
              </button>
            </div>
          </div>
        </section>

        {/* Tech/Innovation section */}
        <section id="tech" className="py-24 bg-gray-900 text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row-reverse items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pl-0 lg:pl-12">
                <span className="text-red-400 font-medium mb-2 block">Innovation</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Where Tomorrow Happens Today</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Seoul stands at the forefront of technological innovation, from blazing-fast internet to cutting-edge smart city initiatives. Experience a glimpse of the future in this dynamic metropolis.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-6 bg-gray-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Digital Playground</h3>
                    <p className="text-gray-400">
                      Immerse yourself in interactive digital art museums and futuristic entertainment venues.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Smart Infrastructure</h3>
                    <p className="text-gray-400">
                      Experience a city where technology enhances every aspect of urban living.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Tech Shopping</h3>
                    <p className="text-gray-400">
                      Explore massive electronics markets with the latest gadgets often months before global release.
                    </p>
                  </div>
                  <div className="p-6 bg-gray-800 rounded-xl">
                    <h3 className="text-lg font-bold mb-2">Digital Culture</h3>
                    <p className="text-gray-400">
                      Witness how technology has transformed entertainment, from K-pop to gaming.
                    </p>
                  </div>
                </div>
                <button className="flex items-center text-red-400 font-medium hover:text-red-300 transition-colors">
                  <span>Discover tech attractions</span>
                  <ArrowRight size={18} className="ml-2" />
                </button>
              </div>
              <div className="w-full lg:w-1/2 h-96 md:h-[500px] rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4"
                  alt="동대문디자인플라자"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Nature section */}
        <section id="nature" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-green-600 font-medium mb-2 block">Nature</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Urban Oasis</h2>
              <p className="text-gray-600 text-lg">
                Amid the urban landscape, Seoul offers surprising natural retreats - from mountain hiking trails to scenic river parks, providing perfect balance to city life.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1 md:col-span-2 h-80 rounded-2xl overflow-hidden relative group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="한강공원 야경"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Han River Parks</h3>
                  <p className="text-white/80">
                    11 parks along Seoul&apos;s iconic river offer cycling paths, water sports, and picnic spots.
                  </p>
                </div>
              </div>

              <div className="col-span-1 h-80 rounded-2xl overflow-hidden relative group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.pexels.com/photos/2437291/pexels-photo-2437291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="북한산 국립공원"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Mountain Escapes</h3>
                  <p className="text-white/80">
                    Hike in Bukhansan National Park without leaving the city limits.
                  </p>
                </div>
              </div>

              <div className="col-span-1 h-80 rounded-2xl overflow-hidden relative group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    alt="서울숲 공원"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Urban Forests</h3>
                  <p className="text-white/80">
                    Seoul Forest and Olympic Park offer lush green spaces within the urban grid.
                  </p>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 h-80 rounded-2xl overflow-hidden relative group">
                <div className="relative w-full h-full">
                  <Image
                    src="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16"
                    alt="청계천 야경"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Cheonggyecheon Stream</h3>
                  <p className="text-white/80">
                    An urban renewal masterpiece, this restored stream cuts through downtown Seoul.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visit section */}
        <section id="visit" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0 pr-0 lg:pr-12">
                <span className="text-red-500 font-medium mb-2 block">Plan Your Visit</span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Seoul Journey Starts Here</h2>
                <p className="text-gray-600 text-lg mb-8">
                  Easy to navigate and welcoming to international visitors, Seoul offers unforgettable experiences in every season. Let us help you plan the perfect trip.
                </p>

                <div className="space-y-6 mb-8">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <div className="text-red-500 font-bold">1</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">When to Visit</h3>
                      <p className="text-gray-600">
                        Spring (cherry blossoms) and fall (autumn colors) offer mild weather and stunning scenery. Summer is festival season, winter showcases magical light displays.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <div className="text-red-500 font-bold">2</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Getting Around</h3>
                      <p className="text-gray-600">
                        Seoul&apos;s world-class subway system connects all major attractions with English signage throughout. T-money cards make transportation seamless.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-4">
                      <div className="text-red-500 font-bold">3</div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-1">Where to Stay</h3>
                      <p className="text-gray-600">
                        From luxury hotels to boutique hanok stays, Seoul offers accommodations for every style and budget in distinctive neighborhoods.
                      </p>
                    </div>
                  </div>
                </div>

                <button className="px-8 py-4 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors shadow-md hover:shadow-lg">
                  Plan Your Trip
                </button>
              </div>

              <div className="w-full lg:w-1/2 bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-bold mb-6 text-center">Subscribe for Seoul Travel Updates</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-1">I&apos;m interested in</label>
                    <select
                      id="interests"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                    >
                      <option>Cultural Experiences</option>
                      <option>Food & Culinary Tours</option>
                      <option>Shopping & Fashion</option>
                      <option>Technology & Innovation</option>
                      <option>Nature & Outdoor Activities</option>
                    </select>
                  </div>

                  <div className="pt-2">
                    <button type="submit" className="w-full py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg">
                      Subscribe Now
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white pt-16 pb-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              <div>
                <div className="flex items-center space-x-2 mb-6">
                  <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  <h2 className="text-xl font-medium text-white">Seoul Explorer</h2>
                </div>
                <p className="text-gray-400 mb-6">
                  Your guide to discovering the vibrant soul of South Korea&apos;s capital city.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="sr-only">Instagram</span>
                    {/* Instagram icon placeholder */}
                    <div className="w-5 h-5 rounded-full border-2 border-white"></div>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="sr-only">Twitter</span>
                    {/* Twitter icon placeholder */}
                    <div className="w-5 h-5 rounded-full border-2 border-white"></div>
                  </a>
                  <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-500 transition-colors">
                    <span className="sr-only">Facebook</span>
                    {/* Facebook icon placeholder */}
                    <div className="w-5 h-5 rounded-full border-2 border-white"></div>
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Discover Seoul</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Top Attractions</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cultural Experiences</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Food & Dining</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Shopping Guide</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Day Trips</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Practical Info</h3>
                <ul className="space-y-4">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Transportation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Accommodation</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Travel Tips</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety Information</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6">Contact Us</h3>
                <p className="text-gray-400 mb-4">
                  Have questions about visiting Seoul? Our team is here to help you plan your perfect trip.
                </p>
                <a href="mailto:info@seoulexplorer.com" className="text-red-400 hover:text-red-300 transition-colors">
                  info@seoulexplorer.com
                </a>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © <span suppressHydrationWarning>{new Date().getFullYear()}</span> Seoul Explorer. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Sitemap</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </ClientOnly>
  );
};

export default SeoulLandingPage;