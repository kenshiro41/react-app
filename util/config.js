let baseUrl = 'localhost:7890';
if (process.env.NODE_ENV === 'production') {
  baseUrl = 'api.ken41.com';
}

const s3Url = 'https://go-app-bucket.s3.us-east-2.amazonaws.com';

export { baseUrl, s3Url };
