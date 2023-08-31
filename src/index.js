const express = require('express');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { authMiddleware } = require('./middlewares/authMiddleware');

const databaseName = 'cookstagram';

const routes = require('./routes');

const app = express();
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(authMiddleware);
app.use(routes);

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb://127.0.0.1:27017/${databaseName}`);

app.listen(3000, () => console.log('The server is listening on port 3000...'));