# 🎯 Coding Interview Tracker

A React-based application to track your progress through 28 DSA patterns with 300+ coding problems.

## 🚀 Quick Start (After System Restart)

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Running the Application

1. **Open Terminal/Command Prompt**

2. **Navigate to the project directory:**
   ```bash
   cd /Users/abhiramirajeev/Desktop/coding-interview-tracker
   ```

3. **Install dependencies (only needed first time or after system restart):**
   ```bash
   npm install
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser and go to:**
   ```
   http://localhost:5175
   ```
   (Port might be different - check terminal output)

## 📱 Your Data is Safe!

✅ **Your progress is automatically saved in browser localStorage**
- All completed/pending problem status
- No data loss on system restart
- Works offline

## 🛠️ Available Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies (after restart/fresh clone)
npm install
```

## 🎯 Features

- ✅ 28 DSA Patterns (Two Pointers, Sliding Window, DP, etc.)
- ✅ 300+ Problems with direct links
- ✅ Complete/Pending toggle
- ✅ Random problem generator (from completed problems only)
- ✅ Pattern-specific filtering
- ✅ Search functionality
- ✅ Progress tracking with visual indicators
- ✅ Responsive design (mobile-friendly)
- ✅ LocalStorage persistence
- ✅ Reset progress option

## 🔧 Troubleshooting

### If you get "command not found: npm"
Install Node.js from: https://nodejs.org/

### If port is already in use
The app will automatically find an available port (5173, 5174, 5175, etc.)

### If dependencies are missing
Run: `npm install`

### If you want to reset everything
Delete the `node_modules` folder and run `npm install` again

## 📁 Project Structure

```
coding-interview-tracker/
├── src/
│   ├── components/          # React components
│   ├── data/               # Problem data (28 patterns)
│   ├── App.jsx             # Main app component
│   └── *.css               # Styling files
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 💡 Tips

1. **Bookmark the localhost URL** for quick access
2. **Your progress persists** across browser sessions
3. **Use the random generator** to practice completed problems
4. **Filter by difficulty** to focus on specific levels
5. **Search problems** by name for quick access

---

**Happy Coding! 🚀**
