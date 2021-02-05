import { Event } from '../../utils/types';

import * as chalk from 'chalk';

const readyEvent: Event = (client) => {
	client.logger.success(
		`Successfully logged in as ${chalk.cyanBright(client.user!.username)}`
	);
};

export default readyEvent;
