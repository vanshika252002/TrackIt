import React, { useRef, useState, useEffect, ReactNode } from 'react';

type DraggableWrapperProps = {
  children: ReactNode;
};

const DraggableWrapper: React.FC<DraggableWrapperProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLButtonElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 10, y: 10 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging) return;
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const x = e.clientX - parseInt(wrapper.dataset.mouseX ?? '0', 10);
      const y = e.clientY - parseInt(wrapper.dataset.mouseY ?? '0', 10);
      setPosition({ x, y });
    };

    const handleMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging]);

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    setDragging(true);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    wrapper.dataset.mouseX = (e.clientX - wrapper.offsetLeft).toString();
    wrapper.dataset.mouseY = (e.clientY - wrapper.offsetTop).toString();
  };

  return (
    <button
      ref={wrapperRef}
      onMouseDown={handleMouseDown}
      style={{
        position: 'fixed',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: 'move',
        userSelect: 'none',
        zIndex: 10000,
      }}
    >
      {children}
    </button>
  );
};

export default DraggableWrapper;
