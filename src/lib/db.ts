import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

let docClient: DynamoDBDocumentClient | null = null;

// Initialize the DynamoDB client only if we're in a production environment
// or if we have the necessary AWS credentials
try {
  if (process.env.NODE_ENV === 'production' || process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID) {
    const client = new DynamoDBClient({
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY || ''
      }
    });

    docClient = DynamoDBDocumentClient.from(client);
  }
} catch (error) {
  console.warn('Failed to initialize DynamoDB client:', error);
}

export { docClient };