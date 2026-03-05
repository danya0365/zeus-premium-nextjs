"use client";

import { useQuoteStore } from "@/src/application/store/useQuoteStore";
import { QuoteItemOptions } from "@/src/domain/models/Quote";
import { AnimatedButton, AnimatedButtonProps } from "@/src/presentation/components/shared/AnimatedButton";
import { Check, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface AddToQuoteButtonProps extends Omit<AnimatedButtonProps, 'children'> {
  productSlug: string;
  productName: string;
  quantity?: number;
  options?: QuoteItemOptions;
  thumbnailUrl?: string;
  label?: string;
  showIcon?: boolean;
}

export function AddToQuoteButton({
  productSlug,
  productName,
  quantity = 100, // Default minimum
  options,
  thumbnailUrl,
  label = "เพิ่มลงใบเสนอราคา",
  showIcon = true,
  variant = "primary",
  ...props
}: AddToQuoteButtonProps) {
  const [mounted, setMounted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const addItem = useQuoteStore((state) => state.addItem);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem(productSlug, productName, quantity, thumbnailUrl, options);
    
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <AnimatedButton
      variant={isAdded ? "outline" : variant}
      onClick={handleAdd}
      className={`transition-all duration-300 ${
        isAdded
          ? "border-green-500 text-green-600 dark:border-green-400 dark:text-green-400 bg-green-50 dark:bg-green-900/20"
          : ""
      } ${props.className || ""}`}
      {...props}
    >
      <span className="flex items-center gap-2 justify-center">
        {showIcon && (isAdded ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />)}
        {isAdded ? "เพิ่มแล้ว" : label}
      </span>
    </AnimatedButton>
  );
}
