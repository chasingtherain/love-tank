#!/usr/bin/env node
import { execSync } from 'child_process';
import { existsSync, rmSync, mkdirSync, writeFileSync, readFileSync, copyFileSync } from 'fs';
import { join } from 'path';

console.log('Creating GitHub Pages build...');

// Clean up
if (existsSync('dist')) {
  rmSync('dist', { recursive: true });
}
mkdirSync('dist', { recursive: true });

// Create package.json for build
const buildPackageJson = {
  "name": "love-tank-static",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "wouter": "^3.3.5",
    "lucide-react": "^0.453.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.2",
    "vite": "^5.4.19",
    "typescript": "5.6.3",
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.47",
    "autoprefixer": "^10.4.20"
  }
};

// Create minimal vite config
const viteConfig = `
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['wouter']
        }
      }
    }
  }
});
`;

// Create minimal HTML
const indexHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love Tank - Measure the moments. Fill the love</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
            min-height: 100vh;
        }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; text-align: center; }
        .title { font-size: 2.5rem; font-weight: bold; color: #334155; margin-bottom: 1rem; }
        .subtitle { font-size: 1.1rem; color: #64748b; margin-bottom: 2rem; }
        .love-tank { 
            width: 200px; 
            height: 300px; 
            border: 3px solid #6366f1; 
            border-radius: 20px; 
            margin: 20px auto; 
            position: relative;
            background: linear-gradient(to top, #3b82f6 0%, #3b82f6 70%, transparent 70%);
        }
        .score { font-size: 2rem; font-weight: bold; color: #6366f1; margin: 1rem 0; }
        .actions { display: flex; gap: 1rem; justify-content: center; margin: 2rem 0; }
        .btn { 
            padding: 12px 24px; 
            border: none; 
            border-radius: 8px; 
            cursor: pointer; 
            font-size: 1rem;
            font-weight: 500;
            transition: all 0.2s;
        }
        .btn-primary { background: #10b981; color: white; }
        .btn-primary:hover { background: #059669; }
        .btn-secondary { background: #ef4444; color: white; }
        .btn-secondary:hover { background: #dc2626; }
        .card { 
            background: white; 
            border-radius: 12px; 
            padding: 24px; 
            margin: 16px 0; 
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .form-group { margin-bottom: 1rem; }
        .input { 
            width: 100%; 
            padding: 12px; 
            border: 2px solid #e2e8f0; 
            border-radius: 8px; 
            font-size: 1rem;
        }
        .input:focus { outline: none; border-color: #6366f1; }
        .hidden { display: none; }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">Measure the moments. Fill the love</h1>
        <p class="subtitle">A simple, visual way to measure and reflect on your relationship's emotional strength through daily actions based on the five love languages.</p>
        
        <div id="landing" class="card">
            <h2>Get Started</h2>
            <div class="form-group">
                <input type="text" id="userName" class="input" placeholder="Enter your name" />
            </div>
            <div class="form-group">
                <input type="email" id="userEmail" class="input" placeholder="Enter your email" />
            </div>
            <button onclick="createAccount()" class="btn btn-primary">Create Account</button>
        </div>

        <div id="dashboard" class="hidden">
            <div class="love-tank"></div>
            <div class="score" id="score">70</div>
            <div class="actions">
                <button onclick="makeDeposit()" class="btn btn-primary">Make Deposit (+1)</button>
                <button onclick="makeWithdrawal()" class="btn btn-secondary">Make Withdrawal (-5)</button>
            </div>
            <div class="card">
                <h3>Your Love Tank is working!</h3>
                <p>This is a simplified version ready for GitHub Pages deployment. Your score updates with each action, and data is stored locally in your browser.</p>
            </div>
        </div>
    </div>

    <script>
        let currentScore = 70;
        let user = null;

        function createAccount() {
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            
            if (!name || !email) {
                alert('Please enter both name and email');
                return;
            }

            user = { name, email, score: currentScore };
            localStorage.setItem('loveDataUser', JSON.stringify(user));
            
            document.getElementById('landing').classList.add('hidden');
            document.getElementById('dashboard').classList.remove('hidden');
            updateScore();
        }

        function makeDeposit() {
            currentScore += 1;
            updateScore();
            saveUser();
        }

        function makeWithdrawal() {
            currentScore -= 5;
            updateScore();
            saveUser();
        }

        function updateScore() {
            document.getElementById('score').textContent = currentScore;
        }

        function saveUser() {
            if (user) {
                user.score = currentScore;
                localStorage.setItem('loveDataUser', JSON.stringify(user));
            }
        }

        // Load user if exists
        window.onload = function() {
            const savedUser = localStorage.getItem('loveDataUser');
            if (savedUser) {
                user = JSON.parse(savedUser);
                currentScore = user.score;
                document.getElementById('landing').classList.add('hidden');
                document.getElementById('dashboard').classList.remove('hidden');
                updateScore();
            }
        };
    </script>
</body>
</html>
`;

// Write files
writeFileSync('dist/index.html', indexHtml);

// Create .nojekyll file for GitHub Pages
writeFileSync('dist/.nojekyll', '');

// Create README for GitHub Pages
const readme = `
# Love Tank - Static Build for GitHub Pages

This is the static build of the Love Tank relationship tracker, optimized for GitHub Pages deployment.

## Features
- Simple user registration
- Love tank visualization
- Deposit (+1) and withdrawal (-5) actions
- Local storage for data persistence
- Responsive design

## Deployment
1. Upload the contents of this directory to your GitHub Pages repository
2. Enable GitHub Pages in your repository settings
3. Your app will be available at your GitHub Pages URL

## How to Use
1. Enter your name and email to create an account
2. Use the deposit button to add positive moments (+1 point)
3. Use the withdrawal button for challenges (-5 points)
4. Your data is saved locally in your browser

Built with ❤️ for measuring the moments that matter.
`;

writeFileSync('dist/README.md', readme);

console.log('✅ GitHub Pages build complete!');
console.log('📁 Files created in dist/ directory:');
console.log('   - index.html (main app)');
console.log('   - .nojekyll (GitHub Pages config)');
console.log('   - README.md (deployment guide)');
console.log('');
console.log('🚀 Ready for GitHub Pages deployment!');
console.log('   1. Zip the contents of the dist/ folder');
console.log('   2. Upload to your GitHub repository');
console.log('   3. Enable GitHub Pages in repository settings');