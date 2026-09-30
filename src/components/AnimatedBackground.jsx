import React from 'react'
import { motion } from 'framer-motion'

const AnimatedBackground = ({ theme = 'default' }) => {
  const shapes = Array.from({ length: 8 })
  
  const getShapeColor = (index) => {
    const colors = {
      default: ['rgba(107, 155, 209, 0.15)', 'rgba(139, 122, 196, 0.15)', 'rgba(217, 138, 91, 0.15)'],
      innovator: ['rgba(139, 92, 246, 0.15)', 'rgba(236, 72, 153, 0.15)', 'rgba(251, 146, 60, 0.15)'],
      storyteller: ['rgba(245, 158, 11, 0.15)', 'rgba(236, 72, 153, 0.15)', 'rgba(99, 102, 241, 0.15)'],
      analyst: ['rgba(59, 130, 246, 0.15)', 'rgba(6, 182, 212, 0.15)', 'rgba(99, 102, 241, 0.15)'],
      learner: ['rgba(16, 185, 129, 0.15)', 'rgba(59, 130, 246, 0.15)', 'rgba(236, 72, 153, 0.15)'],
    }
    
    const themeColors = colors[theme] || colors.default
    return themeColors[index % themeColors.length]
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((_, i) => {
        const size = 60 + Math.random() * 120
        const startX = Math.random() * 100
        const startY = Math.random() * 100
        const duration = 15 + Math.random() * 20
        const delay = i * 2
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              background: getShapeColor(i),
              filter: 'blur(40px)',
            }}
            initial={{
              left: `${startX}%`,
              top: `${startY}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, Math.random() * -100 + 50, 0],
              y: [0, Math.random() * 100 - 50, Math.random() * -100 + 50, 0],
              scale: [1, 1.2, 0.8, 1],
              opacity: [0.3, 0.5, 0.2, 0.3],
            }}
            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        )
      })}
    </div>
  )
}

export default AnimatedBackground
