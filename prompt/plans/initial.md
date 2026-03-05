# Zeus Premium - Company Website

A premium product manufacturing company website built with Next.js 16, TailwindCSS 4, react-spring animations, and Clean Architecture (SOLID principles). The brand identity uses **blue ⚡ / orange accents** with a clean white grid aesthetic.

## Proposed Features

Based on the FEATURE.md description ("รับผลิตของพรีเมียมครบวงจร") — a full-service premium goods manufacturer, here are the features for a world-class company website:

| Section | Description |
|---------|-------------|
| **Hero Banner** | Animated hero with company tagline + product showcase |
| **Product Categories** | Grid display of 16+ product types (bags, fans, mugs, caps, shirts, etc.) |
| **Why Choose Us** | Key differentiators: quality, design, on-time delivery, full-service |
| **Contact/CTA** | LINE QR code, phone, email — quick inquiry form |

---

## Proposed Changes

### Design System — TailwindCSS

#### [MODIFY] [index.css](file:///Users/marosdeeuma/zeus-premium-nextjs/public/styles/index.css)

Add Zeus Premium design tokens via CSS custom properties:
- Brand colors: **Zeus Blue** (`#2563EB`), **Zeus Orange** (`#F97316`), neutrals
- Dark mode variants using `.dark` selector (matching `@custom-variant dark`)
- Custom utility classes for glassmorphism cards, gradients, grid backgrounds
- Animation keyframes for scroll-reveal effects

---

### Theme & Font Configuration

#### [MODIFY] [layout.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/app/layout.tsx)

- Import `Noto_Sans_Thai` from `next/font/google`
- Wrap app with `ThemeProvider` from `next-themes`
- Set metadata for Zeus Premium
- Apply font className to `<body>`

#### [NEW] [ThemeProvider.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/providers/ThemeProvider.tsx)

Client component wrapping `next-themes` `ThemeProvider` with `attribute="class"` for TailwindCSS dark mode.

---

### MainLayout Components

#### [NEW] [MainLayout.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/layouts/MainLayout.tsx)

Root layout component containing Header + `{children}` + Footer. Uses react-spring for mount animations.

#### [NEW] [Header.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/layouts/Header.tsx)

- Sticky header with glassmorphism background (`backdrop-blur`)
- Zeus Premium logo (text-based with ⚡ icon from Lucide)
- Navigation links: หน้าแรก, สินค้า, เกี่ยวกับเรา, ติดต่อ
- `ThemeToggle` button
- Mobile hamburger menu
- React-spring `useSpring` for fade-in on mount, hover interactions

#### [NEW] [Footer.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/layouts/Footer.tsx)

- Company info, product category links, contact details
- Social media / LINE QR section
- Copyright notice
- React-spring animated elements on scroll into view

#### [NEW] [ThemeToggle.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/shared/ThemeToggle.tsx)

Sun/Moon toggle using `next-themes` `useTheme()` with react-spring rotation animation.

---

### Reusable Animated Components (react-spring)

#### [NEW] [AnimatedCard.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/shared/AnimatedCard.tsx)

Card with `useSpring` hover effect: scale up, lift shadow, slight Y-translate. Mouse-interactive.

#### [NEW] [AnimatedButton.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/shared/AnimatedButton.tsx)

Button with spring press effect on click, scale bounce on hover.

#### [NEW] [AnimatedSection.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/shared/AnimatedSection.tsx)

Wrapper that uses `useSpring` + IntersectionObserver for fade-in-up scroll reveal.

#### [NEW] [AnimatedCounter.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/shared/AnimatedCounter.tsx)

Number counter animation using `useSpring` for stats display (e.g., "1000+ ลูกค้า").

> [!IMPORTANT]
> All react-spring animations use `useSpring` or `useSprings`. **No `useTrail`** per user requirement.

---

### Static Data & Repositories (Clean Architecture)

#### [NEW] [IProductCategoryRepository.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/application/repositories/IProductCategoryRepository.ts)

```typescript
interface ProductCategory {
  id: string; slug: string; name: string; description: string;
  icon: string; imageUrl?: string; minOrder: number; isActive: boolean;
}
interface IProductCategoryRepository {
  getAll(): Promise<ProductCategory[]>;
  getBySlug(slug: string): Promise<ProductCategory | null>;
  getActive(): Promise<ProductCategory[]>;
}
```

#### [NEW] [StaticProductCategoryRepository.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/infrastructure/repositories/static/StaticProductCategoryRepository.ts)

Static data for 16 product categories from the screenshot:
กระเป๋าผ้าสปันบอนด์, กระเป๋าผ้าร่ม, กระเป๋าผ้าแคนวาส, กระเป๋าผ้ากระสอบ, กระเป๋าผ้าดิบ, กระเป๋า600D, พัดพลาสติก, พัดสปริง, หมวกแก๊ป, หมวกไวเซอร์, เสื้อยืด, เสื้อคอกลม, เสื้อโปโล, แก้วเก็บอุณหภูมิ, กระบอกน้ำ, ปากกา, สมุดโน้ต, เครื่องเขียน, กล่องบรรจุภัณฑ์

#### [NEW] [ICompanyInfoRepository.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/application/repositories/ICompanyInfoRepository.ts)

```typescript
interface CompanyInfo {
  name: string; tagline: string; description: string;
  phone: string; email: string; lineId: string;
  address: string; features: CompanyFeature[];
  stats: CompanyStat[];
}
```

#### [NEW] [StaticCompanyInfoRepository.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/infrastructure/repositories/static/StaticCompanyInfoRepository.ts)

Static company data: Zeus Premium info, features (คุณภาพสูง, ดีไซน์ทันสมัย, ตรงเวลา, ครบวงจร), stats (years, clients, products).

---

### Home Page (Clean Architecture Pattern)

#### [MODIFY] [page.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/app/page.tsx)

Server Component following CREATE_PAGE_PATTERN. Calls `HomePresenter` to get `HomeViewModel`, renders `HomeView`.

#### [NEW] [HomePresenter.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/presenters/home/HomePresenter.ts)

Aggregates data from `IProductCategoryRepository` + `ICompanyInfoRepository` into `HomeViewModel`.

#### [NEW] [HomePresenterServerFactory.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/presenters/home/HomePresenterServerFactory.ts)

Factory injecting static repositories for server-side rendering.

#### [NEW] [HomePresenterClientFactory.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/presenters/home/HomePresenterClientFactory.ts)

Factory injecting static repositories for client-side hydration.

#### [NEW] [useHomePresenter.ts](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/presenters/home/useHomePresenter.ts)

Client hook managing home page state.

#### [NEW] [HomeView.tsx](file:///Users/marosdeeuma/zeus-premium-nextjs/src/presentation/components/home/HomeView.tsx)

Main home page view with sections:
1. **Hero** — Full-width animated banner with tagline "ดีไซน์โดนใจ งานไวทันใช้ มั่นใจคุณภาพ"
2. **Product Categories** — Animated card grid showing all categories
3. **Why Choose Us** — Feature cards with animated counters
4. **CTA / Contact** — LINE QR, contact form teaser

---

## Verification Plan

### Automated Tests
```bash
# Build check — ensures no TypeScript or compilation errors
cd /Users/marosdeeuma/zeus-premium-nextjs && yarn build
```

### Manual Verification (Browser)
1. Open `http://localhost:3000` — verify home page loads with hero, products, features
2. Click the **Theme Toggle** (sun/moon icon) — verify dark mode toggles correctly
3. **Hover** over product cards — verify react-spring scale animation
4. **Scroll down** — verify sections animate into view (fade-in-up)
5. Resize browser to mobile width — verify responsive header (hamburger menu) and stacked layout
6. Check Header is sticky with glassmorphism backdrop-blur on scroll
