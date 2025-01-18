// lib/applicationService.ts
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "./db";

export async function saveApplication(application: any) {
  if (!docClient) {
    throw new Error('DynamoDB client not initialized');
  }

  const command = new PutCommand({
    TableName: "JobApplications",
    Item: {
      id: Date.now().toString(),
      ...application,
      submittedAt: new Date().toISOString(),
    },
  });

  try {
    const response = await docClient.send(command);
    return response;
  } catch (error) {
    console.error("Error saving application:", error);
    throw error; // Propagate error to be handled by the component
  }
}