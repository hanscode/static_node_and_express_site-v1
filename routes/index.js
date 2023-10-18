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

/* GET project page. */
router.get('/projects/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId); // the +projectId convert the value into a number

    if (project) {
        // Pass the project data to the 'project.pug' template
        res.render('project', { project });
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;