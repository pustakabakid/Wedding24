import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

export function useScrollAnimation(isActive: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (!isActive) return;

    // 1. Initialize Lenis Smooth Scrolling Engine
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false
    });
    lenisRef.current = lenis;

    // Connect Lenis to GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const tickerCb = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCb);
    gsap.ticker.lagSmoothing(0);

    // 2. Setup GSAP ScrollTrigger Animations
    const ctx = gsap.context(() => {
      // Parallax for botanical corner ornaments
      gsap.to('.fixed-corner-tl', {
        yPercent: -15,
        rotation: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });

      gsap.to('.fixed-corner-br', {
        yPercent: 15,
        rotation: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.2
        }
      });

      // Layered Card Reveal & Stacking Effect for each section
      const cards = gsap.utils.toArray<HTMLElement>('.invitation-container .card-transparant');
      cards.forEach((card, index) => {
        // Entrance animation
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
            scale: 0.96
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              end: 'top 40%',
              toggleActions: 'play none none none'
            }
          }
        );

        // Staggered reveal for children elements
        const headings = card.querySelectorAll('h2, .font-title, .countdown-col, .event-card, .timeline-item');
        if (headings.length > 0) {
          gsap.fromTo(
            headings,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none none'
              }
            }
          );
        }
      });

      // 3. Image Parallax (GreenSock PoOpobM pattern)
      const parallaxWrappers = gsap.utils.toArray<HTMLElement>('.parallax-img-wrapper');
      parallaxWrappers.forEach((wrapper) => {
        const img = wrapper.querySelector<HTMLElement>('.parallax-img');
        if (img) {
          gsap.fromTo(
            img,
            {
              yPercent: -12,
              scale: 1.15
            },
            {
              yPercent: 12,
              scale: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2
              }
            }
          );
        }
      });
    });

    // Refresh ScrollTrigger after DOM settlements
    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 400);

    return () => {
      clearTimeout(refreshTimer);
      gsap.ticker.remove(tickerCb);
      lenis.destroy();
      ctx.revert();
      lenisRef.current = null;
    };
  }, [isActive]);

  const scrollTo = (target: string | HTMLElement, options?: { offset?: number; duration?: number }) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    } else {
      const el = typeof target === 'string' ? document.querySelector(target) : target;
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return { lenis: lenisRef.current, scrollTo };
}
