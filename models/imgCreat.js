const GridFsStorage = require('multer-gridfs-storage');
const multer = require('multer');
const dotenv = require('dotenv');
const crypto = require('crypto');
const path = require('path');

const config = dotenv.config().parsed;


const storage = new GridFsStorage({
    url: config.DB_URI, file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = file.originalname; //buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {filename: filename, bucketName: "uploads"};
                resolve(fileInfo);
            });
        });
    }
});


const upload = multer({storage});



module.exports = upload;