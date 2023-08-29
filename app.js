const express = require('express')
const mongoose = require('mongoose');
const app = express();

(async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/instadb', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Successfully connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
})();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use(require('./router/auth'))

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
 