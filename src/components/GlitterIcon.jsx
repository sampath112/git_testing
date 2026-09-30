import React from 'react'

const GlitterIcon = ({ index, type = 'gear' }) => {
  const delay = (index * 0.3) % 6
  const opacity = 0.35 + Math.random() * 0.2
  const scale = 0.8 + Math.random() * 0.4
  const blur = Math.random() * 0.5

  // More detailed, premium SVG icon paths
  const iconPaths = {
    gear: (
      <g>
        <path d="M12 2l1.5 4.5h4.8l-3.9 2.8 1.5 4.6L12 11.1l-3.9 2.8 1.5-4.6-3.9-2.8h4.8z" fillOpacity="0.9"/>
        <circle cx="12" cy="12" r="3.5" fillOpacity="0.95"/>
        <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.6)"/>
      </g>
    ),
    sparkle: (
      <g>
        <path d="M12 2l2.5 7h7.5l-6 4.5 2.5 7.5L12 16.5 5.5 21 8 13.5 2 9h7.5z" fillOpacity="0.9"/>
        <circle cx="12" cy="12" r="2.5" fill="rgba(255,255,255,0.7)"/>
      </g>
    ),
    star: (
      <g>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" fillOpacity="0.9"/>
        <path d="M12 6l2 4 4.5 0.65-3.25 3.17 0.77 4.48L12 16l-4.02 2.11 0.77-4.48L5.5 10.65l4.5-0.65z" fill="rgba(255,255,255,0.5)"/>
      </g>
    ),
    circle: (
      <g>
        <circle cx="12" cy="12" r="9" fillOpacity="0.85" strokeWidth="1.5" stroke="rgba(255,255,255,0.4)"/>
        <circle cx="12" cy="12" r="6" fillOpacity="0.6"/>
        <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.6)"/>
      </g>
    ),
    swirl: (
      <g>
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" fillOpacity="0.85"/>
        <path d="M12 6a6 6 0 0 0-6 6h2a4 4 0 0 1 4-4z" fillOpacity="0.9">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 12 12"
            to="360 12 12"
            dur="8s"
            repeatCount="indefinite"
          />
        </path>
        <circle cx="12" cy="12" r="2" fill="rgba(255,255,255,0.7)"/>
      </g>
    ),
    heart: (
      <g>
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fillOpacity="0.85"/>
        <path d="M12 18.5l-1.1-1C7.14 14.07 5 12.05 5 9.5 5 7.57 6.57 6 8.5 6c1.04 0 2.04.52 2.7 1.3l.8.9.8-.9C13.46 6.52 14.46 6 15.5 6 17.43 6 19 7.57 19 9.5c0 2.55-2.14 4.57-6.9 8.01L12 18.5z" fill="rgba(255,255,255,0.5)"/>
      </g>
    ),
    diamond: (
      <g>
        <path d="M12 2l4 6h6l-8 14-8-14h6z" fillOpacity="0.9"/>
        <path d="M12 6l2.5 4h4l-5 9-5-9h4z" fill="rgba(255,255,255,0.4)"/>
        <path d="M12 10l1.5 2.5h2l-3 5-3-5h2z" fill="rgba(255,255,255,0.6)"/>
      </g>
    ),
    flower: (
      <g>
        <circle cx="12" cy="8" r="3" fillOpacity="0.8"/>
        <circle cx="16" cy="12" r="3" fillOpacity="0.8"/>
        <circle cx="12" cy="16" r="3" fillOpacity="0.8"/>
        <circle cx="8" cy="12" r="3" fillOpacity="0.8"/>
        <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.7)"/>
        <circle cx="12" cy="12" r="1.5" fillOpacity="0.95"/>
      </g>
    )
  }

  const gradientId = `iconGradient-${index}`

  return (
    <div
      className="glitter-icon transform-gpu"
      style={{
        animationDelay: `${delay}s`,
        opacity,
        transform: `scale(${scale})`,
        filter: `blur(${blur}px) drop-shadow(0 2px 6px rgba(0,0,0,0.15))`,
      }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full" style={{ filter: 'url(#iconGlow)' }}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.95} />
            <stop offset="25%" stopColor="#2dd4bf" stopOpacity={0.9} />
            <stop offset="50%" stopColor="#34d399" stopOpacity={0.85} />
            <stop offset="75%" stopColor="#a78bfa" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#c084fc" stopOpacity={0.95} />
          </linearGradient>
          <filter id="iconGlow">
            <feGaussianBlur stdDeviation="0.8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <radialGradient id={`innerGlow-${index}`} cx="40%" cy="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)"/>
            <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
          </radialGradient>
        </defs>
        <g fill={`url(#${gradientId})`} strokeWidth="0.5" stroke="rgba(255,255,255,0.5)">
          {iconPaths[type]}
        </g>
        <circle cx="12" cy="12" r="10" fill={`url(#innerGlow-${index})`} opacity="0.3" pointerEvents="none"/>
      </svg>
      <div className="shimmer-overlay" />
    </div>
  )
}

export default GlitterIcon
