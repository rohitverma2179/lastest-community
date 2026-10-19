import React from 'react';
import { ArrowRight, Eye, EyeOff, HelpCircle } from 'lucide-react';

// Star rating/reputation indicator component
export function Reputation({ points, large }) {
  return (
    <span className={`repo-token ${large ? 'large' : ''}`}>
      <span className="glyph">★</span>
      {points}
    </span>
  );
}

// Global dynamic Icon component mapping string names to Lucide icons
export function Icon({ name, size = 16, className = "" }) {
  const icons = {
    arrow: ArrowRight,
    eye: Eye,
    eyeOff: EyeOff,
  };

  const LucideIcon = icons[name] || HelpCircle;

  return <LucideIcon size={size} className={className} />;
}
