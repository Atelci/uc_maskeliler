const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {exec, spawn} = require('child_process');


const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '.') + '__' + file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter});


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
    Object.findById(id)
      .exec()
      .then(doc => {
          console.log("Database output: ", doc);
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

router.post('/upload', upload.single('objectImage'), (req, res, next) => {
    exec("python /root/yolo-3-image.py /root/uc_maskeliler/uploads/" + req.file.filename, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            console.log(`error2: ${stderr}`);
        }
        console.log(`output: ${stdout}`);
        res.status(200).json({
            message: req.file.filename
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