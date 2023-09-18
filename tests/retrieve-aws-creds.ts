// require('dotenv').config();
// import * as AWS from 'aws-sdk';
//
// AWS.config.update({
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//     region: process.env.AWS_DEFAULT_REGION
// });
//
// //Initialize client for AWS Secrets Manager
// const client = new AWS.SecretsManager();
//
// //Provide the name of aws secret created in AWS Secrets Manager
// const secretName = 'aws-secrets-moviedb';
//
// //Function to retrieve and return secrets for further usage
// export async function getSecrets() {
//     try {
//         //Retrieve the values for AWS secrets
//         const data = await client.getSecretValue({SecretId: secretName}).promise();
//
//         if ('SecretString' in data) {
//             //Parse and extract the secret values
//             const secret = JSON.parse(<string>data.SecretString);
//             const username = secret.MOVIEDB_USERNAME;
//             const password = secret.MOVIEDB_PASSWORD;
//
//             return {username, password};
//         } else {
//             throw new Error('SecretString is not found in response');
//         }
//     } catch (err) {
//         console.error(`Error retrieving secrets: ${err}`);
//         throw err;
//     }
// }
