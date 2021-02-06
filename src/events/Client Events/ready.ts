import { Event } from '../../utils/types';

import chalk = require ('chalk');

const readyEvent: Event = (client) => {
	client.user?.setActivity('over social media', {
		type: 'WATCHING'
	})
	client.logger.success(
		`Successfully logged in as ${chalk.cyanBright(`${client.user!.username}`)}`
	);
};

export default readyEvent;
