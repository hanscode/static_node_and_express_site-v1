const express = require('express');

// Instantiate Express app
const app = express();

// Import route definitions
const mainRoutes = require('./routes');

// Static middleware for serving static files
app.use('/static', express.static('public'));

// view engine setup
app.set('view engine', 'pug');

//Use route definitions
app.use(mainRoutes);

/* ERROR HANDLERS */
/* 404 handler to catch undefined or non-existent route requests */
app.use((req, res, next) => {
    console.log('404 error handler called');
    res.status(404).render('page-not-found');
  });
  
  /* Global error handler */
  app.use((err, req, res, next) => {
  
    /* Handle errors caught the route handlers
      - If the error status is 404:
          * Set the response status to 404
          * Render the 'page-not-found' view and pass the error object to the view
      - Else:
          * Set the error message to the given message, or specify a general, 
            default error message
          * Set response status to the given error status OR, 
            set it to 500 by default if no error status is set
          * Render the 'error' view, passing it the error object
    */
    if (err.status === 404) {
      res.status(404).render('page-not-found', { err });
    } else {
      err.message = err.message || `Oops!  It looks like something went wrong on the server.`;
      res.status(err.status || 500).render('error', { err });
    }
  });

  module.exports = app;