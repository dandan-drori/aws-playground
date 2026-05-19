import express from 'express';

const PORT = 80;

const app = express();

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});