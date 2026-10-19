import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Custom magnetic cursor with responsive touch guard and reduced-motion fallback.
 */
export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isViewMode, setIsViewMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReduced) return;
    
    // Check for touch / pointer coarse devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const dot = cursorDotRef.current;
    const follower = cursorFollowerRef.current;
    if (!dot || !follower) return;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };

    // GSAP quickSetters for 60fps performance
    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setFollowerX = gsap.quickSetter(follower, 'x', 'px');
    const setFollowerY = gsap.quickSetter(follower, 'y', 'px');

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      setDotX(mouse.x);
      setDotY(mouse.y);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    // Smooth follower ticker
    const ticker = () => {
      const dt = 1.0 - Math.pow(1.0 - 0.22, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      setFollowerX(pos.x);
      setFollowerY(pos.y);
    };

    gsap.ticker.add(ticker);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // Interactive element hover listeners
    const handleMouseOver = (e) => {
      const target = e.target.closest('a, button, [data-cursor], .interactive-card');
      if (target) {
        setIsHovered(true);
        const customMode = target.getAttribute('data-cursor');
        if (customMode === 'view') {
          setIsViewMode(true);
          setCursorText('VIEW');
        } else {
          setIsViewMode(false);
          setCursorText('');
        }
      } else {
        setIsHovered(false);
        setIsViewMode(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      gsap.ticker.remove(ticker);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [prefersReduced, isVisible]);

  if (prefersReduced) return null;

  return (
    <>
      <div
        ref={cursorDotRef}
        className={`custom-cursor ${isHovered ? 'hovering' : ''} ${isViewMode ? 'view-mode' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorFollowerRef}
        className={`custom-cursor-follower ${isHovered ? 'hovering' : ''} ${isViewMode ? 'view-mode' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {isViewMode && cursorText}
      </div>
    </>
  );
}
