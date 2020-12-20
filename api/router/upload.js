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
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({storage: storage, fileFilter: fileFilter});

router.post('/image', upload.single('objectImage'), (req, res, next) => {
    const documentId = new mongoose.Types.ObjectId();
    const upload = new Upload({
        _id: documentId,
        userId: req.body.userId,
        status: "Processing...",
        fileName: req.file.filename,
        fileType: "image"
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
      Upload.updateOne({_id: documentId}, {status: "Completed"})
        .exec()
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log(err);
        });
    })
})

router.post('/video', upload.single('objectVideo'), (req, res, next) => {
    const documentId = new mongoose.Types.ObjectId();
    const upload = new Upload({
        _id: documentId,
        userId: req.body.userId,
        status: "Processing...",
        fileName: req.file.filename,
        fileType: "video"
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

    exec("python3 /root/oraas/uc_maskeliler/scripts/yolo-3-video.py " + req.file.filename + " " + req.body.className, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      }
      if (stderr) {
        console.log(`error2: ${stderr}`);
      }
      console.log(`output: ${stdout}`);
      Upload.updateOne({_id: documentId}, {status: "Completed"})
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
      .then(doc => {
        console.log("Database output: ", doc);
        if (doc.status === 'Completed') {
          if (doc.fileType === 'image') {
            const filePath = "/root/public/images/";
          }
          const filePath = "/root/public/videos/";
          res.status(200).sendFile(filePath + doc.fileName);
        } else {
          res.status(200).json({
          message: 'Processing'
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