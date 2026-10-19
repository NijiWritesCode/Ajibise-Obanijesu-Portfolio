import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.to(el, {
          scaleX: self.progress,
          duration: 0.1,
          ease: 'none',
          overwrite: 'auto'
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return <div ref={barRef} className="scroll-progress-bar" aria-hidden="true" />;
}
