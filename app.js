const express = require('express');
const app = express();
const mainRoutes = require('./routes');

app.use(mainRoutes);

// view engine setup
app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(mainRoutes);

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});