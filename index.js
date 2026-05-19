import {express} from 'express';

const app = express();

app.use(express.static('public'));

app.listen(8080, () => {
    console.log('Server is running on port 8080');
});