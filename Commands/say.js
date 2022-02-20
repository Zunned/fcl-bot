const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
var Discord = require('discord.js')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { message } = require('noblox.js');
const talkedRecently = new Set();
const wait = require('util').promisify(setTimeout);
var rbxbot = require('noblox.js')
var config = require(`../config.json`)

module.exports = {

    name: 'say',
    description: 'Make bot say something',
    data : new SlashCommandBuilder()
        .setName('say')
        .setDescription('Make bot say something')
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

        if (interaction.member.roles.cache.has("933008424197820456")) {
        }
        else interaction.reply('You dont have permission to do this command')

        const textstuff = interaction.options.getString("text");
        await interaction.channel.send(textstuff)
        await interaction.reply({
            content: '``message sent! (dismiss this message)``',
            ephemeral: true,
         })



    }
}