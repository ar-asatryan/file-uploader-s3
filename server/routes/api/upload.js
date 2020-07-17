const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'bucket-for-upload-aroray';
const IAM_USER_KEY = 'AKIA3CRMZHKPQZO4BX45';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log('error in callback');
        console.log(err);
      }
      console.log('success');
      console.log(data);
    });
  });
}

module.exports = (app) => {
  // The following is an example of making file upload
  
  app.post('/api/upload', function (req, res, next) {
    // This grabs the additional parameters so in this case passing in
    // "element1" with a value.
    const element1 = req.body.element1;

    var busboy = new Busboy({ headers: req.headers });

    // The file upload has completed
    busboy.on('finish', function() {
      console.log('Upload finished');

      const file = req.files.element2;
      console.log(file);

      // Begins the upload to the AWS S3
      uploadToS3(file);
    });

    req.pipe(busboy);
  });
}
