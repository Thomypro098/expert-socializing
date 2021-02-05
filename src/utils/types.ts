import { BitFieldResolvable, Message, PermissionString } from 'discord.js';
import SocialClient from '../client';

export type CommandPermissions = BitFieldResolvable<PermissionString>[];

export type CommandExecuteFn = (
	message: Message,
	args: string[],
	client: SocialClient
) => Promise<any | void> | any | void;

export type Command = {
	/* The command main name     */
	name?: string;
	/* The command description */
	description?: string;

	run?: CommandExecuteFn;
	execute?: CommandExecuteFn;
	callback?: CommandExecuteFn;

	aliases?: string[];
	commands?: string[];
	names?: string[];

	reqPerms?: CommandPermissions;

	guildOwnerOnly?: CommandPermissions;
	devOnly?: CommandPermissions;

	_names?: string[];
	_run?: CommandExecuteFn;
};

export type Event = (
	client: SocialClient,
	...args: any[]
) => Promise<any | void> | any | void;
