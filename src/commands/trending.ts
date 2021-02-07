import { Command } from '../utils/types';
import { MessageEmbed } from 'discord.js';
// @ts-ignore
import YTS from 'yt-trending-scraper';
const YTrendingCommand: Command = {
	name: 'trending',
	description: 'Show the trending youtube videos',

	callback: async (message, args, bot) => {
		const eEmbed = await bot.createEmbed(
			{
				title: `No Arguments Defined`,
				description: `Please use ISO2 country codes.\nYou may find the list [here](http://www.fao.org/countryprofiles/iso3list/en/)`
			},
			message
		);

		let i = 1;

		if (!args[0]) return message.channel.send(eEmbed);

		const embed = await bot.createEmbed(
			{
				title: `Top 3 Trending Videos On ${args[0].toUpperCase()}`
			},
			message
		);

		YTS.scrape_trending_page(args[0].toUpperCase(), true)
			.then(async (data: any) => {
				const videos = data.slice(0, 3);
				for (const vid of videos) {
					embed.addFields([
						{
							name: `Video #${i++}`,
							value: `**Title:** ${vid.title}\n**Author:** [${vid.author}](https://www.youtube.com/channel/${vid.authorId})\n**Video:** [Video Link](https://www.youtube.com/watch?v=${vid.videoId})\n**Views:** ${vid.viewCount}\n`
						}
					]);
				}

				message.channel.send(embed);
			})
			.catch((err: any) => console.error(err));
	}
};

export default YTrendingCommand;
