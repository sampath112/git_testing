import React, { useState } from 'react'
import ArchetypeCard from './components/ArchetypeCard'
import ArchetypeCardGrid from './components/ArchetypeCardGrid'
import { motion, AnimatePresence } from 'framer-motion'

function App() {
  const [variant, setVariant] = useState('illustration') // 'illustration' or 'grid'

  const handleCardClick = () => {
    setVariant(variant === 'illustration' ? 'grid' : 'illustration')
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-8 overflow-hidden">{/* Multi-layer gradient background */}
      {/* Multi-layer gradient background */}
      <div className="fixed inset-0 -z-10 transition-all duration-1000 ease-in-out">
        {/* Base gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 20% 30%, rgba(255, 218, 195, 0.6) 0%, transparent 55%), radial-gradient(circle at 80% 70%, rgba(255, 182, 193, 0.5) 0%, transparent 55%), radial-gradient(circle at 50% 50%, rgba(230, 230, 250, 0.5) 0%, transparent 75%), linear-gradient(135deg, #FFE9DC 0%, #FFDCEC 25%, #FFD4E5 35%, #EFE0F7 60%, #E6D5F5 75%, #DCE9FF 90%, #D4E4FF 100%)'
          }}
        />
        
        {/* Radial light blooms */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 40%), radial-gradient(ellipse at 70% 80%, rgba(255, 240, 245, 0.25) 0%, transparent 45%)'
          }}
        />
        
        {/* Color noise blending */}
        <div 
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            mixBlendMode: 'overlay'
          }}
        />
        
        {/* Grain overlay */}
        <div 
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="flex flex-col items-center gap-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={variant}
            onClick={handleCardClick}
            initial={{ 
              opacity: 0,
              rotateY: variant === 'illustration' ? -90 : 90,
              scale: 0.8,
            }}
            animate={{ 
              opacity: 1,
              rotateY: 0,
              scale: 1,
            }}
            exit={{ 
              opacity: 0,
              rotateY: variant === 'illustration' ? 90 : -90,
              scale: 0.8,
            }}
            transition={{
              duration: 0.6,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {variant === 'illustration' ? <ArchetypeCard /> : <ArchetypeCardGrid />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App
