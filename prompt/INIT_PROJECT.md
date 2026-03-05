1. สร้างโปรเจค Zeus Premium

อ่านฟีเจอร์ที่เขียนไว้ที่ 
/Users/marosdeeuma/zeus-premium-nextjs/prompt/FEATURE.md

โดยทุกครั้งที่สร้าง page.tsx ต้องทำตาม rule ที่เขียนไว้ที่ /Users/marosdeeuma/zeus-premium-nextjs/prompt/CREATE_PAGE_PATTERN.md

ออกแบบ Master Data และ Static data สำหรับโปรเจค (Static data จะเรียกใช้ผ่าน Repo)

ตามหลัก SOLID Clean

2. เริ่มพัฒนาโปรเจคอันดับแรกเลย ต้องสร้างหน้า MainLayout พร้อม Header Footer และใส่ Theme Toggle เพื่อทำ dark mode

MainLayout ต้องให้ออกแบบอารมณ์ ตามภาพนี้ /Users/marosdeeuma/zeus-premium-nextjs/prompt/zeus-premium-screenshot/611553513_1431933871970780_2489486753334852353_n.jpg

ให้ใช้ tailwindcss สำหรับทำ style ที่ /Users/marosdeeuma/zeus-premium-nextjs/public/styles/index.css

ใช้ font Noto_Sans_Thai จาก  'next/font/google'

3. ออกแบบ Reuse Component ของ MainLayout

ตกแหน่ง component ด้วย animation ด้วย react-spring เช่น ทำ component แบบ สามารถ interact ด้วย mouse hover หรือ mouse click (ห้ามใช้ useTrail)

4. จากนั้นสร้างหน้าแรก ให้สวยงาม
