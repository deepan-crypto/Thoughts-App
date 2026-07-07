#!/usr/bin/env node
/**
 * Generates proper app icons from the SVG source.
 * - app-icon.png: 1024x1024 (iOS App Store / Expo icon) - NO alpha, white bg
 * - adaptive-icon.png: 1536x1536 (Android adaptive icon foreground) - WITH alpha
 */

const { Resvg } = require('@resvg/resvg-js');
const fs = require('fs');
const path = require('path');

const ASSETS_DIR = path.join(__dirname, 'assets', 'images');

// SVG with white background (no alpha - required for iOS App Store)
const svgAppIcon = `<svg width="1024" height="1024" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="1024" height="1024" fill="white"/>
  <g transform="translate(212.5, 117) scale(8.2)">
    <path d="M42.3355 91.4999C43.8355 72.4999 45.8355 40.5 38.8355 33.5C31.8355 26.5 11.1273 41.1744 4.33557 35C-1.16442 30 10.3202 3.00001 38.8355 3C60.8356 2.99999 69.8355 20 69.8355 32C69.8355 49.2627 56.8355 59 44.0874 61C19.8355 64.8048 13.8355 48 12.8355 46"
      stroke="url(#g1)" stroke-width="6" stroke-linecap="round"/>
  </g>
  <defs>
    <linearGradient id="g1" x1="36.4183" y1="2.97708" x2="36.4183" y2="91.4999" gradientUnits="userSpaceOnUse">
      <stop stop-color="#458FD0"/>
      <stop offset="1" stop-color="#07F2DF"/>
    </linearGradient>
  </defs>
</svg>`;

// SVG for Android adaptive icon - transparent bg, logo centered in 1536x1536 safe zone
const svgAdaptiveIcon = `<svg width="1536" height="1536" viewBox="0 0 1536 1536" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(468.5, 429) scale(8.2)">
    <path d="M42.3355 91.4999C43.8355 72.4999 45.8355 40.5 38.8355 33.5C31.8355 26.5 11.1273 41.1744 4.33557 35C-1.16442 30 10.3202 3.00001 38.8355 3C60.8356 2.99999 69.8355 20 69.8355 32C69.8355 49.2627 56.8355 59 44.0874 61C19.8355 64.8048 13.8355 48 12.8355 46"
      stroke="url(#g2)" stroke-width="6" stroke-linecap="round"/>
  </g>
  <defs>
    <linearGradient id="g2" x1="36.4183" y1="2.97708" x2="36.4183" y2="91.4999" gradientUnits="userSpaceOnUse">
      <stop stop-color="#458FD0"/>
      <stop offset="1" stop-color="#07F2DF"/>
    </linearGradient>
  </defs>
</svg>`;

function renderSvgToPng(svgString, outputPath, size) {
  const resvg = new Resvg(svgString, {
    fitTo: { mode: 'width', value: size },
    font: { loadSystemFonts: false },
  });
  const pngData = resvg.render();
  const pngBuffer = pngData.asPng();
  fs.writeFileSync(outputPath, pngBuffer);
  const stat = fs.statSync(outputPath);
  console.log(`✅ ${path.basename(outputPath)}: ${size}x${size} (${(stat.size / 1024).toFixed(1)} KB)`);
}

console.log('🎨 Generating app icons from SVG...\n');
renderSvgToPng(svgAppIcon, path.join(ASSETS_DIR, 'app-icon.png'), 1024);
renderSvgToPng(svgAdaptiveIcon, path.join(ASSETS_DIR, 'adaptive-icon.png'), 1536);
console.log('\n🎉 Done! Icons saved to assets/images/');
