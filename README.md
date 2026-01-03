# Amazon Product Scraper

A full-stack web application that scrapes product data from Amazon.in using keywords. Built with React frontend and Node.js/Puppeteer backend.

## Features

- 🔍 **Keyword Search**: Search for products using any keyword
- 📦 **Product Data Extraction**: Extracts title, price, rating, image, and product link
- 💾 **MongoDB Storage**: Saves scraped products to database
- ⚡ **Real-time Results**: View scraped products instantly
- 🎨 **Modern UI**: Clean, responsive interface with dark mode support

## Tech Stack

### Frontend
- React 18 + TypeScript
- Vite (Build tool)
- Tailwind CSS
- shadcn/ui components
- React Query

### Backend
- Node.js + Express
- Puppeteer (Web scraping)
- MongoDB + Mongoose
- CORS enabled

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB installed and running
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <YOUR_GIT_URL>
cd <YOUR_PROJECT_NAME>
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend/src
npm install
```

4. **Configure environment variables**

Create/update `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/amazon-scraper
PORT=5000
```

### Running the Application

1. **Start MongoDB**
```bash
mongod
```

2. **Start the backend server**
```bash
cd backend/src
npm start
```

3. **Start the frontend (in a new terminal)**
```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products/scrape/:keyword` | Scrape products by keyword |
| GET | `/api/products` | Get all saved products |

## Project Structure

```
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/              # Page components
│   ├── types/              # TypeScript types
│   └── hooks/              # Custom hooks
├── backend/
│   └── src/
│       ├── models/         # MongoDB models
│       ├── routes/         # API routes
│       ├── services/       # Scraping logic
│       └── config/         # Database config
└── public/                 # Static assets
```

## Usage

1. Enter a product keyword in the search bar
2. Click "Scrape Products" button
3. Wait for the scraper to fetch products from Amazon.in
4. View the scraped products with their details
5. Products are automatically saved to MongoDB

## Notes

- The scraper targets Amazon.in (India)
- Scraping may take 10-30 seconds depending on network speed
- Ensure your backend is running on port 5000
- For production, deploy the backend to a cloud service

## License

MIT License
