import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Palette, 
  RotateCcw, 
  Download, 
  Sparkles, 
  Smile, 
  Eraser, 
  Stamp,
  Brush
} from 'lucide-react';

type ToolMode = 'brush' | 'stamp' | 'eraser';

interface StampOption {
  id: string;
  emoji: string;
  name: string;
}

const STAMPS: StampOption[] = [
  { id: 'lion', emoji: '🦁', name: 'Lion' },
  { id: 'elephant', emoji: '🐘', name: 'Elephant' },
  { id: 'giraffe', emoji: '🦒', name: 'Giraffe' },
  { id: 'star', emoji: '⭐', name: 'Star' },
  { id: 'rainbow', emoji: '🌈', name: 'Rainbow' },
  { id: 'sun', emoji: '☀️', name: 'Sun' },
  { id: 'heart', emoji: '💖', name: 'Heart' },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly' },
];

const COLORS = [
  { name: 'Sunshine', hex: '#FBBF24', emoji: '☀️' },
  { name: 'Cherry', hex: '#EF4444', emoji: '🍒' },
  { name: 'Sky', hex: '#38BDF8', emoji: '🌊' },
  { name: 'Grass', hex: '#22C55E', emoji: '🌿' },
  { name: 'Bubblegum', hex: '#EC4899', emoji: '🌸' },
  { name: 'Grape', hex: '#8B5CF6', emoji: '🍇' },
  { name: 'Tangerine', hex: '#F97316', emoji: '🍊' },
  { name: 'Night', hex: '#1E293B', emoji: '🖤' },
];

const TEMPLATES = [
  { id: 'blank', label: '📄 Blank Paper' },
  { id: 'sun', label: '☀️ Happy Sun' },
  { id: 'bear', label: '🧸 Baby Bear' },
  { id: 'flower', label: '🌸 Big Flower' },
];

export const ColoringPlayground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('#38BDF8');
  const [brushSize, setBrushSize] = useState<number>(18);
  const [toolMode, setToolMode] = useState<ToolMode>('brush');
  const [selectedStamp, setSelectedStamp] = useState<string>('🦁');
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [activeTemplate, setActiveTemplate] = useState<string>('sun');

  // Draw template lines on canvas
  const drawTemplate = (templateId: string, ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (templateId === 'sun') {
      // Big friendly center circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 75, 0, Math.PI * 2);
      ctx.stroke();

      // Sun rays
      for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        const x1 = width / 2 + Math.cos(angle) * 90;
        const y1 = height / 2 + Math.sin(angle) * 90;
        const x2 = width / 2 + Math.cos(angle) * 125;
        const y2 = height / 2 + Math.sin(angle) * 125;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Friendly smiling face
      ctx.beginPath();
      ctx.arc(width / 2 - 25, height / 2 - 15, 8, 0, Math.PI * 2);
      ctx.arc(width / 2 + 25, height / 2 - 15, 8, 0, Math.PI * 2);
      ctx.fillStyle = '#1E293B';
      ctx.fill();

      // Big smile
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 10, 35, 0.15 * Math.PI, 0.85 * Math.PI);
      ctx.stroke();
    } else if (templateId === 'bear') {
      // Head
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 10, 80, 0, Math.PI * 2);
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.arc(width / 2 - 65, height / 2 - 65, 30, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(width / 2 + 65, height / 2 - 65, 30, 0, Math.PI * 2);
      ctx.stroke();

      // Eyes
      ctx.fillStyle = '#1E293B';
      ctx.beginPath();
      ctx.arc(width / 2 - 25, height / 2 - 5, 8, 0, Math.PI * 2);
      ctx.arc(width / 2 + 25, height / 2 - 5, 8, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.beginPath();
      ctx.ellipse(width / 2, height / 2 + 25, 35, 25, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Nose & Smile
      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 18, 10, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.arc(width / 2, height / 2 + 28, 15, 0.1 * Math.PI, 0.9 * Math.PI);
      ctx.stroke();
    } else if (templateId === 'flower') {
      // Center circle
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 50, 0, Math.PI * 2);
      ctx.stroke();

      // Petals
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = width / 2 + Math.cos(angle) * 70;
        const py = height / 2 + Math.sin(angle) * 70;
        ctx.beginPath();
        ctx.arc(px, py, 35, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Stem
      ctx.beginPath();
      ctx.moveTo(width / 2, height / 2 + 105);
      ctx.quadraticCurveTo(width / 2 - 20, height / 2 + 160, width / 2, height - 20);
      ctx.stroke();
    }
  };

  const handleResetCanvas = (templateId = activeTemplate) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawTemplate(templateId, ctx, canvas.width, canvas.height);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Set internal resolution
    canvas.width = 680;
    canvas.height = 420;
    drawTemplate(activeTemplate, ctx, 680, 420);
  }, []);

  // Handle drawing coordinates
  const getCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    }
  };

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);

    if (toolMode === 'stamp') {
      ctx.font = '48px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = toolMode === 'eraser' ? '#FFFFFF' : selectedColor;
    ctx.lineWidth = toolMode === 'eraser' ? brushSize * 1.8 : brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const drawMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || toolMode === 'stamp') return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { x, y } = getCoords(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const handleDownloadDoodle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `littledoodles_artwork_${Date.now()}.png`;
    link.href = url;
    link.click();
  };

  return (
    <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-[36px] border-4 border-amber-300 p-6 sm:p-8 shadow-[0_6px_0_0_#FDE68A] space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-200 text-amber-950 font-cartoon font-extrabold text-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Interactive Toddler Sandbox</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cartoon font-black text-[#2B2A29] mt-1">
            Little Crayon Coloring Playground 🎨
          </h2>
          <p className="text-xs text-[#78716C] font-cartoon font-medium">
            Pick cheerful colors, cute animal stamps, and color right on the screen!
          </p>
        </div>

        {/* Template Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center">
          {TEMPLATES.map(tmpl => (
            <button
              key={tmpl.id}
              onClick={() => {
                setActiveTemplate(tmpl.id);
                handleResetCanvas(tmpl.id);
              }}
              className={`px-3 py-1.5 rounded-xl font-cartoon font-bold text-xs transition-all ${
                activeTemplate === tmpl.id
                  ? 'bg-amber-400 text-amber-950 border border-amber-500 shadow-2xs scale-105'
                  : 'bg-white text-stone-600 hover:bg-amber-100 border border-stone-200'
              }`}
            >
              {tmpl.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Canvas & Toolbox Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Toolbar: Colors, Brush, Stamps */}
        <div className="lg:col-span-4 bg-white rounded-3xl border-3 border-amber-200 p-4 space-y-4 shadow-2xs">
          
          {/* Tool Mode Buttons */}
          <div>
            <span className="text-xs font-cartoon font-bold text-[#78716C] block mb-1.5">
              Drawing Tool:
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setToolMode('brush')}
                className={`py-2 px-3 rounded-2xl font-cartoon font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  toolMode === 'brush'
                    ? 'bg-amber-400 text-amber-950 border-2 border-amber-500 shadow-xs'
                    : 'bg-stone-50 text-stone-600 border border-stone-200'
                }`}
              >
                <Brush className="w-3.5 h-3.5" />
                <span>Crayon</span>
              </button>

              <button
                onClick={() => setToolMode('stamp')}
                className={`py-2 px-3 rounded-2xl font-cartoon font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  toolMode === 'stamp'
                    ? 'bg-purple-200 text-purple-950 border-2 border-purple-400 shadow-xs'
                    : 'bg-stone-50 text-stone-600 border border-stone-200'
                }`}
              >
                <Stamp className="w-3.5 h-3.5" />
                <span>Stamps</span>
              </button>

              <button
                onClick={() => setToolMode('eraser')}
                className={`py-2 px-3 rounded-2xl font-cartoon font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                  toolMode === 'eraser'
                    ? 'bg-rose-100 text-rose-950 border-2 border-rose-400 shadow-xs'
                    : 'bg-stone-50 text-stone-600 border border-stone-200'
                }`}
              >
                <Eraser className="w-3.5 h-3.5" />
                <span>Eraser</span>
              </button>
            </div>
          </div>

          {/* Color Palette (When in brush mode) */}
          {toolMode === 'brush' && (
            <div>
              <span className="text-xs font-cartoon font-bold text-[#78716C] block mb-1.5">
                Crayon Color:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {COLORS.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.hex)}
                    style={{ backgroundColor: c.hex }}
                    className={`h-10 rounded-2xl border-2 flex items-center justify-center text-sm shadow-xs transition-transform ${
                      selectedColor === c.hex
                        ? 'border-black scale-110 ring-2 ring-amber-300'
                        : 'border-white/40 hover:scale-105'
                    }`}
                    title={c.name}
                  >
                    <span>{c.emoji}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stamps Palette (When in stamp mode) */}
          {toolMode === 'stamp' && (
            <div>
              <span className="text-xs font-cartoon font-bold text-[#78716C] block mb-1.5">
                Pick a Fun Sticker Stamp:
              </span>
              <div className="grid grid-cols-4 gap-2">
                {STAMPS.map(s => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedStamp(s.emoji)}
                    className={`h-11 rounded-2xl border-2 text-2xl flex items-center justify-center transition-transform ${
                      selectedStamp === s.emoji
                        ? 'bg-amber-100 border-amber-400 scale-110 shadow-xs'
                        : 'bg-stone-50 border-stone-200 hover:bg-stone-100'
                    }`}
                    title={s.name}
                  >
                    {s.emoji}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brush Thickness */}
          <div>
            <div className="flex justify-between text-xs font-cartoon font-bold text-[#78716C] mb-1">
              <span>Crayon Thickness:</span>
              <span>{brushSize}px</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBrushSize(10)}
                className={`flex-1 py-1.5 rounded-xl border font-cartoon text-xs font-bold ${
                  brushSize === 10 ? 'bg-amber-300 border-amber-500' : 'bg-stone-50'
                }`}
              >
                Little
              </button>
              <button
                onClick={() => setBrushSize(18)}
                className={`flex-1 py-1.5 rounded-xl border font-cartoon text-xs font-bold ${
                  brushSize === 18 ? 'bg-amber-300 border-amber-500' : 'bg-stone-50'
                }`}
              >
                Medium
              </button>
              <button
                onClick={() => setBrushSize(32)}
                className={`flex-1 py-1.5 rounded-xl border font-cartoon text-xs font-bold ${
                  brushSize === 32 ? 'bg-amber-300 border-amber-500' : 'bg-stone-50'
                }`}
              >
                Jumbo 🖍️
              </button>
            </div>
          </div>

        </div>

        {/* Right Area: Interactive Canvas & Action Buttons */}
        <div className="lg:col-span-8 space-y-3">
          <div className="relative rounded-3xl overflow-hidden border-4 border-amber-300 bg-white shadow-md touch-none">
            <canvas
              ref={canvasRef}
              onMouseDown={startDraw}
              onMouseMove={drawMove}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={drawMove}
              onTouchEnd={endDraw}
              className="w-full aspect-16/10 cursor-crosshair bg-white block"
            />
          </div>

          {/* Bottom Canvas Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleResetCanvas()}
                className="px-4 py-2 bg-white hover:bg-stone-100 text-stone-700 font-cartoon font-bold text-xs rounded-2xl border-2 border-stone-200 shadow-2xs flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Start Fresh</span>
              </button>
            </div>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadDoodle}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-cartoon font-black text-xs rounded-2xl shadow-[0_3px_0_0_#059669] flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download My Artwork! 🖼️</span>
            </motion.button>
          </div>
        </div>

      </div>

    </div>
  );
};
