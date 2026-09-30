import React from 'react'
import { motion } from 'framer-motion'

const FloatingParticle = ({ index, delay }) => {
  const randomX = Math.random() * 100 - 50
  const randomY = Math.random() * 100 - 50
  const randomDuration = 3 + Math.random() * 4
  const randomDelay = delay + Math.random() * 2
  const randomScale = 0.3 + Math.random() * 0.7

  return (
    <motion.div
      className="absolute pointer-events-none"
      initial={{
        x: randomX,
        y: randomY,
        opacity: 0,
        scale: 0,
      }}
      animate={{
        y: [randomY, randomY - 60, randomY - 120],
        x: [randomX, randomX + 20, randomX - 10],
        opacity: [0, 0.8, 0],
        scale: [0, randomScale, 0],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay: randomDelay,
        ease: "easeInOut",
      }}
      style={{
        left: '50%',
        top: '50%',
      }}
    >
      <svg width="12" height="12" viewBox="0 0 12 12">
        <defs>
          <radialGradient id={`sparkle-${index}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ffd700" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff6ec7" stopOpacity="0.3" />
          </radialGradient>
        </defs>
        <circle cx="6" cy="6" r="3" fill={`url(#sparkle-${index})`} />
        <path
          d="M6 0 L6.5 4 L6 8 L5.5 4 Z M0 6 L4 5.5 L8 6 L4 6.5 Z"
          fill="white"
          opacity="0.8"
        />
      </svg>
    </motion.div>
  )
}

export default FloatingParticle
