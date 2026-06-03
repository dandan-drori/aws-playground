import express from 'express';
import { MongoClient } from 'mongodb';

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

app.post('/users', async (req, res) => {
    try {
        const usersCollection = db.collection('users_collection');
        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const newUser = { name: req.body.name, email: req.body.email };
        const result = await usersCollection.insertOne(newUser);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create user' });
    }
});

app.get('/users', async (req, res) => {
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