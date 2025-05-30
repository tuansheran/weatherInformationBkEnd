import express from 'express';
import { getWeatherData } from './weatherService';

const app = express();
const PORT = 3000;

app.get('/weather', async (_req, res) => {
  try {
    const weather = await getWeatherData();
    res.json({ List: weather });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not retrieve weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}/weather`);
});
