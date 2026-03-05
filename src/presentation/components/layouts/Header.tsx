"use client";

import { SearchModal } from "@/src/presentation/components/shared/SearchModal";
import { ThemeToggle } from "@/src/presentation/components/shared/ThemeToggle";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { Menu, Search, X, Zap } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const NAV_ITEMS = [
  { label: "หน้าแรก", href: "/" },
  { label: "สินค้า", href: "/products" },
  { label: "เกี่ยวกับเรา", href: "/about" },
  { label: "ติดต่อเรา", href: "/contact" },
];

/**
 * Header
 * Sticky header with glassmorphism, animated logo, and responsive nav
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logo entrance animation
  const logoSpring = useSpring({
    from: { opacity: 0, x: -20 },
    to: { opacity: 1, x: 0 },
    config: { tension: 180, friction: 20 },
  });

  // Nav items entrance animation (using useSprings instead of useTrail)
  const [navSprings] = useSprings(NAV_ITEMS.length, (index) => ({
    from: { opacity: 0, y: -10 },
    to: { opacity: 1, y: 0 },
    delay: 100 + index * 80,
    config: { tension: 200, friction: 22 },
  }));

  // Mobile menu animation
  const mobileMenuSpring = useSpring({
    opacity: isMobileMenuOpen ? 1 : 0,
    transform: isMobileMenuOpen ? "translateY(0%)" : "translateY(-10%)",
    config: { tension: 250, friction: 25 },
  });

  // Logo hover animation
  const [logoHover, setLogoHover] = useState(false);
  const logoHoverSpring = useSpring({
    transform: logoHover ? "scale(1.05)" : "scale(1)",
    config: { tension: 300, friction: 15 },
  });

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "zeus-glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <animated.div style={{ ...logoSpring, ...logoHoverSpring }}>
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onMouseEnter={() => setLogoHover(true)}
              onMouseLeave={() => setLogoHover(false)}
            >
              <div className="w-10 h-10 rounded-xl zeus-gradient-bg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Zap className="w-6 h-6 text-white" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-zeus-blue dark:text-zeus-blue-light">Z</span>
                  <span className="text-zeus-blue dark:text-zeus-blue-light">EU</span>
                  <span className="text-zeus-blue dark:text-zeus-blue-light">S</span>
                </span>
                <span className="text-[10px] font-semibold tracking-[0.2em] text-text-secondary-light dark:text-text-secondary-dark -mt-1">
                  PREMIUM
                </span>
              </div>
            </Link>
          </animated.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navSprings.map((spring, index) => (
              <animated.div key={NAV_ITEMS[index].href} style={spring}>
                <NavLink item={NAV_ITEMS[index]} />
              </animated.div>
            ))}
            <div className="ml-4 pl-4 border-l border-border-light dark:border-border-dark flex items-center gap-2">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center
                  bg-zeus-blue-50 dark:bg-zeus-blue-900/30
                  hover:bg-zeus-blue-100 dark:hover:bg-zeus-blue-900/50
                  transition-colors cursor-pointer text-text-primary-light dark:text-text-primary-dark"
                aria-label="Open search"
              >
                <Search className="w-5 h-5" />
              </button>
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-xl flex items-center justify-center
                bg-zeus-blue-50 dark:bg-zeus-blue-900/30
                hover:bg-zeus-blue-100 dark:hover:bg-zeus-blue-900/50
                transition-colors cursor-pointer text-text-primary-light dark:text-text-primary-dark"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center
                bg-zeus-blue-50 dark:bg-zeus-blue-900/30
                hover:bg-zeus-blue-100 dark:hover:bg-zeus-blue-900/50
                transition-colors cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              ) : (
                <Menu className="w-5 h-5 text-text-primary-light dark:text-text-primary-dark" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <animated.div
          style={mobileMenuSpring}
          className="md:hidden zeus-glass border-t border-border-light dark:border-border-dark"
        >
          <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-text-primary-light dark:text-text-primary-dark
                  hover:bg-zeus-blue-50 dark:hover:bg-zeus-blue-900/30
                  font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </animated.div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </header>
  );
}

/**
 * NavLink with hover spring animation
 */
function NavLink({ item }: { item: { label: string; href: string } }) {
  const [hovered, setHovered] = useState(false);

  const hoverSpring = useSpring({
    backgroundColor: hovered ? "rgba(37, 99, 235, 0.08)" : "rgba(37, 99, 235, 0)",
    color: hovered ? "#2563EB" : undefined,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.div style={hoverSpring} className="rounded-xl">
      <Link
        href={item.href}
        className="px-4 py-2 rounded-xl text-sm font-medium
          text-text-secondary-light dark:text-text-secondary-dark
          hover:text-zeus-blue dark:hover:text-zeus-blue-light
          transition-colors block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {item.label}
      </Link>
    </animated.div>
  );
}
