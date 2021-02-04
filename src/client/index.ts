import {
	Client,
	ClientOptions,
	Collection,
	ColorResolvable,
	Guild,
	Message,
	MessageEmbed,
	MessageEmbedAuthor,
	MessageEmbedFooter,
	MessageEmbedOptions
} from 'discord.js';

import consola, { Consola } from 'consola';
import { loadDirSync } from '../utils/functions';
import { sep, normalize } from 'path';
import { Command, Event } from '../utils/types';
class SocialClient extends Client {
	/* <---------------------------------- Methods ----------------------------------> */

	async getEmbedColor(
		guild: Guild,
		isError: boolean = false
	): Promise<ColorResolvable> {
		const me = guild.me!;
		const color: ColorResolvable = isError
			? '#FF000000'
			: me.displayHexColor !== '#000000'
			? me.displayHexColor
			: '#0000FF';
		return color;
	}

	/**
	 * @param eventsDir The directory to load the commands in
	 * @example await loadEvents("events")
	 */
	async loadEvents(eventsDir: string = 'events'): Promise<void> {}

	/**
	 * @param commandsDir The directory to load the commands in
	 * @example await loadCommands("cmds")
	 */
	async loadCommands(commandsDir: string = 'commands'): Promise<void> {
		const paths = await loadDirSync(commandsDir);
		for (const path of paths) {
			const commandFileName = normalize(path).split(sep).pop()!.split('.')[0];
			const commandFile: Command =
				(await import(path)).default || (await import(path));
			if (!commandFile) {
				this.logger.warn(
					`The command ${commandFileName} does not export a command object`
				);
				return;
			}
			if (!commandFile.name) {
				commandFile.name = commandFileName;
			}
			let names: string[] = [commandFile.name];
			const { aliases, commands, names: commandFileNames } = commandFile;
			if (aliases) names.concat(aliases);
			if (commands) names.concat(commands);
			if (commandFileNames) names.concat(commandFileNames);
			commandFile._names = names;
			let callbackCounter: number = 0;
			if (commandFile.execute) {
				commandFile._run = commandFile.execute;
				callbackCounter++;
			}
			if (commandFile.run) {
				commandFile._run = commandFile.run;
				callbackCounter++;
			}
			if (commandFile.callback) {
				commandFile._run = commandFile.callback;
				callbackCounter++;
			}
			if (callbackCounter > 1) {
				this.logger.warn(
					`The command "${commandFileName}" have more than 1 run function`
				);
				return;
			}
			this._commands.set(commandFile.name, commandFile);
			console.log(commandFile);
		}
	}

	/**
	 *
	 * @param data The data for the embed you want to create.
	 * @param message Used for designing purposes
	 * @param isError The name is pretty much descriptive
	 * @returns {Message} The message sent
	 */
	async sendEmbed(
		data: MessageEmbedOptions,
		message: Message,
		isError: boolean = false
	): Promise<Message> {
		const embed = await this.createEmbed(data, message, isError);
		const msg = await message.channel.send(embed);

		return msg;
	}

	/**
	 *
	 * @param data The data for the embed you want to create.
	 * @param message Used for designing purposes
	 * @param isError The name is pretty much descriptive
	 * @returns {MessageEmbed} The created embed
	 */
	async createEmbed(
		data: MessageEmbedOptions,
		message: Message,
		isError: boolean = false
	): Promise<MessageEmbed> {
		const embed: MessageEmbed = new MessageEmbed(data);

		if (!data.footer) {
			const footer: MessageEmbedFooter = {
				text: message.member!.displayName,
				iconURL: message.author.displayAvatarURL({ dynamic: true })
			};
			embed.setFooter(footer);
		}

		if (!data.color) {
			const color = await this.getEmbedColor(message.guild!, isError);
			embed.setColor(color);
		}

		if (!data.timestamp) {
			const timestamp = Date.now();
			embed.setTimestamp(timestamp);
		}

		if (!data.author) {
			const author: MessageEmbedAuthor = {
				name: message.guild!.name,
				iconURL:
					message.guild!.iconURL({ dynamic: true, format: 'png' }) ||
					this.user?.displayAvatarURL({ dynamic: true, format: 'png' })
			};
			embed.setAuthor(author);
		}

		return embed;
	}

	/**
	 * @returns {String} The token that u inserted
	 */
	async build(token: string): Promise<string> {
		return await super.login(token);
	}

	/* <---------------------------------- Properties ----------------------------------> */
	/* <----------------- Private Properties -----------------> */
	/* Contains all the commands in the client */
	private _commands: Collection<string, Command> = new Collection();
	/* Contains all the events in the client */
	private _events: Collection<string, Event> = new Collection();

	/* <----------------- Public Properties -----------------> */

	public logger: Consola = consola;

	public get commands(): Collection<string, Command> {
		return this._commands;
	}

	public get events(): Collection<string, Event> {
		return this._events;
	}

	/* <---------------------------------- Constructor ----------------------------------> */

	constructor(Options?: ClientOptions) {
		super(Options);
	}
}

export default SocialClient;
