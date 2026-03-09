import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pool from './db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'Fitlocal API is running optimally.' });
});

/* pool.query('SELECT NOW()', (err, res) => {
  if (err){
    console.error('Error connecting to the database',err.stack);
  }else {
    console.log('Connected to Database successfully at:', res.rows[0].now);
  }
}) */

app.get('/api/gyms', async (req, res)=>{
  try {
    const result=await pool.query('SELECT id, name, address, ST_AsGeoJSON(location)::json as location FROM gyms');
    res.status(200).json(result.rows);
  }catch (err){
    console.error('Error fetching gyms:',err);
    res.status(500).json({ error: 'Failed to fetch gyms from the database.'});
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});