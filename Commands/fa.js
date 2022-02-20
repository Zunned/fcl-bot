const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
var Discord = require('discord.js')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { message } = require('noblox.js');
const talkedRecently = new Set();
const wait = require('util').promisify(setTimeout);
var rbxbot = require('noblox.js')
var config = require(`../config.json`)

module.exports = {

    name: 'fa',
    description: "Let people know you're a free agent",
    data : new SlashCommandBuilder()
        .setName('fa')
        .setDescription("Let people know you're a free agent")
        .addStringOption(option => option.setName('text').setDescription('Enter a string').setRequired(true)),

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
     * @param {CommandInteraction} interaction 
     */
    async slashexecute(bot, interaction) {

        if (interaction.member.roles.cache.has("933008436583620650")) {
        }
        else interaction.reply('You dont have permission to do this command')

        const textstuff = interaction.options.getString("text");
        const user = interaction.user

        const embed = new Discord.MessageEmbed()
        .setAuthor(interaction.member.nickname || user.tag, user.displayAvatarURL())
        .setDescription(textstuff)
        .setFooter({
            text: "Football Confederation League",
            url: "https://www.roblox.com/groups/11542963/[FCL]-FootballConfederationLeague#!/about",
            iconURL: "https://i.ibb.co/Btt4LD4/fcllogo.png"
            })
        .setTimestamp()
        .setColor(0x005BFF)

        const fac = bot.channels.cache.get('933008488471363584');

        await fac.send({embeds : [embed]})
        await interaction.reply({
            content: '``message sent! (dismiss this message)``',
            ephemeral: true,
         })



    }
}