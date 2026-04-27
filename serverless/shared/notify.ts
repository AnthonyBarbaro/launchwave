import { SendEmailCommand, SESClient } from '@aws-sdk/client-ses';
import { putItem } from './dynamodb';

let sesClient: SESClient | null = null;

function getSesClient() {
  if (!sesClient) {
    sesClient = new SESClient({
      region: process.env.AWS_REGION || 'us-east-1'
    });
  }

  return sesClient;
}

export async function sendSlackNotification(text: string) {
  if (!process.env.SLACK_WEBHOOK_URL) return;

  await fetch(process.env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
}

export async function sendLeadEmail(subject: string, text: string) {
  if (!process.env.SES_FROM_EMAIL || !process.env.LEAD_NOTIFY_EMAIL) return;

  await getSesClient().send(
    new SendEmailCommand({
      Source: process.env.SES_FROM_EMAIL,
      Destination: {
        ToAddresses: [process.env.LEAD_NOTIFY_EMAIL]
      },
      Message: {
        Subject: { Data: subject },
        Body: {
          Text: { Data: text }
        }
      }
    })
  );
}

export async function storeLead(item: Record<string, unknown>) {
  await putItem(process.env.DYNAMODB_LEADS_TABLE, item);
}

export async function notifyLead(subject: string, lead: Record<string, unknown>) {
  const text = Object.entries(lead)
    .map(([key, value]) => `${key}: ${typeof value === 'object' ? JSON.stringify(value) : String(value)}`)
    .join('\n');

  await Promise.allSettled([
    storeLead(lead),
    sendLeadEmail(subject, text),
    sendSlackNotification(`*${subject}*\n${text}`)
  ]);
}
