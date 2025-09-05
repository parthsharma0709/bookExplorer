# Book Explorer

A full-stack web application to explore books with search, filters, and detailed views.

---

## Project Structure
bookExplorer/
├─ frontend/ # React app
├─ backend/ # Node.js/Express server
├─ scraper/ # Book scraper scripts
├─ README.md


---

## Prerequisites

- Node.js >= 18.x  
- npm or yarn  
- MongoDB (local or cloud)

---

## 1. Installing Dependencies

### Backend
```bash
cd backend
npm install

Frontend
cd frontend
npm install

Scraper
cd scraper
npm install

2. Setting up Environment Variables

Create a .env file in the backend folder:

MONGODB_URI=your_mongodb_connection_string
PORT=3000


Make sure .env is in .gitignore to avoid exposing sensitive credentials.

3. Running the Scraper

To fetch and store books in the database:

cd scraper
node scraper.js
Or trigger via backend API:

POST http://localhost:3000/api/books/refresh
4. Starting the Backend
cd backend
npm run dev


Server will start on: http://localhost:3000

5. Launching the Frontend
cd frontend
npm run dev


React app will run on: http://localhost:5173 (or the port shown in console)

Features:

Responsive grid of books (4 per row on large screens)

Search by title

Filters: rating, availability, price range

Detailed modal view on book click
