import React, { useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import AnimatedBackground from './AnimatedBackground'

const ArchetypeCardGrid = () => {
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

  const attributes = [
    { label: 'Explorer', active: false, color: 'bg-white' },
    { label: 'Specialist', active: true, color: 'bg-orange-300' },
    { label: 'Learner', active: false, color: 'bg-white' },
    { label: 'Doer', active: false, color: 'bg-white' },
    { label: 'Planner', active: true, color: 'bg-pink-300' },
    { label: 'Practical', active: true, color: 'bg-sky-200' },
    { label: 'Conceptual', active: false, color: 'bg-white' },
  ]

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
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: isHovered 
              ? '0 32px 64px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.95) inset'
              : '0 16px 40px -8px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.9) inset',
          }}
        >
          {/* Inner highlight edge */}
          <div 
            className="absolute inset-0 rounded-[32px] pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, transparent 50%)',
            }}
          />
          
          {/* Subtle grain overlay on card */}
          <div 
            className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
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
          <div className="relative z-10 h-full flex flex-col p-8 depth-mid">
            {/* Animated background */}
            <AnimatedBackground theme="default" />
            
            {/* Header */}
            <motion.div 
              className="flex justify-between items-start mb-10 depth-front"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-xl font-semibold" style={{ color: 'rgba(20, 20, 30, 0.92)' }}>
                The Engineer
              </h2>
              <span className="text-lg font-medium" style={{ color: 'rgba(30, 30, 40, 0.7)' }}>
                2025
              </span>
            </motion.div>

            {/* Attribute Grid - custom layout matching the image */}
            <motion.div 
              className="flex-1 mb-10 depth-mid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="space-y-3">
                {/* First row - 2 items */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className={`${attributes[0].color} rounded-2xl px-5 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[0].active 
                        ? '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[0].active
                        ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-medium"
                      style={{ color: 'rgba(20, 20, 30, 0.85)' }}
                    >
                      {attributes[0].label}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className={`${attributes[1].color} rounded-2xl px-5 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[1].active 
                        ? '0 4px 12px rgba(255, 140, 80, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[1].active
                        ? '0 8px 24px rgba(255, 140, 80, 0.35), 0 0 0 2px rgba(255, 140, 80, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-semibold"
                      style={{ color: 'rgba(20, 20, 30, 0.9)' }}
                    >
                      {attributes[1].label}
                    </span>
                  </motion.div>
                </div>

                {/* Second row - 3 items */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div
                    className={`${attributes[2].color} rounded-2xl px-4 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[2].active 
                        ? '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[2].active
                        ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-medium"
                      style={{ color: 'rgba(20, 20, 30, 0.85)' }}
                    >
                      {attributes[2].label}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className={`${attributes[3].color} rounded-2xl px-4 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[3].active 
                        ? '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[3].active
                        ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-medium"
                      style={{ color: 'rgba(20, 20, 30, 0.85)' }}
                    >
                      {attributes[3].label}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className={`${attributes[4].color} rounded-2xl px-4 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[4].active 
                        ? '0 4px 12px rgba(255, 120, 180, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[4].active
                        ? '0 8px 24px rgba(255, 120, 180, 0.35), 0 0 0 2px rgba(255, 120, 180, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-semibold"
                      style={{ color: 'rgba(20, 20, 30, 0.9)' }}
                    >
                      {attributes[4].label}
                    </span>
                  </motion.div>
                </div>

                {/* Third row - 2 items */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    className={`${attributes[5].color} rounded-2xl px-5 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[5].active 
                        ? '0 4px 12px rgba(120, 180, 255, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[5].active
                        ? '0 8px 24px rgba(120, 180, 255, 0.35), 0 0 0 2px rgba(120, 180, 255, 0.2), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-semibold"
                      style={{ color: 'rgba(20, 20, 30, 0.9)' }}
                    >
                      {attributes[5].label}
                    </span>
                  </motion.div>
                  
                  <motion.div
                    className={`${attributes[6].color} rounded-2xl px-5 py-5 text-center cursor-pointer`}
                    style={{
                      boxShadow: attributes[6].active 
                        ? '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                        : 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -4,
                      boxShadow: attributes[6].active
                        ? '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.6)'
                        : '0 6px 20px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                    }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    <span 
                      className="text-base font-medium"
                      style={{ color: 'rgba(20, 20, 30, 0.85)' }}
                    >
                      {attributes[6].label}
                    </span>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div 
              className="text-left depth-front"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <p 
                className="text-[15px] leading-relaxed"
                style={{ color: 'rgba(30, 30, 40, 0.72)' }}
              >
                Designs reliable, actionable systems. Uses ChatGPT to plan workflows, processes, and step-by-step solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ArchetypeCardGrid
