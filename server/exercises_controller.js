import * as exercises from './exercises_model.js';
import express from 'express';

const PORT = 3000;

const app = express();

app.use(express.json());

/**
 * Create a new exercise
 */
app.post('/exercises', (req, res) => {
    exercises
        .createExercise(
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )
        .then((exercise) => {
            res.status(201).json(exercise);
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

/**
 * Retrieve all exercises.
 */
app.get('/exercises', (req, res) => {
    let filter = {};
    // Is there a query parameter named year? If so add a filter based on its value.
    exercises
        .findExercises(filter, '', 0)
        .then((exercises) => {
            res.status(200).send(exercises);
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ error: 'Request failed' });
        });
});

/**
 * Update the exercise whose id is provided in the path parameter and set
 * its properties
 */
app.put('/exercises/:_id', (req, res) => {
    exercises
        .replaceExercise(
            req.params._id,
            req.body.name,
            req.body.reps,
            req.body.weight,
            req.body.unit,
            req.body.date
        )
        .then((numUpdated) => {
            if (numUpdated === 1) {
                res.status(200).json({
                    _id: req.params._id,
                    name: req.body.name,
                    reps: req.body.reps,
                    weight: req.body.weight,
                    unit: req.body.unit,
                    date: req.body.date,
                });
            } else {
                res.status(500).json({ error: 'Request failed' });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

/**
 * Delete the exercdise whose id is provided in the query parameters
 */
app.delete('/exercises/:_id', (req, res) => {
    exercises
        .deleteById(req.params._id)
        .then((deletedCount) => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(500).json({ Error: 'Resource not found' });
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).json({ Error: 'Request failed' });
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
