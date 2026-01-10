# Leads Tracker

A Chrome extension to save and organize URLs/leads into customizable groups. Built as part of a Scrimba course project with additional enhancements.

## Features

- **Save URLs manually** - Type a URL and click "SAVE INPUT" to add it to your current group
- **Save current tab** - Click "SAVE TAB" to instantly save the active browser tab's URL
- **Organize with groups** - Create custom groups to categorize your leads (e.g., "Work", "Shopping", "Research")
- **Remove individual links** - Click the ✕ button next to any link to remove it
- **Persistent storage** - All leads are saved to localStorage and persist across sessions
- **Delete all** - Double-click "DELETE ALL" to clear all data

## Getting Started

Install the dependencies and run the project:

```bash
npm install
npm start
```

### Load as Chrome Extension

1. Build the project or use the development files
2. Open Chrome and go to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the project folder
5. The extension will appear in your toolbar

## Tech Stack

- HTML, CSS, JavaScript
- Vite (build tool)
- Chrome Extensions API (Manifest V3)
- Font Awesome icons
- localStorage for data persistence

Head over to https://vitejs.dev/ to learn more about configuring Vite.

---

## About Scrimba

This project was built following a Scrimba course and extended with additional features like lead groups and individual link removal.

The Fullstack Developer Path aims to teach everything you need to become a Junior Developer, or you could take a deep-dive with one of our advanced courses 🚀

- [Our courses](https://scrimba.com/courses)
- [The Frontend Career Path](https://scrimba.com/fullstack-path-c0fullstack)
- [Become a Scrimba Pro member](https://scrimba.com/pricing)

Happy Coding!