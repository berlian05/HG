import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { level, message } = req.body;
    const timestamp = new Date().toISOString();
    const logEntry = `${timestamp} - ${level.toUpperCase()} - ${message}\n`;
    
    const logPath = path.join(process.cwd(), 'frontend.log');
    fs.appendFileSync(logPath, logEntry);
    
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error writing log:', error);
    res.status(500).json({ error: 'Failed to write log' });
  }
} 