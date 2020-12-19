const express = require('express');
const mongoose = require('mongoose');
const {exec} = require('child_process');
const multer = require('multer');

const router = express.Router();

const Upload = require('../models/upload');

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

router.post('/', upload.single('objectImage'), (req, res, next) => {
    const upload = new Upload({
        _id: new mongoose.Types.ObjectId(),
        userId: req.body.userId,
        status: "Processing...",
        fileName: req.file.filename,
    });
    upload.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Image Processing Started for' + result.userId,
            detection_id: result._id
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: 'An error occured!' + err
        });
    });

    exec("python3 /root/oraas/uc_maskeliler/scripts/yolo-3-image.py " + req.file.filename + " " + req.body.className, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`error2: ${stderr}`);
      }
      console.log(`output: ${stdout}`);
      Upload.updateOne({userId: req.body.userId}, {status: "Completed"})
        .exec()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    })
})

router.get('/:detectionId', (req, res, next) => {
    const detectionId = req.params.detectionId;
    Upload.findById(detectionId)
      .exec()
      .then(document => {
        console.log("Database output: ", document);
        if (document.length > 0) {
          if (doc.status === 'Completed') {
            const imagePath = "/root/images/";
            res.status(200).sendFile(imagePath + doc.fileName);
          } else {
            res.status(200).json({
            message: 'Processing'
            });
          }
        } else {
            res.status(404).json({
                message: "No valid detection id"
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

module.exports = router