// lib/db.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { setupJobApplicationsTable } from './setupDb';

if (!process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID || !process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials not found in environment variables');
}

const client = new DynamoDBClient({
  region: "us-east-1", // or your preferred region
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
  },
});

export const docClient = DynamoDBDocumentClient.from(client);

// Initialize the database table
setupJobApplicationsTable()
  .then(() => console.log('Database setup completed'))
 