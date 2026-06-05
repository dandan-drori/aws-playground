import express from 'express';
import { MongoClient } from 'mongodb';
import { body, validationResult } from 'express-validator';
import sanitize from 'mongo-sanitize';

const PORT = 8080;
const app = express();

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/users';

const client = new MongoClient(mongoURI);

let db;

async function connectToDB() {
  try {
    await client.connect();
    console.log('Successfully connected to MongoDB!');

    db = client.db(process.env.MONGO_DB || 'users');
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  }
}

connectToDB();

app.use(express.json());
app.use(express.static('public'));

app.post(
  '/api/users',
  [
    // 1. Sanitize against NoSQL injection first by ensuring inputs are treated as strings
    (req, res, next) => {
      req.body = sanitize(req.body);
      next();
    },

    // 2. Validate and Sanitize the NAME
    body('name').trim().notEmpty().withMessage('Name is required').escape(), // Converts characters like < and > into &lt; and &gt;

    // 3. Validate and Sanitize the EMAIL
    body('email')
      .trim()
      .isEmail()
      .withMessage('Please provide a valid email address')
      .normalizeEmail(), // Converts to lowercase, removes accidental dots in Gmail, etc.
  ],
  async (req, res, next) => {
    // Check if express-validator found any issues (e.g., invalid email)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const usersCollection = db.collection('users_collection');
      const { name, email } = req.body;
      const result = await usersCollection.insertOne({ name, email });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  },
);

app.get('/api/users', async (req, res) => {
  try {
    const usersCollection = db.collection('users_collection');
    const users = await usersCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
