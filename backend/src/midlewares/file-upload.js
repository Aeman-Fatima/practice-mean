const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();

aws.config.update({
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    accessKeyId: process.env.ACCESS_KEY_ID,
    region: 'us-east-1' //E.g us-east-1
});

const s3 = new aws.S3();

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Wrong file type, only upload JPEG and/or PNG !'),
            false);
    }
};

const upload = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        acl: 'public-read',
        s3,
        bucket: 'postpractice1233',
        key: function (req, file, cb) {
            console.log(file)
            req.file = req.user;
            cb(null, req.user.toString());
        }
    })
});

deleteImage = (Key) => {
    s3.deleteObject({ Bucket: 'postpractice1233', Key }, (err, data) => {
        console.error(err);
        console.log(data);
    });
}

module.exports = {
    upload,
    deleteImage
};
