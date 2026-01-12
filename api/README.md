# Socratic AI API

This will be our backend API for the Socratic learning system.

## Setup

1. Install dependencies:
```bash
npm init -y
npm install express cors dotenv openai
npm install -D @types/node @types/express ts-node typescript nodemon
```

2. Create tsconfig.json:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

3. Add to package.json scripts:
```json
{
  "scripts": {
    "start": "node dist/server.js",
    "dev": "nodemon src/server.ts",
    "build": "tsc"
  }
}
```

## Environment Variables

Create a `.env` file:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001
FRONTEND_URL=http://localhost:3000
```

## API Endpoints

- `POST /api/chat/send` - Send message to AI tutor
- `GET /api/chat/history/:userId/:course/:unit` - Get chat history
- `POST /api/users/session` - Create/get user session
