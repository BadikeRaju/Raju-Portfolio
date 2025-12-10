// FIXED Experience.jsx
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ExperienceAnimatedBackground from './ExperienceAnimatedBackground';
import { TextGenerateEffect } from './TextGenerateEffect';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const experiences = [
  {
    id: 1,
    company: "Techcurators",
    role: "Technical Project Associate (Intern)",
    duration: "Feb 2024 – Jul 2025",
    period: "2024-25",
    description: [
      "Contributed to designing and developing an internal content management and project tracking platform.",
      "Streamlined workflows and monitored progress across teams.",
      "Built and optimized a multi-model content generation system leveraging GPT-4, GPT-3.5, and fine-tuned models.",
      "Achieved an 80% reduction in content creation time.",
      "Engineered a Retrieval-Augmented Generation (RAG) chatbot using hybrid retrieval (BM25 + Word2Vec).",
      "Enhanced enterprise knowledge search, reducing repeated queries by 40%.",
      "Collaborated in agile sprints, participated in code reviews, and supported deployments."
    ]
  },
  {
    id: 2,
    company: "Techcurators",
    role: "Technical Project Associate (Full-time)",
    duration: "Jul 2025 – Present",
    period: "2025 - Present",
    description: [
      "Leading development of internal content management and project tracking platform.",
      "Building and optimizing multi-model content generation systems with GPT-4, GPT-3.5, and fine-tuned models.",
      "Engineering RAG chatbots with hybrid retrieval for enhanced enterprise knowledge search.",
      "Collaborating in agile sprints and participating in code reviews.",
      "Supporting deployments and ensuring software quality and delivery.",
      "Mentoring team members and contributing to technical decision-making."
    ]
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState('next');
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);


  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'SF Pro Display';
        src: url('${import.meta.env.BASE_URL}fonts/SF-Pro-Display-Medium.otf') format('opentype');
        font-weight: 500;
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  }, []);

  // Navigation functions
  const goToNext = () => {
    if (currentIndex < experiences.length - 1) {
      setDirection('next');
      setCurrentIndex(prev => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setDirection('prev');
      setCurrentIndex(prev => prev - 1);
    }
  };

  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartXRef.current || !touchEndXRef.current) return;
    
    const distance = touchStartXRef.current - touchEndXRef.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swipe left - go to next
      goToNext();
    } else if (distance < -minSwipeDistance) {
      // Swipe right - go to previous
      goToPrevious();
    }

    touchStartXRef.current = 0;
    touchEndXRef.current = 0;
  };

  const ExperienceCard = ({ exp, isActive, direction }) => (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: direction === 'next' ? 100 : -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction === 'next' ? -100 : 100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full max-w-5xl mx-auto px-6"
        >
          <div className="flex flex-col lg:flex-row lg:gap-16 items-center lg:items-start">
            {/* Left Side - Year */}
            <div className="lg:w-1/3 flex flex-col items-center lg:items-end mb-8 lg:mb-0">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-center lg:text-right"
              >
                <motion.div
                  className="text-4xl md:text-5xl font-bold mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #ff6b35, #f7931e, #ffdd00, #4fc3f7)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  {exp.period}
                </motion.div>

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "60px" }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-0.5 mx-auto lg:ml-auto lg:mr-0 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #ff7b54, #42a5f5)'
                  }}
                />
              </motion.div>
            </div>

            {/* Right Side - Experience Details */}
            <div className="lg:w-2/3">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Duration */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <span className="inline-block px-3 py-1 text-sm font-medium text-gray-300 bg-white/10 rounded-full border border-white/20">
                    {exp.duration}
                  </span>
                </motion.div>

                {/* Role */}
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                  }}
                  transition={{
                    opacity: { duration: 0.4, delay: 0.4 },
                    y: { duration: 0.4, delay: 0.4 },
                    backgroundPosition: {
                      duration: 5,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }}
                  className="text-2xl md:text-3xl font-bold"
                  style={{
                    background: 'linear-gradient(90deg, #ff7b54, #ffb347, #ffd700, #4fc3f7, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%'
                  }}
                >
                  {exp.role}
                </motion.h2>


                {/* Company */}
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                  className="text-lg md:text-xl font-medium text-gray-300"
                >
                  {exp.company}
                </motion.p>

                {/* Description */}
                <motion.div
                  className="space-y-3 pt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  {exp.description.map((point, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className="flex-shrink-0 w-1.5 h-1.5 rounded-full mt-2"
                        style={{
                          background: 'linear-gradient(45deg, #ff7b54, #42a5f5)'
                        }}
                      />
                      <p className="text-white/80 text-base leading-relaxed">
                        {point}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <section
      ref={containerRef}
      id="experience"
      className="relative bg-black text-white w-full overflow-hidden min-h-screen"
      style={{ fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
    >
      <ExperienceAnimatedBackground className="z-0" />
      <div 
        className="relative z-10 min-h-screen flex flex-col py-20"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Header */}
        <div className="pb-10 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center px-6"
          >
            <div className="text-4xl md:text-5xl font-bold mb-6">
              <div className="flex flex-wrap justify-center items-baseline gap-3 md:gap-4">
                <TextGenerateEffect words="My" className="text-white" filter={true} duration={0.8} />
                <motion.span
                  className="inline-block font-bold"
                  style={{
                    background: 'linear-gradient(90deg, #ff7b54, #ffb347, #ffd700, #4fc3f7, #42a5f5)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundSize: '200% 200%'
                  }}
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Experience
                </motion.span>
              </div>
            </div>
            <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl">
              My professional journey in software development
            </p>
          </motion.div>
        </div>

        {/* Experience Display with Navigation */}
        <div className="flex-1 flex items-center justify-center relative px-4 md:px-8">
          {/* Left Arrow */}
          <motion.button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className={`absolute left-0 md:left-4 z-20 p-3 rounded-full border transition-all duration-300 ${
              currentIndex === 0
                ? 'opacity-30 cursor-not-allowed border-white/20 bg-white/5'
                : 'opacity-100 hover:bg-white/10 border-white/30 bg-white/10 cursor-pointer'
            }`}
            whileHover={currentIndex > 0 ? { scale: 1.1 } : {}}
            whileTap={currentIndex > 0 ? { scale: 0.9 } : {}}
            aria-label="Previous experience"
          >
            <FiChevronLeft className="w-6 h-6 text-white" />
          </motion.button>

          {/* Experience Card */}
          <div className="w-full max-w-5xl mx-auto">
            <ExperienceCard
              exp={experiences[currentIndex]}
              isActive={true}
              direction={direction}
            />
          </div>

          {/* Right Arrow */}
          <motion.button
            onClick={goToNext}
            disabled={currentIndex === experiences.length - 1}
            className={`absolute right-0 md:right-4 z-20 p-3 rounded-full border transition-all duration-300 ${
              currentIndex === experiences.length - 1
                ? 'opacity-30 cursor-not-allowed border-white/20 bg-white/5'
                : 'opacity-100 hover:bg-white/10 border-white/30 bg-white/10 cursor-pointer'
            }`}
            whileHover={currentIndex < experiences.length - 1 ? { scale: 1.1 } : {}}
            whileTap={currentIndex < experiences.length - 1 ? { scale: 0.9 } : {}}
            aria-label="Next experience"
          >
            <FiChevronRight className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Navigation Dots */}
        <div className="flex-shrink-0 pb-8 pt-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex justify-center items-center gap-4"
          >
            <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
              <span className="text-white/60 text-sm">
                {currentIndex + 1} of {experiences.length}
              </span>
            </div>
            <div className="flex gap-2">
              {experiences.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 'next' : 'prev');
                    setCurrentIndex(index);
                  }}
                  className="w-2 h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    background: index === currentIndex ? '#ffffff' : 'rgba(255,255,255,0.3)'
                  }}
                  animate={{
                    scale: index === currentIndex ? 1.3 : 1
                  }}
                  whileHover={{ scale: 1.2 }}
                  aria-label={`Go to experience ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
