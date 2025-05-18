// lib/azure/queueService.ts
import { ServiceBusClient } from "@azure/service-bus";

const connectionString = process.env.AZURE_SERVICE_BUS_CONNECTION_STRING!;
const queueName = "leiden-jobs";

const sbClient = new ServiceBusClient(connectionString);
const sender = sbClient.createSender(queueName);

export async function sendJobMessage(job: any) {
  const message = {
    body: job,
    contentType: "application/json",
  };
  await sender.sendMessages(message);
}
