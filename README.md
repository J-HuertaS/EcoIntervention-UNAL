# 🌱 Ecointervention UNAL

**Reflecting on how we consume** - An environmental awareness initiative at Universidad Nacional de Colombia

![Project Banner](https://img.shields.io/badge/UNAL-Environmental%20Project-green?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=for-the-badge&logo=tailwind-css)

## 📖 About

Ecointervention UNAL is a comprehensive web platform promoting responsible consumption and environmental awareness among university students. This project combines education, interactive activities, and community engagement to foster environmental consciousness at Universidad Nacional de Colombia.

### 🎯 Project Goals
- Address overconsumption patterns among university students
- Promote sustainable practices within the university community
- Collect and analyze environmental awareness data
- Build community engagement through interactive content

## ✨ Features

### 🏠 **Landing Page**
- Modern, responsive design
- Project overview and mission statement
- Call-to-action for survey participation

### 📊 **Statistics**
- Survey data visualization
- Environmental awareness metrics
- Manual data refresh (due to organization restrictions with data)

### 🎥 **Video Gallery**
- YouTube Shorts integration
- Vertical video player optimized for mobile
- Interview and workshop content
- Easy navigation between videos

### 🎯 **Interactive Trivia**
- Spinning wheel game (Trivia Crack style)
- 5 environmental categories:
  - 🔄 Recycling & Waste
  - 💧 Water Conservation
  - ⚡ Energy & Climate
  - 🌲 Nature & Wildlife
  - 🌍 Sustainable Living
- Educational explanations for each question
- Score tracking and performance analytics

### 💬 **Community Comments**
- Real-time comment system
- User engagement tracking
- Moderated community discussions

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel
- **Data**: CSV parsing and analysis

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for comments)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/J-HuertaS/EcoIntervention-UNAL.git
   cd ecointervention-unal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a \`.env.local\` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_SURVEY_URL=https://forms.google.com/your-survey-link
   ```

4. **Set up the database**
   - Create a Supabase project
   - Run the SQL script from `scripts/create-comments-table.sql`
   - Copy your project URL and anon key to `.env.local`

5. **Add your survey data**
   - Download CSV from Google Forms/Sheets
   - Replace `public/data/ECOWEEK.csv` with your data

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Data Management

### Survey Data Updates
The project uses a manual CSV update system that works reliably with organizational restrictions:

1. **Download** latest CSV from Google Sheets
2. **Replace** \`public/data/ECOWEEK.csv\` with new file
3. **Refresh** the website to see updated statistics

### CSV Format
Your CSV should include these columns:
- Timestamp
- Consent
- Recycling Frequency
- Transportation Method
- Water Conservation Practices
- Eco-friendly Payment Willingness
- Environmental Issues
- Container Bringing Willingness
- Justification

## 🎥 Adding Videos

### YouTube Shorts Integration
Add videos to the `videos` array in `components/video-player.tsx`:

```javascript
{
  id: 2,
  title: "Your Video Title",
  description: "Video description",
  youtubeUrl: "https://youtube.com/shorts/YOUR_VIDEO_ID",
  thumbnail: "https://img.youtube.com/vi/YOUR_VIDEO_ID/maxresdefault.jpg",
  type: "workshop", // or "interview"
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard

3. **Deploy**
   - Vercel automatically builds and deploys
   - Your site will be live at `https://your-project.vercel.app`

### Environment Variables for Production
Add these in your Vercel dashboard:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_SURVEY_URL`

## 📁 Project Structure

```
ecointervention-unal/
├── app/
│   ├── layout.tsx              # App layout
│   ├── page.tsx                # Main page
│   └── globals.css             # Global styles
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── comment-section.tsx     # Comments system
│   ├── video-player.tsx        # Video gallery
│   └── enhanced-trivia.tsx     # Trivia game
├── lib/
│   ├── csv-parser.ts           # Data analysis
│   ├── supabase.ts             # Database client
│   └── utils.ts                # Utility functions
├── public/
│   └── data/
│       └── ECOWEEK.csv         # Survey data
├── scripts/
│   └── create-comments-table.sql # Database setup
└── README.md
```

## 🤝 Contributing

This is an academic project for Universidad Nacional de Colombia. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is part of the Intensive English I course with Professor Martin Suarez at Universidad Nacional de Colombia.

## 👥 Team

- **Course**: Intensive English I
- **Professor**: Martin Suarez
- **Institution**: Universidad Nacional de Colombia
- **Project Type**: Environmental Awareness Initiative

## 📞 Support

If you encounter any issues:

1. Check the [Issues](https://github.com/yourusername/ecointervention-unal/issues) page
2. Create a new issue with detailed description
3. Include screenshots and error messages

## 🙏 Acknowledgments

- Universidad Nacional de Colombia
- Professor Martin Suarez
- All survey participants
- Environmental awareness community

---

**Made with 💚 for a sustainable future at UNAL**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/J-HuertaS/EcoIntervention-UNAL)

