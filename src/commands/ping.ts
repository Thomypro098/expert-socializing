import { Command } from '../utils/types';

import ms from 'pretty-ms';

const PingCommand: Command = {
	name: 'ping',

	callback: async (message, args, bot) => {
		const msg = await bot.sendEmbed({ title: 'Pinging...' }, message);

		const uptime = ms(Math.floor(bot.uptime!));

		const embed = await bot.createEmbed(
			{
				title: 'Pong :ping_pong: ',
				fields: [
					{
						name: 'API Latency:',
						value: `**\`\`${bot.ws.ping}\`\`**ms`
					},
					{
						name: 'Bot Latency:',
						value: `**\`\`${
							msg.createdTimestamp - message.createdTimestamp 
						}\`\`**ms`
					},
					{
						name: 'UPTime:',
						value: `**\`\`${uptime}\`\`**`
					}
				]
			},
			message
		);
		await msg.edit(embed)
	}
};

export default PingCommand;
