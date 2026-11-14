import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BookOpen } from "lucide-react";

const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = "", delay = 0, y = 24 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: EASE_OUT_EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerGroup({
  children,
  className = "",
  staggerDelay = 0.08,
}: StaggerGroupProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  key?: React.Key;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: EASE_OUT_EXPO },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxFrame({
  children,
  className = "",
  offset = 28,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className = "w-full h-full object-cover",
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-brand-beige via-brand-beige-soft to-brand-green-tint flex flex-col items-center justify-center p-6 text-center">
        <div className="w-11 h-11 rounded-lg bg-brand-green/10 text-brand-green flex items-center justify-center mb-3">
          <BookOpen className="w-5 h-5" />
        </div>
        <span className="font-serif text-sm font-semibold text-brand-charcoal">
          {title || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
