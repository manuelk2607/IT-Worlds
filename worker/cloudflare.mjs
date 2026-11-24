import { WorkerEntrypoint } from 'cloudflare:workers';
import worker from './index.ts';
import { reportITWorldsMigrationReceipts } from './worlds-receipts.ts';

export default worker;

export class MigrationReceiptDelivery extends WorkerEntrypoint {
  async deliver() {
    const result = await reportITWorldsMigrationReceipts(this.env);
    if (!result) throw new Error('IT-Worlds migration receipt signing is unavailable');
    return result;
  }
}
