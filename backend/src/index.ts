import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import pool from './db';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and connection rules
app.use(cors());
app.use(helmet());
app.use(express.json());

// --- 1. FORCE DATABASE CONNECTION TEST ---
pool.query('SELECT NOW()', (err, res) => {
  if (err){
    console.error('🚨 CRITICAL ERROR: Could not connect to PostgreSQL Database!', err.stack);
  } else {
    console.log('✅ Connected to PostgreSQL Database successfully at:', res.rows[0].now);
  }
});

// Your existing Gyms route
app.get('/api/gyms', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, name, address, ST_AsGeoJSON(location)::json as location FROM gyms');
    res.status(200).json(result.rows);
  } catch (err) {
    console.error('Error fetching gyms:', err);
    res.status(500).json({ error: 'Failed to fetch gyms.' });
  }
});

// --- 2. REGISTRATION ROUTE WITH TRACKER ---
app.post('/api/auth/register', async (req, res): Promise<any> => {
  // This line will print to your terminal the moment the app clicks the button!
  console.log("⚡ REGISTER ENDPOINT HIT! Incoming data:", req.body); 

  try {
    const { name, email, password } = req.body;

    const userExists = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );

    const token = jwt.sign(
      { id: newUser.rows[0].id }, 
      process.env.JWT_SECRET as string, 
      { expiresIn: '7d' }
    );

    console.log("✅ User successfully created in database!");
    res.status(201).json({ token, user: newUser.rows[0] });
  } catch (err) {
    console.error('🚨 Registration error:', err);
    res.status(500).json({ error: 'Server error during registration.' });
  }
});

app.post('/api/auth/login', async (req, res): Promise<any> => {
  // Keeping your login logic the same!
  try {
    const { email, password } = req.body;
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) return res.status(400).json({ error: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) return res.status(400).json({ error: 'Invalid email or password.' });

    const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });
    res.status(200).json({ token, user: { id: user.rows[0].id, name: user.rows[0].name, email: user.rows[0].email } });
  } catch (err) {
    res.status(500).json({ error: 'Server error during login.' });
  }
});

// --- 3. BIND TO ALL IPV4 NETWORKS ---
// Changing this ensures it listens properly to 127.0.0.1 on Windows
app.listen(Number(PORT), '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});