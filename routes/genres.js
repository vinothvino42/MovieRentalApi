const express = require('express');
const router = express.Router();

const genres = [
    { id: 1, name: 'Horror' },
    { id: 2, name: 'Action' },
    { id: 3, name: 'Romance' }
];

router.get('/', (req, res) => {
    res.send(genres);
});

router.get('/:id', (req, res) => {
   const genre = genres.find(c => c.id === parseInt(req.params.id));
   if (!genre) return res.status(404).send('The genre with the given ID is not found');
   res.send(genre);
});

router.post('/', (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };
    genres.push(genre);
    res.send(genre);
});

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID is not found');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The genre with the given ID is not found');

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

function validateGenre(genre) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

module.exports = router;