const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middleware/authenticate');
const keys = require('../config/keys');

const s3 = new AWS.S3({
    accessKeyId: keys.s3_access_id,
    secretAccessKey: keys.s3_secret,
    signatureVersion: 'v4', //new buckets only work with V4 on most regions
    region: 'ap-south-1' //requires you to select a region
});
module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const Key = `${req.user.id}/${uuid()}.jpeg`;
        s3.getSignedUrl('putObject', {
            Bucket: "fakhryah-blog-app",
            ContentType: "image/*",
            Key
        }, (err, url) => {
            if (err) {
                console.log(err);
            }
            res.send({ Key, url })
        })
    })
};