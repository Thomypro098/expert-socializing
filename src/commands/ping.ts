import { Command } from '../utils/types';

const PingCommand: Command = {
	name: 'ping',
    
	callback: async (message, args, bot) => {
		await message.reply('yo');
	}
};

export default PingCommand;
