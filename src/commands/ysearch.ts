import { Command } from '../utils/types';
import Discord = require('discord.js');
import yts = require('yt-search')

const YSearchCommand: Command = {
	name: 'ysearch',

	callback: async (message, args, bot) => {
        const embed = new Discord.MessageEmbed()
            .setAuthor('Top video search results');

        if (!args) {
            return message.channel.send('Please inlude what you want to search for.')
        } else {
            const r = await yts(`${args}`)
            const videos = r.videos.slice(0, 3)
            videos.forEach(async function (v) {
                embed.addField('Video', `${String(v.title)} (${v.timestamp})\nViews: ${String(v.views)}`, true);
            })
            message.channel.send(embed)
        }
	}
};

export default YSearchCommand;
