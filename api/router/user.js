const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/user');
const Upload = require('../models/upload');

router.get('/', (req, res, next) => {
    User.find({}, 'userName')
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

router.get('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    Upload.find({userId: userId})
      .select('status fileName fileType')
      .exec()
      .then(docs => {
        console.log("Database output: ", docs);
        if (docs.length > 0) {
          var filePath;
          for (var doc of docs) {
            if (doc.status == 'Processing...') {
              doc.fileName = "";
            } else {
              filePath = '/images/';
              if (doc.fileType === 'video') {
                filePath = '/videos/';
              }
              doc.fileName = filePath + doc.fileName
            }
          }
          res.status(200).json(docs);
        } else {
          res.status(404).json({
          message: "No valid user id"
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

})



module.exports = router