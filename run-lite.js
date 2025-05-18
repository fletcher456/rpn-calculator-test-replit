import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5500;

// Serve static files from the root directory
app.use(express.static(__dirname));

// Route all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Lite calculator server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} in your browser to view the calculator`);
});