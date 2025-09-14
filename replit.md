# นิทรรศการศิลปะออนไลน์ (Online Art Exhibition)

## Overview
A complete responsive Thai art exhibition website built with pure HTML, CSS, and JavaScript. The site allows visitors to browse artworks across 5 categories and provides admin functionality for managing the gallery collection.

## Project Structure
```
├── index.html          # Homepage with auto-sliding carousel
├── about.html          # About Us page with creator info and Instagram link
├── gallery.html        # Main gallery with categorized artworks
├── artwork.html        # Individual artwork detail view
├── add.html           # Admin page for adding new artworks
├── admin.html         # Admin panel for managing existing artworks
├── style.css          # Complete responsive styling
├── script.js          # All JavaScript functionality
├── simple_server.py   # Python HTTP server for development
├── server.py          # Alternative server (not currently used)
└── replit.md          # This documentation file
```

## Features Implemented
### Homepage (index.html)
- ✅ Auto-sliding carousel showcasing 5 best artworks
- ✅ 3-second interval auto-advance with manual navigation
- ✅ Responsive design with Thai typography
- ✅ Navigation to all sections

### Gallery System (gallery.html)
- ✅ 5 art categories with 40 placeholder artworks each:
  - แผ่นพับ อาชีพทัศนศิลป์ (Educational Leaflets)
  - Pop-up (Pop-up Art)  
  - ประติมากรรม (Sculpture)
  - Cubism Art
  - Thai Pop Art
- ✅ Category filtering buttons
- ✅ Search functionality by title, artist, or category
- ✅ Responsive grid layout with hover effects

### Artwork Details (artwork.html)
- ✅ Large image display
- ✅ Complete artwork information (title, artist, concept, category)
- ✅ Back navigation to gallery
- ✅ URL parameter-based artwork loading

### Admin Features
#### Add Artwork (add.html)
- ✅ Password protection (admin password: `muxdir]skPADMIN111`)
- ✅ Complete artwork upload form with image conversion to base64
- ✅ Category selection dropdown
- ✅ Image preview functionality
- ✅ localStorage persistence

#### Admin Management (admin.html)
- ✅ Same password protection system
- ✅ Display all artworks with admin controls
- ✅ Edit artwork functionality (in-place modal editing)
- ✅ Delete confirmation system
- ✅ Search and filter in admin view
- ✅ Export data functionality

### About Us Page (about.html)
- ✅ Creator information section for Y.R.C. 309
- ✅ Instagram link button: https://www.instagram.com/y.r.c._309?igsh=MXF3eGgwdnY1dDhm
- ✅ Vision and mission sections
- ✅ Art category descriptions

## Technical Implementation
### Frontend
- **Pure HTML5, CSS3, JavaScript** - No external frameworks
- **Thai fonts**: Prompt and Sarabun via Google Fonts
- **Dark theme** with gold (#FFD700) accent colors
- **Responsive design** for desktop and mobile
- **localStorage** for artwork persistence
- **Base64 image encoding** for uploaded artworks

### Backend
- **Python HTTP server** serving static files
- **Cache-Control headers** to prevent browser caching issues
- **CORS-friendly** configuration for development

### Data Management
- **localStorage** as primary data store
- **JSON serialization** for artwork objects
- **Automatic data initialization** with 200 placeholder artworks
- **Export/import** functionality for data backup

## Admin Access
- **Password**: `muxdir]skPADMIN111`
- **Pages**: `/add.html` and `/admin.html`
- **Session-based authentication** (valid for browser session)

## User Preferences
- **Language**: Thai (ไทย) throughout interface
- **Theme**: Dark background with gold accents
- **Typography**: Thai-friendly fonts for readability
- **Mobile-first**: Responsive design prioritizing mobile experience

## Recent Changes
- **2025-09-13**: Complete website implementation
- **Fixed**: JavaScript UTF-8 encoding issue with Thai characters
- **Added**: All required functionality per specifications
- **Tested**: Full workflow with server deployment

## Current State
- **Status**: Fully functional and deployed
- **Server**: Running on port 5000 via Python HTTP server
- **Data**: 200 sample artworks across 5 categories
- **Features**: All requirements implemented and tested

## Next Steps (Optional Enhancements)
- Add image compression for better performance
- Implement advanced search with more filters
- Add visitor analytics for artwork views
- Create artwork rating system
- Add social media sharing functionality
- Implement proper backend authentication system
- Add artwork image optimization
- Create mobile app version