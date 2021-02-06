import { Command } from '../utils/types';
import ms from 'pretty-ms';

const PingCommand: Command = {
	name: 'ping',

	callback: async (message, args, bot) => {
		const embed = await bot.createEmbed({
			author: {
				name: message.guild?.name,
				iconURL: bot.user?.displayAvatarURL()
			},
			title: 'Pinging...'
		}, message);

		message.channel.send(embed).then(async (resultMessage) => {
			const aPing = `${new Date().getTime() - message.createdTimestamp}` + 'ms';
			const APing = `${Math.round(bot.ws.ping)}` + 'ms';
			const bPing = `${resultMessage.createdTimestamp - message.createdTimestamp}` + 'ms';
			const uptime = ms(Math.floor(bot.uptime!))

			const rEmbed = await bot.createEmbed({
				author: {
					name: message.guild?.name,
					iconURL: bot.user?.displayAvatarURL()
				},
				title: '🏓 Pong 🏓',
				fields: [
					{
						name: 'Author Ping',
						value: aPing
					},
					{
						name: 'API Ping',
						value: APing
					},
					{
						name: 'Bot Ping',
						value: bPing
					},
					{
						name: 'Uptime',
						value: uptime
					}
				]
			}, message)
			resultMessage.edit(rEmbed);
		})
	}
};

export default PingCommand;
