import React, { useState, useRef, useEffect } from 'react';
import './style.css'

function ImageBorderCreator() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [borderWidth, setBorderWidth] = useState<number>(50);
  const [borderColor, setBorderColor] = useState<string>('#ffffff');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageSrc(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const padding = borderWidth * 2;
      canvas.width = img.width + padding * 2;
      canvas.height = img.height + padding * 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Center coordinates for drawing
      const x = padding;
      const y = padding;

      if (borderWidth > 0) {
        // 2. Create a temporary offscreen canvas to isolate the image silhouette
        const alphaCanvas = document.createElement('canvas');
        alphaCanvas.width = canvas.width;
        alphaCanvas.height = canvas.height;
        const alphaCtx = alphaCanvas.getContext('2d');
        
        // Draw the border of image 
        if (alphaCtx) {
          alphaCtx.drawImage(img, x, y);
          // Source-in composite mode replaces all visible pixels with the border color
          alphaCtx.globalCompositeOperation = 'source-in';
          alphaCtx.fillStyle = borderColor;
          alphaCtx.fillRect(0, 0, canvas.width, canvas.height);
          
          // This creates a solid, uniform outline following the exact pixel boundary
          const quality = 32; // Higher numbers = smoother round corners
          for (let i = 0; i < quality; i++) {
            const angle = (i / quality) * Math.PI * 2;
            const offsetX = Math.cos(angle) * borderWidth;
            const offsetY = Math.sin(angle) * borderWidth;
            ctx.drawImage(alphaCanvas, offsetX, offsetY);
          }
        }
      }

      //draw original image normally
      ctx.drawImage(img, x, y);
    };
  }, [imageSrc, borderWidth, borderColor]); //when user input changes uploasded file or border width or colour, execute function

  const downloadSticker = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = 'sticker-ready.png';
    link.href = canvas.toDataURL('image/png'); 
    link.click();
  };

  return (
    <div className='border-creator'>
      <h1>Sticker Border Generator</h1>
      <input type="file" accept="image/png" onChange={handleFileChange} />
      {/* && is JS conditional parameter. so if there is an image then return right side
      else just return null (which is ignored when rendering) */}
      {imageSrc && (
        <div className='border-display-container'>
          <div className='options-container'>
            <label className='border-thickness'>
              Border Thickess: 
              <input type="range" min="0" max="100" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
              <input type="number" min="0" max="100" value={borderWidth} onChange={(e) => setBorderWidth(Number(e.target.value))} />
            </label>
            <label className='border-colour-label'>
              Border Color: 
              <input type="color" value={borderColor} onChange={(e) => setBorderColor(e.target.value)} />
            </label>
            <button className='download-button' onClick={downloadSticker}>Download PNG</button>
          </div>
          
          <div className='canvas-container'>
            <canvas className='canvas-img' ref={canvasRef} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ImageBorderCreator;