import {Pool} from 'pg';
import dotenv from 'dotenv';
import { connect } from 'node:http2';
import e from 'express';
dotenv.config();
const pool=new Pool({
    connectionString: process.env.DATABASE_URL,
});
export default pool;