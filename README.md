# RankingProject

A fullstack real-time leaderboard and points-claiming application. Users can register, claim random points, and view a live-updating leaderboard. Built with Node.js, Express, MongoDB, React, and Socket.io.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Backend](#backend)
  - [Setup & Installation](#backend-setup--installation)
  - [Environment Variables](#backend-environment-variables)
  - [API Endpoints](#backend-api-endpoints)
- [Frontend](#frontend)
  - [Setup & Installation](#frontend-setup--installation)
  - [Main Components](#frontend-main-components)
- [How It Works](#how-it-works)
- [Contributing](#contributing)
- [License](#license)

---

## Features
- User registration and selection
- Claim random points (1-10) per user
- Real-time leaderboard updates (Socket.io)
- Paginated claim history per user
- Modern, responsive UI (React + MUI + Tailwind)

---

## Project Structure
```
RankingProject/
  Backend/      # Node.js, Express, MongoDB API
  Frontend/     # React, Vite, Socket.io-client UI
```

---

## Backend

### Backend Setup & Installation
1. `cd Backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `Backend/` with:
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=3000
   # Optional: CORS_ORIGIN=http://localhost:5173
   ```
4. Start the server:
   ```bash
   node index.js
   ```
   The backend runs on [http://localhost:3000](http://localhost:3000)

### Backend Environment Variables
- `MONGO_URI` (required): MongoDB connection string
- `PORT` (optional): Port for backend (default: 3000)
- `CORS_ORIGIN` (optional): Allowed frontend origins (comma-separated)

### Backend API Endpoints
| Method | Endpoint                  | Description                        |
|--------|---------------------------|------------------------------------|
| POST   | `/api/create`             | Register a new user                |
| GET    | `/api/users`              | Get all users                      |
| GET    | `/api/leaderboard`        | Get ranked leaderboard             |
| POST   | `/api/claim/:userId`      | Claim random points for user       |
| GET    | `/api/history/:userId`    | Get paginated claim history        |

#### Example: Claim Points
```bash
POST /api/claim/USER_ID
```
Response:
```json
{
  "message": "Points claimed successfully",
  "user": { "_id": "...", "username": "...", "totalPoints": 42 },
  "pointsClaimed": 7
}
```

#### Data Models
- **User**: `{ name: String, totalPoints: Number }`
- **ClaimHistory**: `{ userId, userName, pointsClaimed, totalPoints, createdAt }`

---

## Frontend

### Frontend Setup & Installation
1. `cd Frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend runs on [http://localhost:5173](http://localhost:5173)

### Frontend Main Components
- **UserSelect**: Select or add a user
- **ClaimButton**: Claim random points for the selected user
- **Leaderboard**: View real-time ranked leaderboard
- **ClaimHistory**: Paginated history of claims for the selected user
- **HomePage**: (Optional) Home/landing page

---

## How It Works
- Users are created and selected via the UI.
- Claiming points triggers a backend API call, which updates the user's points and logs the claim.
- The backend emits real-time leaderboard updates via Socket.io to all connected clients.
- The frontend displays the leaderboard, claim history, and allows new claims.

---

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## License
[ISC](./Backend/package.json) 