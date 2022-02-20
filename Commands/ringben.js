const { Client, Message, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const talkedRecently = new Set();
module.exports = {

    name: 'ringben',
    description: 'Call Ben the talking dog',
    data : new SlashCommandBuilder()
        .setName('ringben')
        .setDescription('Call Ben the talking dog'),

    /**
     * 
     * @param {Client} bot 
     * @param {Message} message 
     * @param {*} args 
     */
    async execute(bot, message, args){

        message.reply('Testing!')
    },

    /**
     * 
     * @param {Client} bot
     * @param {Message} message 
     * @param {CommandInteraction} interaction 
     */
    async slashexecute(bot, interaction, message) {
        let filter = m => m.author.id === interaction.author.id
        const benemoji = bot.emojis.cache.get("943990643867406376")
        interaction.reply({content: `${benemoji}: Ben?`})
            interaction.channel.awaitMessages(filter, {
                max: 1,
                time: 30000,
                errors: ['time']
                  })
            .then(message =>{
            message = message.first()
            if (message.content.toUpperCase() == 'TEST' || message.content.toUpperCase() == 'T') {
                message.channel.send(`hi am ben`)
            }
          })
    }
}