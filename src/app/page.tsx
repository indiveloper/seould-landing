'use client'

import { ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const SeoulLandingPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    // 현재 연도 설정
    setCurrentYear(new Date().getFullYear().toString());

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

        // Check for elements to animate on scroll
        document.querySelectorAll('.animate-on-scroll').forEach((el) => {
          const rect = el.getBoundingClientRect();
          const isVisible = (rect.top <= window.innerHeight * 0.8);

          if (isVisible) {
            el.classList.add('is-visible');
          }
        });
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      // 초기 스크롤 위치 설정
      handleScroll();
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

  const scrollToSection = (sectionId: string) => {
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
    <div className="relative font-sans text-gray-900 overflow-hidden bg-white">
      {/* Header with transparency based on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
        }`}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 bg-neutral-900 rounded-full ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-700`}></div>
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
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-neutral-900 rounded-full"></span>
                )}
              </button>
            ))}
            <button className={`px-5 py-2 rounded-full bg-neutral-900 text-white text-sm font-medium shadow-md hover:shadow-lg hover:bg-neutral-800 transition-all ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'} transition-all duration-700 delay-300`}>
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
        className={`fixed inset-0 bg-white/90 backdrop-blur-xl z-50 transition-transform duration-500 transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-neutral-900 rounded-full"></div>
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
            <button className="mt-8 w-full px-5 py-3 rounded-full bg-neutral-900 text-white text-lg font-medium">
              Plan Your Trip
            </button>
          </nav>
        </div>
      </div>

      {/* Hero section */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="https://images.pexels.com/photos/237211/pexels-photo-237211.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Seoul Skyline at Night"
              fill
              priority
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 container mx-auto px-6 py-16 text-center text-white">
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tight ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000`}>
            Seoul
          </h1>
          <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-12 font-light tracking-wide ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000 delay-300`}>
            Where tradition meets innovation
          </p>
          <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} transition-all duration-1000 delay-500`}>
            <button className="px-8 py-4 rounded-full bg-white text-neutral-900 font-medium hover:bg-gray-100 transition-all">
              Explore Seoul
            </button>
            <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-lg text-white font-medium border border-white/30 hover:bg-white/20 transition-all">
              Watch Video
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-all duration-1000 delay-700`}>
          <p className="text-white text-sm mb-2 font-light">Scroll to discover</p>
          <ChevronDown className="text-white animate-bounce" size={24} />
        </div>
      </section>

      {/* Culture section */}
      <section id="culture" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center animate-on-scroll">
            <span className="text-neutral-500 font-medium mb-2 block tracking-wider text-sm">HERITAGE</span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Cultural Wonders</h2>
            <p className="text-neutral-600 text-lg max-w-2xl font-light">
              Seoul&apos;s rich 2,000-year history is preserved in its magnificent palaces, traditional temples, and vibrant cultural districts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-[600px] rounded-3xl overflow-hidden shadow-xl animate-on-scroll">
              <div className="relative w-full h-full">
                <Image
                  src="https://images.unsplash.com/photo-1548115184-bc6544d06a58?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3"
                  alt="Traditional Korean Palace"
                  fill
                  style={{ objectFit: 'cover' }}
                  className="hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-8 animate-on-scroll">
              <div className="space-y-4 px-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Ancient Palaces</h3>
                <p className="text-neutral-600 text-lg font-light leading-relaxed">
                  Five grand royal palaces including UNESCO-listed Changdeokgung showcase Korea&apos;s architectural heritage and royal history.
                </p>
              </div>

              <div className="space-y-4 px-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Traditional Villages</h3>
                <p className="text-neutral-600 text-lg font-light leading-relaxed">
                  Bukchon and other traditional hanok villages offer a glimpse into Korea&apos;s past with their beautifully preserved homes.
                </p>
              </div>

              <div className="space-y-4 px-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Cultural Experiences</h3>
                <p className="text-neutral-600 text-lg font-light leading-relaxed">
                  Immerse yourself in temple stays, tea ceremonies, and traditional performances throughout the city.
                </p>
              </div>

              <button className="flex items-center text-neutral-900 font-medium hover:text-neutral-600 transition-colors px-4 mt-4">
                <span>Learn more about Seoul&apos;s culture</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Food section */}
      <section id="food" className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center animate-on-scroll">
            <span className="text-neutral-500 font-medium mb-2 block tracking-wider text-sm">CUISINE</span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">A Culinary Journey</h2>
            <p className="text-neutral-600 text-lg max-w-2xl font-light">
              Seoul&apos;s food scene is a vibrant tapestry of flavors, from traditional Korean dishes to innovative fusion cuisine.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Food gallery - large images with minimal text */}
            <div className="col-span-1 lg:col-span-3 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-on-scroll">
                <div className="h-96 rounded-3xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1498654896293-37aacf113fd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Korean BBQ with grilled meat and side dishes"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="h-96 rounded-3xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1590301157890-4810ed352733?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Korean Traditional Side Dishes (Banchan)"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>

                <div className="h-96 rounded-3xl overflow-hidden relative">
                  <Image
                    src="https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                    alt="Seoul Street Food Tteokbokki (Spicy Rice Cakes)"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </div>

            {/* Food information cards */}
            <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-4">Traditional Cuisine</h3>
              <p className="text-neutral-600 font-light mb-6 text-lg leading-relaxed">
                Experience authentic Korean flavors through banchan (side dishes), bibimbap, and hearty stews that showcase centuries of culinary tradition.
              </p>
              <div className="flex items-center text-sm text-neutral-500">
                <span>Found throughout Seoul</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-4">Interactive Dining</h3>
              <p className="text-neutral-600 font-light mb-6 text-lg leading-relaxed">
                Korean BBQ and hotpot restaurants offer a social dining experience where guests cook fresh ingredients at their table, creating memorable meal experiences.
              </p>
              <div className="flex items-center text-sm text-neutral-500">
                <span>Popular in Gangnam & Hongdae</span>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-sm hover:shadow-lg transition-shadow animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-4">Street Food Culture</h3>
              <p className="text-neutral-600 font-light mb-6 text-lg leading-relaxed">
                Explore vibrant markets like Gwangjang and Myeongdong where vendors serve up affordable, delicious bites from tteokbokki to hotteok sweet pancakes.
              </p>
              <div className="flex items-center text-sm text-neutral-500">
                <span>Best at night markets</span>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center animate-on-scroll">
            <button className="px-10 py-5 rounded-full border border-neutral-900 text-neutral-900 font-medium hover:bg-neutral-900 hover:text-white transition-all">
              Explore Seoul&apos;s Food Scene
            </button>
          </div>
        </div>
      </section>

      {/* Tech/Innovation section */}
      <section id="tech" className="py-32 bg-black text-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center animate-on-scroll">
            <span className="text-neutral-400 font-medium mb-2 block tracking-wider text-sm">INNOVATION</span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Where Tomorrow Happens Today</h2>
            <p className="text-neutral-300 text-lg max-w-2xl font-light">
              Seoul stands at the forefront of technological innovation, from blazing-fast internet to cutting-edge smart city initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-[600px] rounded-3xl overflow-hidden shadow-xl animate-on-scroll relative">
              <Image
                src="https://images.pexels.com/photos/2246476/pexels-photo-2246476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Futuristic Seoul cityscape at night showing Dongdaemun Design Plaza"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>

            <div className="flex flex-col justify-between animate-on-scroll">
              <div className="p-10 bg-neutral-900 rounded-3xl mb-6 h-[290px]">
                <h3 className="text-2xl font-semibold mb-4">Digital Experiences</h3>
                <p className="text-neutral-300 font-light">
                  Immerse yourself in Seoul&apos;s digital art museums, virtual reality arcades, and interactive tech exhibitions that blend creativity with cutting-edge technology.
                </p>
              </div>

              <div className="p-10 bg-neutral-900 rounded-3xl h-[290px]">
                <h3 className="text-2xl font-semibold mb-4">Smart City Pioneer</h3>
                <p className="text-neutral-300 font-light">
                  Experience how Seoul uses technology to enhance urban living, from its ultrafast 5G network to smart transportation and innovative public services.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 animate-on-scroll">
            <div className="p-10 bg-neutral-900 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-4">K-Tech Shopping</h3>
              <p className="text-neutral-300 font-light mb-4">
                Explore massive electronics markets like Yongsan and Gangnam&apos;s tech shops showcasing the latest innovations often months before global release.
              </p>
              <button className="flex items-center text-white font-medium opacity-70 hover:opacity-100 transition-colors">
                <span>Discover tech shopping spots</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>

            <div className="p-10 bg-neutral-900 rounded-3xl">
              <h3 className="text-2xl font-semibold mb-4">Digital Entertainment</h3>
              <p className="text-neutral-300 font-light mb-4">
                Experience how technology has transformed Korean entertainment, from K-pop&apos;s digital innovation to the thriving esports scene housed in dedicated arenas.
              </p>
              <button className="flex items-center text-white font-medium opacity-70 hover:opacity-100 transition-colors">
                <span>Explore digital entertainment</span>
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Nature section */}
      <section id="nature" className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center animate-on-scroll">
            <span className="text-neutral-500 font-medium mb-2 block tracking-wider text-sm">NATURE</span>
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 tracking-tight">Urban Oasis</h2>
            <p className="text-neutral-600 text-lg max-w-2xl font-light">
              Amid the urban landscape, Seoul offers surprising natural retreats - from mountain hiking trails to scenic river parks.
            </p>
          </div>

          <div className="flex flex-col space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
              <div className="h-[500px] rounded-3xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1584592740039-cddf0671f3d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Han River Park with Seoul skyline view"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-semibold mb-3">Han River Parks</h3>
                  <p className="text-white/90 font-light max-w-md">
                    11 beautiful parks along Seoul&apos;s iconic river offer cycling paths, water sports, and perfect picnic spots for relaxation.
                  </p>
                </div>
              </div>

              <div className="h-[500px] rounded-3xl overflow-hidden relative group">
                <Image
                  src="https://images.pexels.com/photos/2437291/pexels-photo-2437291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Bukhansan National Park mountain view"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-semibold mb-3">Mountain Escapes</h3>
                  <p className="text-white/90 font-light max-w-md">
                    Hike in Bukhansan National Park with its granite peaks and forested trails without leaving the city limits.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-on-scroll">
              <div className="h-[500px] rounded-3xl overflow-hidden relative group">
                <Image
                  src="https://images.pexels.com/photos/1109354/pexels-photo-1109354.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Seoul Forest with lush green trees"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-semibold mb-3">Urban Forests</h3>
                  <p className="text-white/90 font-light max-w-md">
                    Seoul Forest and Olympic Park offer lush green spaces within the urban grid for a natural escape.
                  </p>
                </div>
              </div>

              <div className="h-[500px] rounded-3xl overflow-hidden relative group">
                <Image
                  src="https://images.unsplash.com/photo-1601042879364-f3947d3f9c16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                  alt="Cheonggyecheon Stream with city lights"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-10 text-white">
                  <h3 className="text-3xl font-semibold mb-3">Cheonggyecheon Stream</h3>
                  <p className="text-white/90 font-light max-w-md">
                    An urban renewal masterpiece, this restored stream cuts through downtown Seoul offering peaceful walks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit section */}
      <section id="visit" className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2 animate-on-scroll">
              <span className="text-neutral-500 font-medium mb-2 block tracking-wider text-sm">PLAN YOUR VISIT</span>
              <h2 className="text-4xl md:text-5xl font-semibold mb-8 tracking-tight">Your Seoul Journey Starts Here</h2>
              <p className="text-neutral-600 text-lg mb-12 font-light max-w-2xl leading-relaxed">
                Easy to navigate and welcoming to international visitors, Seoul offers unforgettable experiences in every season. Let us help you plan the perfect trip.
              </p>

              <div className="space-y-12 mb-12">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-6">
                    <div className="text-neutral-900 font-bold">01</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">When to Visit</h3>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed">
                      Spring (cherry blossoms) and fall (autumn colors) offer mild weather and stunning scenery. Summer is festival season, winter showcases magical light displays.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-6">
                    <div className="text-neutral-900 font-bold">02</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Getting Around</h3>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed">
                      Seoul&apos;s world-class subway system connects all major attractions with English signage throughout. T-money cards make transportation seamless.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mr-6">
                    <div className="text-neutral-900 font-bold">03</div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Where to Stay</h3>
                    <p className="text-neutral-600 font-light text-lg leading-relaxed">
                      From luxury hotels to boutique hanok stays, Seoul offers accommodations for every style and budget in distinctive neighborhoods.
                    </p>
                  </div>
                </div>
              </div>

              <button className="px-10 py-5 rounded-full bg-neutral-900 text-white font-medium hover:bg-neutral-800 transition-colors shadow-md hover:shadow-lg">
                Plan Your Trip
              </button>
            </div>

            <div className="w-full lg:w-1/2 bg-white rounded-3xl shadow-lg p-12 animate-on-scroll">
              <h3 className="text-2xl font-semibold mb-8 text-center">Subscribe for Seoul Travel Updates</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-neutral-700 mb-2">I&apos;m interested in</label>
                  <select
                    id="interests"
                    className="w-full px-5 py-4 rounded-xl border border-neutral-200 focus:ring-2 focus:ring-neutral-900 focus:border-neutral-900 outline-none transition-all"
                  >
                    <option>Cultural Experiences</option>
                    <option>Food & Culinary Tours</option>
                    <option>Shopping & Fashion</option>
                    <option>Technology & Innovation</option>
                    <option>Nature & Outdoor Activities</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button type="submit" className="w-full py-5 bg-neutral-900 text-white font-medium rounded-xl hover:bg-neutral-800 transition-all shadow-md hover:shadow-lg">
                    Subscribe Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white pt-24 pb-8">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-20">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-8">
                <div className="w-10 h-10 bg-white rounded-full"></div>
                <h2 className="text-2xl font-medium text-white">Seoul Explorer</h2>
              </div>
              <p className="text-neutral-400 mb-8 font-light text-lg max-w-md leading-relaxed">
                Your guide to discovering the vibrant soul of South Korea&apos;s capital city, where tradition and innovation create a unique experience.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                  <span className="sr-only">Instagram</span>
                  {/* Instagram icon placeholder */}
                  <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                  <span className="sr-only">Twitter</span>
                  {/* Twitter icon placeholder */}
                  <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                </a>
                <a href="#" className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-colors">
                  <span className="sr-only">Facebook</span>
                  {/* Facebook icon placeholder */}
                  <div className="w-5 h-5 rounded-full border-2 border-current"></div>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8">Discover Seoul</h3>
              <ul className="space-y-6">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Top Attractions</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Cultural Experiences</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Food & Dining</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Shopping Guide</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Day Trips</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8">Practical Info</h3>
              <ul className="space-y-6">
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Transportation</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Accommodation</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Travel Tips</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">Safety Information</a></li>
                <li><a href="#" className="text-neutral-400 hover:text-white transition-colors font-light">FAQ</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-8">Contact Us</h3>
              <p className="text-neutral-400 mb-6 font-light">
                Have questions about visiting Seoul? Our team is here to help you plan your perfect trip.
              </p>
              <a href="mailto:info@seoulexplorer.com" className="text-white hover:text-neutral-300 transition-colors">
                info@seoulexplorer.com
              </a>
            </div>
          </div>

          <div className="border-t border-neutral-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0 font-light">
              © {currentYear} Seoul Explorer. All rights reserved.
            </p>
            <div className="flex space-x-8">
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors font-light">Privacy Policy</a>
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors font-light">Terms of Service</a>
              <a href="#" className="text-neutral-500 hover:text-white text-sm transition-colors font-light">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* CSS for animation-on-scroll */}
      <style jsx global>{`
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        
        .animate-on-scroll.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
};

export default SeoulLandingPage;