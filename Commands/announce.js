const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
var Discord = require('discord.js')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { message } = require('noblox.js');
const talkedRecently = new Set();
const wait = require('util').promisify(setTimeout);
var rbxbot = require('noblox.js')
var config = require(`../config.json`)

module.exports = {

    name: 'announce',
    description: "announce stuff",
    data : new SlashCommandBuilder()
        .setName('announce')
        .setDescription("announce stuff")
        .addStringOption(option => option.setName('title').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('description').setDescription('Enter a string').setRequired(true)),

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

        if (interaction.member.roles.cache.has("945101739101667348")) {
        }
        else interaction.reply('You dont have permission to do this command')

        const anemoji = bot.emojis.cache.get('937317874870145044')
        const textstuff = interaction.options.getString("title");
        const textstuff2 = interaction.options.getString("description");
        const user = interaction.user

        const embed = new Discord.MessageEmbed()
        .setAuthor(`FCL ANNOUNCEMENT`)
        .setTitle(textstuff)
        .setDescription(textstuff2)
        .setFooter({
            text: "Football Confederation League",
            url: "https://www.roblox.com/groups/11542963/[FCL]-FootballConfederationLeague#!/about",
            iconURL: "https://i.ibb.co/Btt4LD4/fcllogo.png"
            })
        .setTimestamp()
        .setColor(0x005BFF)

        const scoutc = bot.channels.cache.get('933008446155006002');

        await scoutc.send({embeds : [embed]})
        await interaction.reply({
            content: '``Announcement sent!``:white_check_mark:',
            ephemeral: true,
         })



    }
}