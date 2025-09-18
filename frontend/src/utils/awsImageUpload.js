import AWS from "aws-sdk";

async function awsImageUpload(file) {

    console.log(file);
    
    const S3_BUCKET = import.meta.env.VITE_AWS_BUCKET_NAME;
    const REGION = import.meta.env.VITE_AWS_REGION;

    AWS.config.update({
      accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY,
      secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });
    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: `${Date.now()}-${file.name}`,
      ContentType: file.type,
    };
    try {
      const uploadResult = await s3
        .upload(params)
        // .on("httpUploadProgress", (evt) => {
        //   console.log(
        //     "Uploaded :: " + parseInt((evt.loaded * 100) / evt.total) + "%"
        //   );
        // })
        .promise();

        return uploadResult.Location;
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Error uploading file. Please try again.");
    } 
}

export default awsImageUpload;