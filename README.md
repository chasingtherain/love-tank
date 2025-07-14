# love-tank

# Love Tank - Static React Application

A simple, visual way to measure and reflect on your relationship's emotional strength through daily actions based on the five love languages.

## Features

- **Visual Love Tank**: See your relationship score with an animated tank that fills based on your actions
- **Daily Actions**: Make deposits (+1) for positive moments, withdrawals (-5) for challenges
- **Local Storage**: All data is saved in your browser - no server required
- **Responsive Design**: Works perfectly on mobile and desktop
- **Transaction History**: Track your recent relationship activities

## How to Use

1. **Get Started**: Enter your name and email to create your account
2. **Make Deposits**: Click "Make Deposit (+1)" for positive relationship moments
3. **Make Withdrawals**: Click "Make Withdrawal (-5)" when facing challenges
4. **Track Progress**: Watch your love tank fill or empty based on your actions

## Relationship Status Levels

- **Thriving** (80+): Your relationship is flourishing
- **Healthy** (60-79): Good connection with room for growth
- **Needs Attention** (40-59): Focus on positive interactions
- **Critical** (Below 40): Prioritize relationship repair

## Deployment

This is a **static HTML file** that can be deployed to any hosting service:

### GitHub Pages
1. Upload `index.html` to your repository
2. Enable GitHub Pages in repository settings
3. Your app will be live at `username.github.io/repo-name`

### Netlify
1. Drag and drop `index.html` to Netlify
2. Instantly deployed with custom domain support

### Vercel
1. Upload `index.html` to Vercel
2. Automatic deployment with global CDN

### Any Web Server
Simply upload `index.html` to any web hosting service - it's a single file with no dependencies!

## Technical Details

- **Framework**: React 18 via CDN (no build process needed)
- **Styling**: Vanilla CSS with modern design
- **Storage**: Browser localStorage for data persistence
- **Size**: Single HTML file (~15KB)
- **Dependencies**: None (uses React CDN)

## File Structure

```
/
├── index.html          # Complete application (deploy this file)
├── app.js             # React source code (reference only)
└── README.md          # This documentation
```

## Data Storage

All data is stored locally in your browser using localStorage:
- User profile (name, email)
- Love tank score
- Transaction history

**Note**: Data is device-specific. To sync across devices, you'll need to export/import or use a cloud storage solution.

## Browser Support

Works in all modern browsers that support:
- ES6 JavaScript features
- CSS Grid and Flexbox
- localStorage API

## License

MIT License - Feel free to use and modify as needed.

---

Built with ❤️ for measuring the moments that matter in your relationship.
