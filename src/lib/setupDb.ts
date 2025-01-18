// lib/setupDb.ts
import { DynamoDBClient, CreateTableCommand, ListTablesCommand, DescribeTableCommand } from "@aws-sdk/client-dynamodb";

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

export async function setupJobApplicationsTable() {
  try {
    // First check if table exists
    const listTablesCommand = new ListTablesCommand({});
    const tables = await client.send(listTablesCommand);
    
    if (tables.TableNames?.includes("JobApplications")) {
      console.log("JobApplications table already exists");
      return;
    }

    // Create table if it doesn't exist
    const createTableCommand = new CreateTableCommand({
      TableName: "JobApplications",
      AttributeDefinitions: [
        {
          AttributeName: "id",
          AttributeType: "S"
        }
      ],
      KeySchema: [
        {
          AttributeName: "id",
          KeyType: "HASH"
        }
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
      }
    });

    await client.send(createTableCommand);
    console.log("JobApplications table created successfully");

    // Wait for table to be active
    let tableActive = false;
    while (!tableActive) {
      const describeTableCommand = new DescribeTableCommand({
        TableName: "JobApplications"
      });
      const tableDescription = await client.send(describeTableCommand);
      if (tableDescription.Table?.TableStatus === "ACTIVE") {
        tableActive = true;
      } else {
        await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before checking again
      }
    }
    console.log("JobApplications table is now active and ready to use");

  } catch (error) {
    console.error("Error setting up DynamoDB table:", error);
    throw error;
  }
}