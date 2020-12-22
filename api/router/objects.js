const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const Object = require('../models/object');

router.get('/', (req, res, next) => {
    Object.find()
      .exec()
      .then(docs => {
        console.log("Database output for getting all objects ", docs);
        res.status(200).json({docs});
      })
      .catch(err => {
          console.log("An error occured ", err);
          res.status(500).json({
              message: "An error occured"
          });
      });
})

router.get('/:objectId', (req, res, next) => {
    const id = req.params.objectId;
    //find by custom name
    Object.findById(id)
      .exec()
      .then(doc => {
          console.log("#######################################################");
          console.log("####################Database Output####################", doc);
          if (doc) {
            res.status(200).json(doc);
          } else {
              res.status(404).json({
                  message: "No valid ID"
              });
          }
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              message: "An error occured" + err
          });
      })
})

router.delete('/', (req, res, next) => {
    res.status(200).json({
        message: 'okeytooo'
    });
})


router.post('/:userId', (req, res, next) => {
    const object = new Object({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.object_id,
        target_group: req.body.target_group,
        description: req.body.description,
        class_number: req.body.class_number
    });
    object.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Object saved with this id: ' + result._id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'An error occured!' + err
        });
    });
})



module.exports = router