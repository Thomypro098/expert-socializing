import { Command } from '../utils/types';

const PingCommand: Command = {
	name: 'ping',
    async run(message, args, bot) {
//yo
    },
	callback: async (message, args, bot) => {
		await message.reply('yo');
	}
};

export default PingCommand;
