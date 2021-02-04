import Client from './client';

import { config as loadEnv } from 'dotenv';

loadEnv();

const client = new Client();
const token = process.env.BOT_TOKEN as string;

(async () => {
	await client.build(token);
	await client.loadCommands();
	await client.loadEvents();
})();
