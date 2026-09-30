import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import GlitterIcon from './GlitterIcon'
import FloatingParticle from './FloatingParticle'
import AnimatedBackground from './AnimatedBackground'

const ArchetypeCard = () => {
  const [isHovered, setIsHovered] = useState(false)
  const cardRef = useRef(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  // Motion values for smooth spring physics
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  // Spring smoothing for natural movement
  const springX = useSpring(rotateX, { stiffness: 120, damping: 18 })
  const springY = useSpring(rotateY, { stiffness: 120, damping: 18 })

  // Check if touch device
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  const handleMouseMove = (e) => {
    if (isTouch) return
    
    const card = cardRef.current
    if (!card) return
    
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setCursorPos({ x, y })

    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateX.set(((y - centerY) / centerY) * -10)
    rotateY.set(((x - centerX) / centerX) * 10)
  }

  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    if (!isTouch) {
      setIsHovered(true)
    }
  }

  return (
    <div className="perspective-1200">
      <motion.div 
        ref={cardRef}
        className={`relative w-[420px] h-[680px] rounded-[32px] cursor-pointer preserve-3d transform-gpu will-change-transform ${isTouch ? 'card-mobile' : ''}`}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: springX,
          rotateY: springY,
        }}
        initial={{
          opacity: 0,
          y: 40,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        transition={{
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseMove={!isTouch ? handleMouseMove : undefined}
        onMouseEnter={!isTouch ? handleMouseEnter : undefined}
        onMouseLeave={!isTouch ? handleMouseLeave : undefined}
      >
        {/* Glass card with backdrop blur */}
        <div 
          className="relative w-full h-full rounded-[32px] overflow-hidden"
          style={{
            background: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(32px) saturate(180%)',
            WebkitBackdropFilter: 'blur(32px) saturate(180%)',
            boxShadow: isHovered 
              ? '0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.98) inset, 0 2px 4px rgba(255, 255, 255, 0.5) inset'
              : '0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 15px 30px -15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.95) inset, 0 1px 2px rgba(255, 255, 255, 0.4) inset',
          }}
        >
          {/* Inner highlight edge */}
          <div 
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.3) 25%, transparent 50%), radial-gradient(ellipse at top left, rgba(255, 255, 255, 0.4) 0%, transparent 50%)',
            }}
          />
          
          {/* Subtle grain overlay on card */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='3.2' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Cursor-based light reflection */}
          {isHovered && (
            <div
              className="absolute inset-0 pointer-events-none rounded-[32px] opacity-0 transition-opacity duration-300"
              style={{
                opacity: isHovered ? 1 : 0,
                background: `radial-gradient(
                  600px circle at ${cursorPos.x}px ${cursorPos.y}px,
                  rgba(255, 255, 255, 0.12),
                  transparent 60%
                )`
              }}
            />
          )}

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col depth-mid">
            {/* Header with gradient background */}
            <div 
              className="relative px-8 pt-6 pb-[340px] rounded-t-[32px] overflow-hidden depth-bg"
              style={{
                background: 'linear-gradient(135deg, #6B9BD1 0%, #7E8BC9 15%, #8B7AC4 25%, #B67FB0 37%, #D98A5B 50%, #E3847A 62%, #E67E9C 75%, #AA82B4 87%, #9B88C4 100%)',
              }}
            >
              {/* Animated background shapes */}
              <AnimatedBackground theme="default" />
              
              {/* Gradient overlay for depth */}
              <div 
                className="absolute inset-0"
                style={{
                  background: 'radial-gradient(ellipse 800px 600px at 30% 20%, rgba(255, 255, 255, 0.22) 0%, transparent 50%), radial-gradient(ellipse 600px 800px at 70% 80%, rgba(0, 0, 0, 0.12) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
                }}
              />

              {/* Glittering constellation icons */}
              <div className="absolute inset-0 grid grid-cols-5 grid-rows-6 gap-4 p-6 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => {
                  const iconTypes = ['gear', 'sparkle', 'star', 'circle', 'swirl', 'heart', 'diamond', 'flower']
                  const randomType = iconTypes[i % iconTypes.length]
                  return <GlitterIcon key={i} index={i} type={randomType} />
                })}
              </div>
              
              {/* Header text */}
              <motion.div 
                className="relative z-10 flex justify-between items-start mb-4"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-white/95 text-base font-medium">Your Archetype</h3>
                <span className="text-white/95 text-base font-medium">2025</span>
              </motion.div>

              {/* 3D Bear Illustration Area - centered */}
              <div className="absolute left-1/2 top-[70px] -translate-x-1/2 animate-float depth-front">
                {/* Floating particles around bear */}
                <div className="absolute inset-0 -m-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <FloatingParticle key={i} index={i} delay={i * 0.4} />
                  ))}
                </div>
                
                {/* Premium SVG Bear Illustration */}
                <div className="relative w-[280px] h-[280px]">
                  {/* Cloud SVG - top left */}
                  <svg className="absolute top-2 left-0 w-20 h-16" viewBox="0 0 80 64" fill="none">
                    <defs>
                      <filter id="cloudGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="2" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.4"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98"/>
                        <stop offset="50%" stopColor="#f5f5ff" stopOpacity="0.96"/>
                        <stop offset="100%" stopColor="#f0f0ff" stopOpacity="0.94"/>
                      </linearGradient>
                    </defs>
                    <ellipse cx="30" cy="32" rx="18" ry="16" fill="url(#cloudGrad)" filter="url(#cloudGlow)"/>
                    <ellipse cx="48" cy="28" rx="20" ry="18" fill="url(#cloudGrad)" filter="url(#cloudGlow)"/>
                    <ellipse cx="58" cy="34" rx="16" ry="14" fill="url(#cloudGrad)" filter="url(#cloudGlow)"/>
                    <path d="M20 32 Q22 40 30 42 L58 42 Q65 40 66 32" fill="url(#cloudGrad)" filter="url(#cloudGlow)"/>
                  </svg>

                  {/* Gear SVG - left side */}
                  <svg className="absolute left-[-10px] top-[100px] w-20 h-20" viewBox="0 0 80 80" fill="none">
                    <defs>
                      <filter id="gearShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="0" dy="4" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="gearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff5f0" stopOpacity="0.95"/>
                        <stop offset="50%" stopColor="#ffe8e0" stopOpacity="0.92"/>
                        <stop offset="100%" stopColor="#ffd8cc" stopOpacity="0.90"/>
                      </linearGradient>
                      <radialGradient id="gearInner" cx="50%" cy="50%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                        <stop offset="60%" stopColor="#ffeedd" stopOpacity="0.7"/>
                        <stop offset="100%" stopColor="#ffd5c2" stopOpacity="0.5"/>
                      </radialGradient>
                    </defs>
                    {/* Gear teeth */}
                    <path d="M40 8 L44 8 L46 18 L34 18 Z M72 40 L72 44 L62 46 L62 34 Z M40 72 L36 72 L34 62 L46 62 Z M8 40 L8 36 L18 34 L18 46 Z M58 16 L62 20 L54 28 L50 24 Z M62 60 L58 64 L50 56 L54 52 Z M22 64 L18 60 L26 52 L30 56 Z M18 20 L22 16 L30 24 L26 28 Z" fill="url(#gearGrad)" filter="url(#gearShadow)"/>
                    {/* Center circle */}
                    <circle cx="40" cy="40" r="20" fill="url(#gearInner)" filter="url(#gearShadow)"/>
                    <circle cx="40" cy="40" r="16" fill="#fff" fillOpacity="0.8"/>
                    <circle cx="40" cy="40" r="8" fill="url(#gearGrad)"/>
                    {/* Inner shadow detail */}
                    <circle cx="40" cy="40" r="20" fill="none" stroke="rgba(255,200,180,0.4)" strokeWidth="2"/>
                  </svg>

                  {/* Main Bear SVG - center */}
                  <motion.svg 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px]" 
                    viewBox="0 0 200 200" 
                    fill="none"
                  >
                    <defs>
                      <filter id="bearShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="6"/>
                        <feOffset dx="0" dy="8" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.25"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <linearGradient id="bearBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fff8eb" stopOpacity="0.99"/>
                        <stop offset="35%" stopColor="#f8ebff" stopOpacity="0.98"/>
                        <stop offset="70%" stopColor="#ebf0ff" stopOpacity="0.97"/>
                        <stop offset="100%" stopColor="#e8e8ff" stopOpacity="0.96"/>
                      </linearGradient>
                      <radialGradient id="bearHighlight" cx="40%" cy="30%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7"/>
                        <stop offset="50%" stopColor="#ffffff" stopOpacity="0.3"/>
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0"/>
                      </radialGradient>
                      <linearGradient id="earInner" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ffc8d8" stopOpacity="0.5"/>
                        <stop offset="100%" stopColor="#ffb8d8" stopOpacity="0.4"/>
                      </linearGradient>
                    </defs>
                    
                    {/* Left Ear with motion */}
                    <motion.g
                      animate={{
                        rotate: [0, -5, 5, -3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                      }}
                      style={{ originX: '40px', originY: '40px' }}
                    >
                      <ellipse cx="60" cy="50" rx="24" ry="30" fill="url(#bearBodyGrad)" filter="url(#bearShadow)"/>
                      <ellipse cx="60" cy="54" rx="16" ry="20" fill="url(#earInner)"/>
                      <ellipse cx="58" cy="48" rx="10" ry="12" fill="rgba(255,255,255,0.6)"/>
                    </motion.g>
                    
                    {/* Right Ear with motion */}
                    <motion.g
                      animate={{
                        rotate: [0, 5, -5, 3, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 2,
                        ease: "easeInOut",
                        delay: 0.2,
                      }}
                      style={{ originX: '140px', originY: '40px' }}
                    >
                      <ellipse cx="140" cy="50" rx="24" ry="30" fill="url(#bearBodyGrad)" filter="url(#bearShadow)"/>
                      <ellipse cx="140" cy="54" rx="16" ry="20" fill="url(#earInner)"/>
                      <ellipse cx="142" cy="48" rx="10" ry="12" fill="rgba(255,255,255,0.6)"/>
                    </motion.g>
                    
                    {/* Main Head */}
                    <ellipse cx="100" cy="90" rx="56" ry="52" fill="url(#bearBodyGrad)" filter="url(#bearShadow)"/>
                    <ellipse cx="100" cy="90" rx="56" ry="52" fill="url(#bearHighlight)"/>
                    
                    {/* Snout/Muzzle */}
                    <ellipse cx="100" cy="100" rx="36" ry="28" fill="rgba(255,255,255,0.95)" filter="url(#bearShadow)"/>
                    <ellipse cx="100" cy="95" rx="30" ry="22" fill="rgba(255,245,240,0.9)"/>
                    
                    {/* Nose */}
                    <ellipse cx="100" cy="96" rx="8" ry="6" fill="#4a4a4a"/>
                    <ellipse cx="98" cy="94" rx="3" ry="2" fill="rgba(255,255,255,0.8)"/>
                    
                    {/* Eyes */}
                    <g>
                      <ellipse cx="82" cy="78" rx="7" ry="9" fill="#2d2d2d"/>
                      <ellipse cx="84" cy="76" rx="3" ry="3" fill="rgba(255,255,255,0.9)"/>
                      <ellipse cx="82" cy="80" rx="2" ry="2.5" fill="rgba(255,255,255,0.5)"/>
                    </g>
                    <g>
                      <ellipse cx="118" cy="78" rx="7" ry="9" fill="#2d2d2d"/>
                      <ellipse cx="120" cy="76" rx="3" ry="3" fill="rgba(255,255,255,0.9)"/>
                      <ellipse cx="118" cy="80" rx="2" ry="2.5" fill="rgba(255,255,255,0.5)"/>
                    </g>
                    
                    {/* Cheek blush */}
                    <ellipse cx="68" cy="92" rx="12" ry="8" fill="#ffcce0" fillOpacity="0.4"/>
                    <ellipse cx="132" cy="92" rx="12" ry="8" fill="#ffcce0" fillOpacity="0.4"/>
                    
                    {/* Smile */}
                    <path d="M 90 102 Q 100 108 110 102" stroke="#4a4a4a" strokeWidth="2" fill="none" strokeLinecap="round"/>
                    
                    {/* Body - shoulders */}
                    <ellipse cx="100" cy="155" rx="68" ry="45" fill="url(#bearBodyGrad)" filter="url(#bearShadow)"/>
                    <ellipse cx="100" cy="145" rx="60" ry="30" fill="url(#bearHighlight)"/>
                    
                    {/* Arms */}
                    <ellipse cx="52" cy="140" rx="20" ry="32" fill="url(#bearBodyGrad)" filter="url(#bearShadow)" transform="rotate(-15 52 140)"/>
                    <ellipse cx="148" cy="140" rx="20" ry="32" fill="url(#bearBodyGrad)" filter="url(#bearShadow)" transform="rotate(15 148 140)"/>
                    
                    {/* Paws */}
                    <ellipse cx="52" cy="165" rx="16" ry="14" fill="rgba(255,255,255,0.9)"/>
                    <ellipse cx="148" cy="165" rx="16" ry="14" fill="rgba(255,255,255,0.9)"/>
                    
                    {/* Paw details */}
                    <g opacity="0.6">
                      <circle cx="48" cy="168" r="3" fill="#ffb8d8"/>
                      <circle cx="56" cy="168" r="3" fill="#ffb8d8"/>
                      <circle cx="52" cy="162" r="3" fill="#ffb8d8"/>
                      <circle cx="144" cy="168" r="3" fill="#ffb8d8"/>
                      <circle cx="152" cy="168" r="3" fill="#ffb8d8"/>
                      <circle cx="148" cy="162" r="3" fill="#ffb8d8"/>
                    </g>
                    
                    {/* Belly highlight */}
                    <ellipse cx="100" cy="152" rx="40" ry="28" fill="rgba(255,255,255,0.3)"/>
                  </motion.svg>

                  {/* Laptop SVG - below bear */}
                  <svg className="absolute bottom-8 left-1/2 -translate-x-1/2 w-28 h-20" viewBox="0 0 112 80" fill="none">
                    <defs>
                      <linearGradient id="laptopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f0f5ff" stopOpacity="0.95"/>
                        <stop offset="100%" stopColor="#e6f0ff" stopOpacity="0.9"/>
                      </linearGradient>
                      <filter id="laptopShadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="4"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Screen */}
                    <rect x="8" y="4" width="96" height="60" rx="6" fill="url(#laptopGrad)" filter="url(#laptopShadow)"/>
                    <rect x="14" y="10" width="84" height="48" rx="2" fill="rgba(180,200,255,0.6)"/>
                    {/* Base */}
                    <path d="M 2 64 L 4 70 Q 6 72 10 72 L 102 72 Q 106 72 108 70 L 110 64 Z" fill="url(#laptopGrad)" filter="url(#laptopShadow)"/>
                    <ellipse cx="56" cy="68" rx="4" ry="2" fill="rgba(180,200,255,0.4)"/>
                  </svg>

                  {/* UI Panel SVG - right side */}
                  <svg className="absolute right-[-5px] top-[90px] w-24 h-28" viewBox="0 0 96 112" fill="none">
                    <defs>
                      <linearGradient id="panelGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#ebf0ff" stopOpacity="0.95"/>
                        <stop offset="100%" stopColor="#e1ebff" stopOpacity="0.9"/>
                      </linearGradient>
                      <filter id="panelShadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="0" dy="4"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.35"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <rect x="8" y="8" width="80" height="96" rx="12" fill="url(#panelGrad)" filter="url(#panelShadow)"/>
                    {/* Code lines */}
                    <rect x="20" y="20" width="48" height="6" rx="3" fill="rgba(168,130,240,0.7)"/>
                    <rect x="20" y="32" width="64" height="6" rx="3" fill="rgba(130,150,240,0.7)"/>
                    <rect x="20" y="44" width="42" height="6" rx="3" fill="rgba(240,130,180,0.7)"/>
                    <rect x="20" y="56" width="56" height="6" rx="3" fill="rgba(168,130,240,0.7)"/>
                    <rect x="20" y="68" width="52" height="6" rx="3" fill="rgba(130,200,240,0.6)"/>
                  </svg>

                  {/* Sparkle SVG - bottom right */}
                  <svg className="absolute right-4 bottom-10 w-16 h-16" viewBox="0 0 64 64" fill="none">
                    <defs>
                      <linearGradient id="sparkleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#fffaf0" stopOpacity="0.95"/>
                        <stop offset="50%" stopColor="#fff5eb" stopOpacity="0.92"/>
                        <stop offset="100%" stopColor="#ffeedd" stopOpacity="0.90"/>
                      </linearGradient>
                      <filter id="sparkleShadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="3"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                      <radialGradient id="sparkleInner">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9"/>
                        <stop offset="100%" stopColor="#ffeedd" stopOpacity="0.6"/>
                      </radialGradient>
                    </defs>
                    {/* Star shape */}
                    <path d="M 32 8 L 36 24 L 52 28 L 36 32 L 32 48 L 28 32 L 12 28 L 28 24 Z" fill="url(#sparkleGrad)" filter="url(#sparkleShadow)"/>
                    <path d="M 32 16 L 34 26 L 44 28 L 34 30 L 32 40 L 30 30 L 20 28 L 30 26 Z" fill="url(#sparkleInner)"/>
                    <circle cx="32" cy="28" r="6" fill="rgba(255,255,255,0.8)"/>
                  </svg>
                </div>
              </div>
            </div>

            {/* Bottom section */}
            <div className="flex-1 px-8 pb-8 pt-6 flex flex-col depth-mid">
              {/* Icon and Title */}
              <motion.div 
                className="flex items-center gap-3 mb-3 depth-front"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <div 
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(110, 110, 130, 0.18) 0%, rgba(90, 90, 110, 0.12) 100%)',
                    boxShadow: '0 2px 8px rgba(100, 100, 120, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-gray-700/70">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M12 1v6m0 6v6m9-9h-6m-6 0H3"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold" style={{ color: 'rgba(20, 20, 30, 0.92)' }}>
                  The Engineer
                </h2>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(30, 30, 40, 0.68)' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                19.1% of users share this archetype
              </motion.p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ArchetypeCard
