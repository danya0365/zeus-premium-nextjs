import { twMerge } from 'tailwind-merge';

interface BackgroundDecoratorsProps {
  className?: string;
  variant?: 'hero' | 'section';
}

/**
 * Reusable component for displaying the Pop-Art style background decorators
 * (Circles, organic blobs, SVG squiggles, and hashtags).
 * 
 * @param variant 'hero' generates a denser, larger cluster of shapes suitable for the main banner.
 *                'section' generates a lighter, sparser clustering suitable for other content sections.
 */
export function BackgroundDecorators({ className, variant = 'hero' }: BackgroundDecoratorsProps) {
  return (
    <div className={twMerge("absolute inset-0 z-0 overflow-hidden pointer-events-none", className)}>
      
      {/* =========================================
          VARIANT: HERO
          ========================================= */}
      {variant === 'hero' && (
        <>
          {/* Top Left Blue Organic Blob */}
          <div className="absolute -top-5 -left-5 md:-top-10 md:-left-10 w-24 h-24 md:w-80 md:h-80 bg-zeus-blue rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]" />

          {/* Top Center Orange Circle */}
          <div className="absolute top-[2%] md:top-[5%] left-[50%] -translate-x-1/2 w-32 h-32 md:w-72 md:h-72 bg-zeus-orange rounded-full" />

          {/* Top Right Blue Circle */}
          <div className="absolute top-[5%] md:top-[10%] right-[2%] md:right-[8%] w-24 h-24 md:w-[22rem] md:h-[22rem] bg-zeus-blue rounded-full" />

          {/* Bottom Right Orange Blob */}
          <div className="absolute -bottom-10 -right-10 md:-bottom-20 md:-right-20 w-40 h-40 md:w-[30rem] md:h-[30rem] bg-zeus-orange rounded-[60%_40%_30%_70%_/_60%_30%_70%_40%]" />

          {/* Bottom Left Blue Blob (Small) */}
          <div className="absolute bottom-[5%] md:bottom-[10%] left-[5%] md:left-[10%] w-16 h-16 md:w-48 md:h-48 bg-zeus-blue rounded-full" />


          {/* Floating Decors (SVG Doodles - Solid Black Lines) */}
          {/* Top Left Black Star Sparkle */}
          <svg className="absolute top-[20%] md:top-[25%] left-[5%] md:left-[8%] w-6 h-6 md:w-10 md:h-10 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"/>
          </svg>
          
          {/* Top Right Orange Star Sparkle */}
          <svg className="absolute top-[25%] md:top-[35%] right-[10%] md:right-[28%] w-5 h-5 md:w-8 md:h-8 text-zeus-orange" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"/>
          </svg>

          {/* Large Hashtag Left */}
          <div className="absolute top-[40%] md:top-[45%] left-[2%] md:left-[4%] text-[3rem] md:text-[5rem] font-black text-black dark:text-white transform -rotate-12 leading-none cursor-default">#</div>

          {/* Squiggle Top Center */}
          <svg className="absolute top-[10%] md:top-[15%] left-[20%] md:left-[30%] w-12 h-12 md:w-24 md:h-24 text-black dark:text-white transform rotate-12" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10,50 Q25,20 40,50 T70,50" />
          </svg>

          {/* Squiggle Top Right */}
          <svg className="absolute top-[18%] md:top-[25%] right-[2%] md:right-[8%] w-10 h-10 md:w-20 md:h-20 text-black dark:text-white transform -rotate-[40deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10,50 Q25,20 40,50 T70,50" />
          </svg>
          
          {/* Hashtag Right */}
          <div className="absolute top-[45%] md:top-[50%] right-[4%] md:right-[8%] text-[2.5rem] md:text-[4rem] font-black text-black dark:text-white transform rotate-12 leading-none cursor-default">#</div>
        </>
      )}

      {/* =========================================
          VARIANT: SECTION
          ========================================= */}
      {variant === 'section' && (
        <>
          {/* Lighter, sparser decorators designed not to overwhelm content */}
          {/* Top Left Blue Organic Blob */}
          <div className="absolute -top-10 -left-16 w-64 h-64 bg-zeus-blue opacity-50 dark:opacity-30 rounded-[40%_60%_70%_30%_/_40%_50%_60%_50%]" />

          {/* Bottom Right Orange Circle */}
          <div className="absolute -bottom-20 -right-10 w-[20rem] h-[20rem] bg-zeus-orange opacity-40 dark:opacity-20 rounded-full" />

          {/* Top Right Orange Star Sparkle */}
          <svg className="absolute top-[15%] right-[10%] w-8 h-8 text-zeus-orange opacity-60" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C12 6.62742 6.62742 12 0 12C6.62742 12 12 17.3726 12 24C12 17.3726 17.3726 12 24 12C17.3726 12 12 6.62742 12 0Z"/>
          </svg>

          {/* Squiggle Top Left */}
          <svg className="absolute top-[20%] left-[5%] w-16 h-16 text-black dark:text-white opacity-40 transform rotate-[15deg]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10,50 Q25,20 40,50 T70,50" />
          </svg>

          {/* Hashtag Bottom Left */}
          <div className="absolute bottom-[20%] left-[8%] text-[3rem] font-black text-black dark:text-white opacity-20 transform -rotate-12 leading-none cursor-default">#</div>
        </>
      )}

    </div>
  );
}
