const express = require('express');
const router = express.Router();
const passport = require('passport');

const Essay = require('../../models/Essay');
const validateEssayInput = require('../../validation/essays');

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Essay.find({ author: req.user }).lean()
    .populate({ path: 'reviews', select: 'text', populate: { path: 'reviewer', select: 'firstName lastName'} })
    .then(essays => res.json(essays))
    .catch(err => res.status(404).json({ noessaysfound: 'No essays found' }));
});

router.get('/reviewables', passport.authenticate('jwt', { session: false }), (req, res) => {
  Essay.find({ category: { $in: req.user.expertiseCategories } }).lean()
    .populate({ path: 'author', select: 'firstName lastName' })
    .populate({ path: 'category', select: 'name' })
    .then(essays => res.json(essays))
    .catch(err => res.status(404).json({ noessaysfound: 'No essays found' }));
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Essay.findOne({ $or: [{ _id: req.params.id, author: req.user }, { _id: req.params.id, category: { $in: req.user.expertiseCategories } }] }).lean()
    .populate({ path: 'author', select: 'firstName lastName' })
    .populate({ path: 'category', select: 'name' })
    .populate({ path: 'reviews', select: 'text', populate: { path: 'reviewer', select: 'firstName lastName'} })
    .then(essay => res.json(essay))
    .catch(err => res.status(404).json({ noessayfound: 'No essay found with that ID' }));
});

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEssayInput(req.body);

  if (!isValid) return res.status(400).json(errors);

  const newEssay = new Essay({
    subject: req.body.subject,
    theme: req.body.theme,
    body: req.body.body,
    author: req.user.id,
    category: req.body.category,
    reviews: []
  });

  newEssay.save().then(essay => res.json(essay));
});

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Essay.findOneAndDelete({ _id: req.params.id, author: req.user })
    .then(essay => res.json(essay))
    .catch(err => res.status(404).json({ noessayfound: 'No essay found with that ID' }));
});

module.exports = router;