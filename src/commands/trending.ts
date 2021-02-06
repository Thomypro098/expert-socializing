import { Command } from '../utils/types';
import { MessageEmbed } from 'discord.js'
const YTS = require('yt-trending-scraper');

const YTrendingCommand: Command = {
    name: 'trending',

    callback: async (message, args, bot) => {
        const eEmbed = new MessageEmbed()
            .setTitle('No Arguments Defined')
            .setAuthor(
                message.guild?.name,
                bot.user?.displayAvatarURL()
            )
            .setDescription('Please use ISO2 country codes.\nYou may find the list [here](http://www.fao.org/countryprofiles/iso3list/en/)')
            .setFooter(message.author.username, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp()

        let i = 1;

        if (!args[0]) return message.channel.send(eEmbed)

        const embed = new MessageEmbed()
            .setTitle(`Top 3 ${args[0].toUpperCase()} Youtube Trendings`)
            .setAuthor(
                message.guild?.name,
                bot.user?.displayAvatarURL()
            )
            .setFooter(
                message.author.username,
                message.author.displayAvatarURL({ dynamic: true })
            )

        YTS.scrape_trending_page(args[0].toUpperCase(), true).then(async (data: any) => {
            const videos = data.slice(0, 3)
            for (const vid of videos) {
                embed.addFields(
                    [
                        {
                            name: `Video #${i++}`,
                            value: `**Title:** ${vid.title}\n**Author:** [${vid.author}](https://www.youtube.com/channel/${vid.authorId})\n**Video:** [Video Link](https://www.youtube.com/watch?v=${vid.videoId})\n**Views:** ${vid.viewCount}\n`,
                        }
                    ]
                )
            }
            
            message.channel.send(embed);
        }).catch((err: any) => console.error(err))
    }
}

export default YTrendingCommand;