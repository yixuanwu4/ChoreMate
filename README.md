# ChoreMate

A lightweight fullstack app to track and visualize household chore efforts.

## Features

- Add chores with housework type, person and time slot
- Support for custom chore types with color tags
- Logs are stored in a local JSON file
- Fullstack project with React frontend + Express backend
- Simple, clean interface for clarity and comfort

## Project Structure (Core Overview)

This is a simplified view of the core structure:

```
ChoreMate/
├── frontend/       ← React + Vite frontend
│   └── src/components/  ← Form, Select, Table, etc.
├── backend/        ← Express backend
│   ├── data/       ← JSON storage
│   └── routes/     ← auth and chore logging endpoints
```

## Tech Stack

- Frontend: React + Vite
- Backend: Node.js + Express
- Storage: JSON file (houseworkslogs.json)
- Package Manager: pnpm

## Getting Started

1. Clone this repo:
```bash
   git clone https://github.com/yixuanwu4/ChoreMate.git
   cd ChoreMate
```

2. Install dependencies:
```bash
   cd backend
   pnpm install
   cd ../frontend
   pnpm install
```

3. Run the app:
   In one terminal:
  ```bash
     cd backend
     pnpm start   # runs on http://localhost:4001
  ```

   In another terminal:
  ```bash
     cd frontend
     pnpm dev     # opens on http://localhost:4002
  ```

## Future Improvements

- [ ] Dockerize backend and frontend
- [ ] Add user login/auth
- [ ] Weekly/monthly summaries
- [ ] Export/import logs
- [ ] Responsive UI for mobile

## License

MIT
