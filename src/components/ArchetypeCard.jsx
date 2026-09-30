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
              <div className="absolute left-1/2 top-[80px] -translate-x-1/2 w-[260px] h-[260px]">
                {/* Floating particles around bear */}
                <div className="absolute inset-0 -m-12">
                  {Array.from({ length: 12 }).map((_, i) => (
                    <FloatingParticle key={i} index={i} delay={i * 0.4} />
                  ))}
                </div>
                
                {/* Animated Bear SVG Illustration */}
                <motion.div 
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.3,
                    type: "spring",
                    stiffness: 100
                  }}
                >
                  <svg width="220" height="220" viewBox="0 0 220 220" fill="none" className="drop-shadow-2xl">
                    <defs>
                      {/* Gradients */}
                      <linearGradient id="bearBody" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFF5F0" />
                        <stop offset="50%" stopColor="#FFE8E0" />
                        <stop offset="100%" stopColor="#FFE0D8" />
                      </linearGradient>
                      <radialGradient id="bearGlow" cx="50%" cy="40%">
                        <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                        <stop offset="70%" stopColor="#FFE8E0" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#FFE8E0" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id="earPink" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#FFD4E5" />
                        <stop offset="100%" stopColor="#FFC0D9" />
                      </linearGradient>
                      {/* Shadow filter */}
                      <filter id="softShadow">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4"/>
                        <feOffset dx="0" dy="6" result="offsetblur"/>
                        <feComponentTransfer>
                          <feFuncA type="linear" slope="0.3"/>
                        </feComponentTransfer>
                        <feMerge>
                          <feMergeNode/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>

                    {/* Main bear body */}
                    <g filter="url(#softShadow)">
                      {/* Head */}
                      <ellipse cx="110" cy="110" rx="55" ry="50" fill="url(#bearBody)"/>
                      <ellipse cx="110" cy="110" rx="55" ry="50" fill="url(#bearGlow)"/>
                      
                      {/* Left ear with animation */}
                      <motion.g
                        animate={{
                          rotate: [0, -8, 8, -5, 0],
                          y: [0, -2, 2, -1, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        style={{ originX: '75px', originY: '70px' }}
                      >
                        <ellipse cx="75" cy="70" rx="22" ry="28" fill="url(#bearBody)"/>
                        <ellipse cx="75" cy="75" rx="14" ry="18" fill="url(#earPink)" opacity="0.6"/>
                      </motion.g>
                      
                      {/* Right ear with animation */}
                      <motion.g
                        animate={{
                          rotate: [0, 8, -8, 5, 0],
                          y: [0, -2, 2, -1, 0]
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.2
                        }}
                        style={{ originX: '145px', originY: '70px' }}
                      >
                        <ellipse cx="145" cy="70" rx="22" ry="28" fill="url(#bearBody)"/>
                        <ellipse cx="145" cy="75" rx="14" ry="18" fill="url(#earPink)" opacity="0.6"/>
                      </motion.g>

                      {/* Face details */}
                      {/* Snout */}
                      <ellipse cx="110" cy="120" rx="32" ry="24" fill="#FFFFFF" opacity="0.9"/>
                      <ellipse cx="110" cy="118" rx="26" ry="20" fill="#FFF8F5"/>
                      
                      {/* Nose with animation */}
                      <motion.ellipse
                        cx="110"
                        cy="118"
                        rx="9"
                        ry="7"
                        fill="#2D2D2D"
                        animate={{
                          scale: [1, 1.1, 1],
                          ry: [7, 6.5, 7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <ellipse cx="107" cy="116" rx="3" ry="2.5" fill="rgba(255,255,255,0.7)"/>

                      {/* Eyes with blink animation */}
                      <motion.g
                        animate={{
                          scaleY: [1, 0.1, 1, 1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          times: [0, 0.1, 0.2, 0.9, 1],
                          ease: "easeInOut"
                        }}
                        style={{ originY: '98px' }}
                      >
                        {/* Left eye */}
                        <ellipse cx="90" cy="98" rx="6" ry="8" fill="#2D2D2D"/>
                        <ellipse cx="92" cy="96" rx="3" ry="3" fill="rgba(255,255,255,0.9)"/>
                        <ellipse cx="89" cy="100" rx="1.5" ry="2" fill="rgba(255,255,255,0.5)"/>
                        
                        {/* Right eye */}
                        <ellipse cx="130" cy="98" rx="6" ry="8" fill="#2D2D2D"/>
                        <ellipse cx="132" cy="96" rx="3" ry="3" fill="rgba(255,255,255,0.9)"/>
                        <ellipse cx="129" cy="100" rx="1.5" ry="2" fill="rgba(255,255,255,0.5)"/>
                      </motion.g>

                      {/* Blush */}
                      <ellipse cx="70" cy="110" rx="10" ry="7" fill="#FFB4D5" opacity="0.5"/>
                      <ellipse cx="150" cy="110" rx="10" ry="7" fill="#FFB4D5" opacity="0.5"/>

                      {/* Mouth with smile animation */}
                      <motion.path
                        d="M 95 128 Q 110 135 125 128"
                        stroke="#2D2D2D"
                        strokeWidth="2.5"
                        fill="none"
                        strokeLinecap="round"
                        animate={{
                          d: [
                            "M 95 128 Q 110 135 125 128",
                            "M 95 128 Q 110 137 125 128",
                            "M 95 128 Q 110 135 125 128"
                          ]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />

                      {/* Body/shoulders */}
                      <ellipse cx="110" cy="170" rx="65" ry="42" fill="url(#bearBody)"/>
                      <ellipse cx="110" cy="162" rx="55" ry="28" fill="url(#bearGlow)"/>
                      
                      {/* Arms */}
                      <motion.ellipse
                        cx="55"
                        cy="155"
                        rx="18"
                        ry="30"
                        fill="url(#bearBody)"
                        transform="rotate(-20 55 155)"
                        animate={{
                          rotate: [-25, -15, -25],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <motion.ellipse
                        cx="165"
                        cy="155"
                        rx="18"
                        ry="30"
                        fill="url(#bearBody)"
                        transform="rotate(20 165 155)"
                        animate={{
                          rotate: [15, 25, 15],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.3
                        }}
                      />

                      {/* Paws */}
                      <ellipse cx="55" cy="180" rx="14" ry="12" fill="#FFFFFF" opacity="0.9"/>
                      <ellipse cx="165" cy="180" rx="14" ry="12" fill="#FFFFFF" opacity="0.9"/>
                      
                      {/* Paw pads */}
                      <circle cx="52" cy="182" r="3" fill="#FFD4E5" opacity="0.7"/>
                      <circle cx="58" cy="182" r="3" fill="#FFD4E5" opacity="0.7"/>
                      <circle cx="162" cy="182" r="3" fill="#FFD4E5" opacity="0.7"/>
                      <circle cx="168" cy="182" r="3" fill="#FFD4E5" opacity="0.7"/>

                      {/* Belly spot */}
                      <ellipse cx="110" cy="165" rx="35" ry="25" fill="rgba(255,255,255,0.4)"/>
                    </g>

                    {/* Floating hearts animation */}
                    <motion.g
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      <path
                        d="M 40 100 C 40 95, 44 91, 48 91 C 50 91, 52 92, 53 94 C 54 92, 56 91, 58 91 C 62 91, 66 95, 66 100 C 66 106, 53 115, 53 115 C 53 115, 40 106, 40 100 Z"
                        fill="#FFB4D5"
                        opacity="0.6"
                      />
                    </motion.g>
                    <motion.g
                      animate={{
                        y: [0, -12, 0],
                        opacity: [0.5, 0.9, 0.5],
                      }}
                      transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                      }}
                    >
                      <path
                        d="M 170 110 C 170 106, 173 103, 176 103 C 178 103, 179 104, 180 106 C 181 104, 182 103, 184 103 C 187 103, 190 106, 190 110 C 190 115, 180 122, 180 122 C 180 122, 170 115, 170 110 Z"
                        fill="#FFB4D5"
                        opacity="0.5"
                      />
                    </motion.g>
                  </svg>
                </motion.div>
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
