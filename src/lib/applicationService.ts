import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "./db";

export interface Application {
  jobId: string;
  name: string;
  email: string;
  phone?: string;
  experience: string;
  resumeName?: string;
  resumeData?: string | null;
}

export async function saveApplication(application: Application) {
  // In development without DynamoDB, simulate success
  if (process.env.NODE_ENV === 'development' && !docClient) {
    console.log('Development mode: Simulating application save:', application);
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }

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
    throw error;
  }
}