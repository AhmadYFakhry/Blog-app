const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const requireLogin = require('../middleware/authenticate');
const keys = require('../config/keys');

AWS.config.update({
    accessKeyId: keys.s3_access_id,
    secretAccessKey: keys.s3_secret,
    region: 'ca-central-1' //requires you to select a region
})


module.exports = app => {
    app.get('/api/upload', requireLogin, (req, res) => {
        const s3 = new AWS.S3()
        const fileName = `${req.user.id}/${uuid()}.jpeg`;
        const s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Expires: 500,
            ContentType: 'image/*',
            ACL: 'public-read'
        };
        s3.getSignedUrl('putObject', s3Params, (err, url) => {
            if (err) {
                console.log(err);
            }
            res.send({ fileName, url })
        })
    })
};