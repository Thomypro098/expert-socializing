import { Message } from 'discord.js';
import SocialClient from '../../client';
import { Event } from '../../utils/types';

const messageEvent: Event = async (client: SocialClient, message: Message) => {
	const prefix = (process.env.BOT_PREFIX as string).toLowerCase();

	const content = message.content.toLowerCase();

	if (message.author.bot || !content.startsWith(prefix)) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/g);

	const commandName = args.shift()!.toLowerCase();

	const command =
		client.commands.get(commandName) ||
		client.commands.find(
			(cmd) => cmd._names! && cmd._names.includes(commandName)
		)!;
	if (!command) {
		return await client.sendEmbed(
			{
				title: 'Error 404',
				description: `Command "${commandName}" not found!`
			},
			message,
			true
		);
	}
	if (command.devOnly && !client.developers.includes(message.author.id)) {
		return await client.sendEmbed(
			{
				title: 'Access Denied',
				description:
					'In order to use this command you need to be one of the bot developers'
			},
			message,
			true
		);
	}
	const owner = await message.guild!.members.fetch(message.guild!.ownerID);
	if (command.guildOwnerOnly && message.member!.id !== owner.id) {
		return await client.sendEmbed(
			{
				title: 'Access Denied',
				description: `In order to use this command you need to be **${
					message.guild!.name
				}**'s owner`
			},
			message,
			true
		);
	}
	if (!message.member!.permissions.has(command.reqPerms!)) {
		return await client.sendEmbed(
			{
				title: 'Permission Error',
				description: `In order to use this command you must have the following permission${
					command.reqPerms!.length === 1 ? '' : 's'
				}: \`\`${command.reqPerms!.join(', ')}\`\``
			},
			message,
			true
		);
	}
	try {
		await command._run!(message, args, client);
	} catch (ada) {
		const err = ada as Error;
		await client.sendEmbed(
			{
				title: 'Error Occured',
				description: `This was not supposed to happen, Please report it to the bot developers`
			},
			message,
			true
		);
		await client.logger.error(err);
	}
};

export default messageEvent;
