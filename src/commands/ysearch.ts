import { Command } from '../utils/types';
import Discord = require('discord.js');
import yts = require('yt-search')

const YSearchCommand: Command = {
	name: 'ysearch',

	callback: async (message, args, bot) => {
        const embed = await bot.createEmbed({
            title: 'Top Video Search Results',
            author: {
                name: message.author.tag,
                iconURL: message.author.displayAvatarURL({ dynamic: true }),
            },
            footer: {
                text: ''
            }
        }, message)

        let i = 1;

        if (!args) return message.channel.send('Please inlude what you want to search for.')
        const r = await yts(`${args}`)
        const videos = r.videos.slice(0, 6)
        videos.forEach(async function (v) {
            embed.addField(
                `Video #${i++}`,
                `**Title:** ${String(v.title)} (${v.timestamp})\n**Author**: (${v.author.name})\n**Views**: ${String(v.views)}`, true
            );
        })
        message.channel.send(embed)
	}
};

export default YSearchCommand;
