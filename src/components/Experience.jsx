// FIXED Experience.jsx
import { motion, AnimatePresence } from "framer-motion";
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
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [isDragging, setIsDragging] = useState(false);


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
    setCurrentIndex((prev) => (prev + 1) % experiences.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + experiences.length) % experiences.length);
  };

  // Swipe handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setIsDragging(false);
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const ExperienceCard = ({ exp, isActive }) => (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
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
      className="relative bg-black text-white w-full overflow-hidden py-20"
      style={{ fontFamily: "'SF Pro Display', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <ExperienceAnimatedBackground className="z-0" />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-16"
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

        {/* Experience Display with Navigation */}
        <div className="relative">
          {/* Navigation Arrows */}
          <motion.button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous experience"
          >
            <FiChevronLeft className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-white/90 transition-colors" />
          </motion.button>

          <motion.button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-300 group"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next experience"
          >
            <FiChevronRight className="w-6 h-6 md:w-7 md:h-7 text-white group-hover:text-white/90 transition-colors" />
          </motion.button>

          {/* Experience Card Container */}
          <div className="px-16 md:px-20">
            <ExperienceCard
              exp={experiences[currentIndex]}
              isActive={true}
            />
          </div>
        </div>

        {/* Navigation Dots and Swipe Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
          {/* Dots Indicator */}
          <div className="flex gap-3 items-center">
            {experiences.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className="relative"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Go to experience ${index + 1}`}
              >
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-white scale-125'
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-white"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Swipe Hint */}
          <div className="flex items-center gap-2 text-white/50 text-sm">
            <span className="hidden md:inline">Swipe left/right or use arrows to navigate</span>
            <span className="md:hidden">Swipe to navigate</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="flex gap-1"
            >
              <span>←</span>
              <span>→</span>
            </motion.div>
          </div>

          {/* Experience Counter */}
          <div className="text-white/40 text-xs mt-2">
            {currentIndex + 1} / {experiences.length}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
