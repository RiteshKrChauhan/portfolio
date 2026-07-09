"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface CursorContextType {
  isHovering: boolean;
  setIsHovering: (v: boolean) => void;
  cursorText: string;
  setCursorText: (v: string) => void;
}

const CursorContext = createContext<CursorContextType>({
  isHovering: false,
  setIsHovering: () => {},
  cursorText: "",
  setCursorText: () => {},
});

export function useCursor() {
  return useContext(CursorContext);
}

function Cursor() {
  const { isHovering, cursorText } = useCursor();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.1 });
  const [visible, setVisible] = useState(false);
  const [clicked, setClicked] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => setVisible(false), 3000);
    },
    [x, y, visible]
  );

  const handleMouseDown = useCallback(() => setClicked(true), []);
  const handleMouseUp = useCallback(() => setClicked(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp]);

  return (
    <>
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] mix-blend-difference"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.5 : isHovering ? 2.5 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: isHovering ? "64px" : "8px",
            height: isHovering ? "64px" : "8px",
          }}
        />
      </motion.div>

      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998]"
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.8 : isHovering ? 1.2 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div
          className="rounded-full border transition-all duration-300"
          style={{
            width: isHovering ? "80px" : "32px",
            height: isHovering ? "80px" : "32px",
            borderColor: isHovering
              ? "rgba(59, 130, 246, 0.4)"
              : "rgba(255, 255, 255, 0.15)",
            borderWidth: isHovering ? "2px" : "1px",
          }}
        />
      </motion.div>

      {cursorText && isHovering && (
        <motion.div
          className="pointer-events-none fixed top-0 left-0 z-[10000]"
          style={{
            x: springX,
            y: springY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <span className="text-xs font-medium tracking-wider text-white uppercase">
            {cursorText}
          </span>
        </motion.div>
      )}
    </>
  );
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorText, setCursorText] = useState("");

  return (
    <CursorContext.Provider
      value={{ isHovering, setIsHovering, cursorText, setCursorText }}
    >
      <Cursor />
      {children}
    </CursorContext.Provider>
  );
}
