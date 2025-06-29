
### Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SeekHub_Demo_web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_BACKEND_URL=http://127.0.0.1:8000
   ```
   For production, replace with your actual backend URL.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.

## 🎨 UI Customization Guide

### Main Application Structure

The main application logic is located in `src/App.jsx`. This file contains:
- State management for text input/output
- Translation API integration
- Main UI components
- Inline styling definitions

### Styling Architecture

The project uses a hybrid styling approach:

#### 1. **Inline Styles (Primary)**
Located in `src/App.jsx` at the bottom of the file:
```javascript
const styles = {
  page: { maxWidth: 700, margin:"40px auto", fontFamily:"sans-serif", padding: "0 16px" },
  h1: { fontSize:"1.6rem", marginBottom:16 },
  textarea: { width:"100%", height:160, padding:10, fontSize:"1rem", lineHeight:1.4, marginBottom:12 },
  btn: { padding:"10px 24px", fontSize:"1rem", cursor:"pointer", background:"#146FF5", color:"#fff", border:"none", borderRadius:4 },
  btnDisabled: { padding:"10px 24px", fontSize:"1rem", background:"#7ca7f7", color:"#fff", border:"none", borderRadius:4 },
  err: { color:"#c00", marginBottom:12 }
};
```

**To modify the main UI styles:**
- Edit the `styles` object in `src/App.jsx`
- Changes will apply immediately to the main application components

#### 2. **Global CSS Files**
- `src/index.css`: Global styles, CSS custom properties, and theme definitions
- `src/App.css`: Component-specific styles (currently minimal usage)

**To modify global styles:**
- Edit `src/index.css` for theme colors, typography, and global element styles
- Edit `src/App.css` for component-specific styling

### Key UI Components

#### Main Layout (`src/App.jsx`)
- **Page Container**: Centered layout with max-width and responsive padding
- **Header**: Application title "EN → 中文 Translator"
- **Input Textarea**: English text input area
- **Translate Button**: Primary action button with loading states
- **Output Textarea**: Read-only Chinese translation display
- **Error Display**: Error message container

### Customization Examples

#### Changing Colors
```javascript
// In src/App.jsx, modify the styles object:
const styles = {
  btn: { 
    // ... existing properties
    background: "#your-color-here", // Change button color
    color: "#your-text-color" 
  }
};
```

#### Modifying Layout
```javascript
// In src/App.jsx, modify the page style:
const styles = {
  page: { 
    maxWidth: 900, // Increase max width
    margin: "20px auto", // Adjust margins
    padding: "0 24px" // Adjust padding
  }
};
```

#### Updating Typography
```css
/* In src/index.css, modify global font settings */
:root {
  font-family: 'Your-Font', system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.6;
  font-weight: 400;
}
```

### Responsive Design

The application is built with responsive design principles:
- Uses relative units (rem, %, vh/vw)
- Flexible layouts with max-width constraints
- Mobile-friendly padding and spacing

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint for code quality
- `npm run preview` - Preview production build locally

## 🌐 Deployment

The application is configured for deployment on Vercel:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables should be configured in your deployment platform

## 📁 Project Structure

```
SeekHub_Demo_web/
├── src/
│   ├── App.jsx          # Main application component
│   ├── App.css          # Component-specific styles
│   ├── index.css        # Global styles and theme
│   ├── main.jsx         # Application entry point
│   └── assets/          # Static assets
├── public/              # Public assets
├── package.json         # Dependencies and scripts
├── vite.config.js       # Vite configuration
└── README.md           # This file
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is part of the SeekHub Demo and is intended for demonstration purposes.

---

For questions or support, please refer to the project documentation or contact the development team.
