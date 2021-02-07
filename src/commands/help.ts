import { Command } from '../utils/types';

const HelpCommand: Command = {
    name: 'help',
    description: 'Lists a list of the commands',
    
    callback: async (message, args, bot) => {
        const readCommands = async function () {
            const embed = await bot.createEmbed({
                author: {
                    name: `Help Menu | ${bot.user?.username}`,
                    iconURL: bot.user?.displayAvatarURL()
                },
                footer: {
                    text: message.author.username,
                    iconURL: message.author.displayAvatarURL({ dynamic: true })
                }
            }, message);
            const commands = bot.commands.map((cmd) => `**Command:** ${cmd.name}\n**Description:** ${cmd.description}\n **Usage:** \`es.${cmd.name}\`\n`).join('\n');
            embed.setDescription(`${commands}`)

            message.channel.send(embed);
        }
        readCommands();
    }
}

export default HelpCommand;