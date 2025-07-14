const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building static React app...');

// Clean up
if (fs.existsSync('dist')) {
  fs.rmSync('dist', { recursive: true });
}

// Create minimal package.json for static build
const staticPackage = {
  "name": "love-tank-static",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.12",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.17",
    "typescript": "5.6.3",
    "vite": "^5.4.19"
  }
};

// Create static vite config
const staticViteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})`;

// Create static directory structure
fs.mkdirSync('static-src', { recursive: true });
fs.writeFileSync('static-package.json', JSON.stringify(staticPackage, null, 2));
fs.writeFileSync('static-vite.config.js', staticViteConfig);

console.log('✅ Static build configuration created');
console.log('📁 Use static-package.json and static-vite.config.js for deployment');