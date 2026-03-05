"use client";

import { ImagePlus, Move, Trash2 } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useRef, useState } from "react";

interface VirtualLogoMockupProps {
  productImageSrc: string;
  productName: string;
}

export function VirtualLogoMockup({
  productImageSrc,
  productName,
}: VirtualLogoMockupProps) {
  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Default position: centered 50% / 50%
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isDraggingLogo, setIsDraggingLogo] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (!file.type.match("image/(png|svg\\+xml|jpeg)")) {
      alert("รองรับเฉพาะไฟล์รูปภาพ (PNG, SVG, JPG) เท่านั้นครับ");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoSrc(e.target?.result as string);
      // Reset position to center whenever a new logo is uploaded
      setPosition({ x: 50, y: 50 });
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  // --- Logic for dragging the logo around the relative container ---
  
  const handleLogoMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent standard image drag
    if (!logoSrc) return;
    setIsDraggingLogo(true);
    
    // Support both mouse and touch events
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    setDragStart({ x: clientX, y: clientY });
  };

  const handleLogoMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDraggingLogo || !containerRef.current) return;
    
    // Support both mouse and touch events
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    const deltaX = clientX - dragStart.x;
    const deltaY = clientY - dragStart.y;

    const containerRect = containerRef.current.getBoundingClientRect();
    
    // Convert pixel delta to percentage
    const deltaXPercent = (deltaX / containerRect.width) * 100;
    const deltaYPercent = (deltaY / containerRect.height) * 100;

    let newX = position.x + deltaXPercent;
    let newY = position.y + deltaYPercent;

    // Clamp values between 10% and 90% roughly so the logo doesn't go entirely off screen
    newX = Math.max(10, Math.min(90, newX));
    newY = Math.max(10, Math.min(90, newY));

    setPosition({ x: newX, y: newY });
    setDragStart({ x: clientX, y: clientY });
  };

  const handleLogoMouseUp = () => {
    setIsDraggingLogo(false);
  };

  // Attach global mouseup to stop dragging if mouse leaves the container
  React.useEffect(() => {
    const handleGlobalMouseUp = () => setIsDraggingLogo(false);
    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Visualizer Frame */}
      <div 
        ref={containerRef}
        className={`relative w-full aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
          isDragging 
            ? "border-zeus-blue bg-zeus-blue/5 dark:bg-zeus-blue/10 scale-[1.02]" 
            : "border-border-light dark:border-border-dark bg-surface-elevated-light dark:bg-surface-elevated-dark"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onMouseMove={handleLogoMouseMove}
        onTouchMove={handleLogoMouseMove}
        onMouseUp={handleLogoMouseUp}
        onMouseLeave={handleLogoMouseUp}
      >
        {/* Main Product Image (Background) */}
        <div className="absolute inset-0 select-none pointer-events-none">
          <Image
            src={productImageSrc}
            alt={productName}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Overlay Logo */}
        {logoSrc && (
          <div 
            className="absolute z-10 w-1/3 aspect-square select-none cursor-grab active:cursor-grabbing hover:ring-2 hover:ring-zeus-blue/50 rounded-lg transition-shadow"
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: "translate(-50%, -50%)",
              mixBlendMode: "multiply", // Makes white backgrounds transparent-ish on light products. Note: might look weird on dark products. Using normal and assuming user uploads PNG with alpha is best, but multiply is a cool effect. 
            }}
            onMouseDown={handleLogoMouseDown}
            onTouchStart={handleLogoMouseDown}
          >
             {/* Using standard img here instead of next/image because src is base64 dataURI which occasionally causes warning or constraints with next/image unless unoptimized. */}
            <img 
              src={logoSrc} 
              alt="Uploaded Logo" 
              className="w-full h-full object-contain pointer-events-none drop-shadow-md"
              draggable={false}
            />
            
            {/* Overlay hint icon, visible only when hovered to indicate draggability */}
            {!isDraggingLogo && (
               <div className="absolute top-0 right-0 p-1 bg-surface-light/80 dark:bg-surface-dark/80 rounded-full shadow-sm m-1 opacity-0 hover:opacity-100 transition-opacity">
                  <Move className="w-4 h-4 text-text-secondary-light dark:text-text-secondary-dark" />
               </div>
            )}
          </div>
        )}

        {/* Drag Overlay State */}
        {isDragging && (
          <div className="absolute inset-0 z-20 bg-zeus-blue/10 backdrop-blur-sm flex items-center justify-center pointer-events-none">
            <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-xl flex flex-col items-center gap-2">
              <div className="p-3 bg-zeus-blue/10 rounded-full">
                <ImagePlus className="w-8 h-8 text-zeus-blue" />
              </div>
              <p className="font-bold text-zeus-blue">วางไฟล์โลโก้ที่นี่</p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3">
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/png, image/jpeg, image/svg+xml"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFile(e.target.files[0]);
            }
          }}
        />
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex-1 py-3 px-4 rounded-xl border border-border-light dark:border-border-dark bg-surface-elevated-light dark:bg-surface-elevated-dark hover:border-zeus-blue dark:hover:border-zeus-blue transition-colors flex items-center justify-center gap-2 text-sm font-semibold text-text-primary-light dark:text-text-primary-dark"
        >
          <ImagePlus className="w-4 h-4 text-zeus-blue" />
          {logoSrc ? "เปลี่ยนโลโก้ใหม่" : "ลองจำลองโลโก้ฟรี"}
        </button>

        {logoSrc && (
          <button
            onClick={() => setLogoSrc(null)}
            className="p-3 rounded-xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
            title="ลบโลโก้"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {!logoSrc ? (
        <p className="text-xs text-text-muted-light dark:text-text-muted-dark text-center">
          รองรับไฟล์ PNG พื้นหลังใส, SVG, หรือ JPG เพื่อดูภาพตัวอย่างเสมือนจริง
        </p>
      ) : (
        <p className="text-xs text-zeus-blue dark:text-zeus-blue-light text-center font-medium animate-pulse">
          * คุณสามารถคลิกค้างที่โลโก้แล้วลากเพื่อปรับตำแหน่งได้ *
        </p>
      )}
    </div>
  );
}
