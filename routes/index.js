const express = require('express');
const router = express.Router();
const { projects } = require('../data/data.json');

/* GET Home Page. */
router.get('/', (req, res, next) => {
    // Pass all projects data to 'index' template
    res.render('index', { projects });
});

/* GET About Page. */
router.get('/about', (req, res, next) => {
    res.render('about');
});

/* GET generated error route - create and throw 500 server error */
router.get('/error', (req, res, next) => {
    
    // Log out custom error handler indication
    console.log('Custom error route called');
    
    const err = new Error();
    err.message = `Sorry, the server returned a 500 internal error.`
    err.status = 500;
    throw err;
  });

/* GET individual project page. */
router.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId); // the +projectId convert the value into a number

    if (project) {
        // Pass the project data to the 'project.pug' template
        res.render('project', { project });
    } else {
        console.log('404 error handler called');
        const err = new Error();
          err.status = 404;
          err.message = `Oops! It looks like the project you're looking for does not exist.`
          next(err);
    }
});
  


module.exports = router;