const sharp = require('sharp');
const fs = require('fs');

async function processAll() {
  const slugs = [
    'bedroom-comfort', 'kitchen-dining', 'bathroom-care', 'air-conditioning',
    'smart-tv', 'living-room', 'high-speed-wifi', 'laundry-washing',
    'hot-water', 'power-backup', 'refrigerator', 'microwave',
    'dining-space', 'work-desk', 'fitness-wellness', 'elevator',
    'security-24-7', 'parking', 'housekeeping', 'restaurant',
    'outdoor-space', 'children-play-area', 'pet-friendly', 'concierge-service'
  ];

  for (const slug of slugs) {
    const cardPath = 'public/images/amenities/card-' + slug + '.png';
    const outPath = 'public/images/amenities/icon-' + slug + '.png';

    const { data, info } = await sharp(cardPath).raw().toBuffer({ resolveWithObject: true });
    const { width, height, channels } = info;

    // Crop out the bottom text area (which starts below ~68% height)
    const objHeight = Math.floor(height * 0.70);
    
    // Sample background color from multiple safe spots inside the card
    const sampleSpots = [
      [60, 60], [width - 60, 60], [80, 80], [width - 80, 80],
      [60, 120], [width - 60, 120]
    ];
    let avgR = 0, avgG = 0, avgB = 0, count = 0;
    for (const [sx, sy] of sampleSpots) {
      const idx = (sy * width + sx) * channels;
      if (data[idx] > 200 && data[idx+1] > 200 && data[idx+2] > 180) {
        avgR += data[idx];
        avgG += data[idx+1];
        avgB += data[idx+2];
        count++;
      }
    }
    const bgR = count ? Math.round(avgR / count) : 249;
    const bgG = count ? Math.round(avgG / count) : 244;
    const bgB = count ? Math.round(avgB / count) : 233;

    // Build alpha map
    const alphaMap = new Float32Array(width * objHeight);
    const outR = new Uint8Array(width * objHeight);
    const outG = new Uint8Array(width * objHeight);
    const outB = new Uint8Array(width * objHeight);

    // Initial detection: mark background vs object
    for (let y = 0; y < objHeight; y++) {
      for (let x = 0; x < width; x++) {
        const srcIdx = (y * width + x) * channels;
        const pIdx = y * width + x;

        const r = data[srcIdx];
        const g = data[srcIdx + 1];
        const b = data[srcIdx + 2];
        const a = channels === 4 ? data[srcIdx + 3] : 255;

        // Strip the card's outer perimeter completely (border lines, corners, margins)
        if (x < 46 || x > width - 46 || y < 45 || a < 50) {
          alphaMap[pIdx] = 0;
          continue;
        }

        // Distance from cream background
        const dist = Math.sqrt((r - bgR)**2 + (g - bgG)**2 + (b - bgB)**2);
        
        // Check if near-white/cream with very low saturation (like gaps inside icons)
        const maxC = Math.max(r, g, b);
        const minC = Math.min(r, g, b);
        const isNearWhiteCream = (r >= 232 && g >= 226 && b >= 212 && (maxC - minC) < 30);

        let alpha = 1.0;
        if (dist < 18 || isNearWhiteCream) {
          alpha = 0.0;
        } else if (dist < 38) {
          // Soft transition ramp
          alpha = (dist - 18) / 20;
        } else {
          alpha = 1.0;
        }

        // Decontaminate edge pixels from background color
        if (alpha > 0.05 && alpha < 0.98) {
          const uR = Math.max(0, Math.min(255, Math.round((r - (1 - alpha) * bgR) / alpha)));
          const uG = Math.max(0, Math.min(255, Math.round((g - (1 - alpha) * bgG) / alpha)));
          const uB = Math.max(0, Math.min(255, Math.round((b - (1 - alpha) * bgB) / alpha)));
          outR[pIdx] = uR;
          outG[pIdx] = uG;
          outB[pIdx] = uB;
        } else {
          outR[pIdx] = r;
          outG[pIdx] = g;
          outB[pIdx] = b;
        }

        alphaMap[pIdx] = alpha;
      }
    }

    // Morphological defringe: Remove any 1px fringes or rogue isolated noise
    const finalAlpha = new Float32Array(alphaMap);
    for (let y = 1; y < objHeight - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const pIdx = y * width + x;
        if (alphaMap[pIdx] > 0 && alphaMap[pIdx] < 0.85) {
          const n0 = alphaMap[pIdx - 1];
          const n1 = alphaMap[pIdx + 1];
          const n2 = alphaMap[pIdx - width];
          const n3 = alphaMap[pIdx + width];
          if (n0 === 0 || n1 === 0 || n2 === 0 || n3 === 0) {
            finalAlpha[pIdx] = Math.max(0, alphaMap[pIdx] - 0.3);
          }
        }
      }
    }

    // Find bounding box of foreground
    let minX = width, maxX = 0, minY = objHeight, maxY = 0;
    for (let y = 0; y < objHeight; y++) {
      for (let x = 0; x < width; x++) {
        const pIdx = y * width + x;
        if (finalAlpha[pIdx] > 0.15) {
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (minX > maxX || minY > maxY) {
      console.warn('Warning: empty bbox for', slug);
      continue;
    }

    // Construct RGBA buffer for cropped object
    const pad = 12;
    const cropX = Math.max(0, minX - pad);
    const cropY = Math.max(0, minY - pad);
    const cropW = Math.min(width - cropX, (maxX - minX) + pad * 2);
    const cropH = Math.min(objHeight - cropY, (maxY - minY) + pad * 2);

    const croppedBuf = Buffer.alloc(cropW * cropH * 4);
    for (let cy = 0; cy < cropH; cy++) {
      for (let cx = 0; cx < cropW; cx++) {
        const sx = cropX + cx;
        const sy = cropY + cy;
        const srcIdx = sy * width + sx;
        const dstIdx = (cy * cropW + cx) * 4;

        croppedBuf[dstIdx] = outR[srcIdx];
        croppedBuf[dstIdx + 1] = outG[srcIdx];
        croppedBuf[dstIdx + 2] = outB[srcIdx];
        croppedBuf[dstIdx + 3] = Math.round(finalAlpha[srcIdx] * 255);
      }
    }

    // Standardize onto a high-res clean 260x220 canvas, centered
    const targetW = 260;
    const targetH = 220;
    
    // Resize object keeping aspect ratio to fit inside 225x185
    const resizedObj = await sharp(croppedBuf, { raw: { width: cropW, height: cropH, channels: 4 } })
      .resize({ width: 225, height: 185, fit: 'inside' })
      .png()
      .toBuffer();

    // Composite onto transparent target canvas
    await sharp({
      create: {
        width: targetW,
        height: targetH,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      }
    })
    .composite([{
      input: resizedObj,
      gravity: 'centre'
    }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);

    console.log('✓ Successfully processed and cleaned', slug);
  }
}

processAll().catch(console.error);
