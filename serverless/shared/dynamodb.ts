import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';

let documentClient: DynamoDBDocumentClient | null = null;

function getClient() {
  if (!documentClient) {
    documentClient = DynamoDBDocumentClient.from(
      new DynamoDBClient({
        region: process.env.AWS_REGION || 'us-east-1'
      })
    );
  }

  return documentClient;
}

export async function putItem(tableName: string | undefined, item: Record<string, unknown>) {
  if (!tableName) return;

  await getClient().send(
    new PutCommand({
      TableName: tableName,
      Item: {
        ...item,
        id: item.id || `${Date.now()}-${Math.random().toString(36).slice(2)}`,
        createdAt: item.createdAt || new Date().toISOString()
      }
    })
  );
}
