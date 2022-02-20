const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
var Discord = require('discord.js')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { message } = require('noblox.js');
const talkedRecently = new Set();
const wait = require('util').promisify(setTimeout);
var rbxbot = require('noblox.js')
var config = require(`../config.json`)

module.exports = {

    name: 'rank',
    description: 'Rank players in group',
    data : new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Rank players in group')
        .addStringOption(option => option.setName('username').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('new_role').setDescription('Enter a string').setRequired(true)),

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

        if (interaction.member.roles.cache.has("945100992276471839")) {
        }
        else interaction.reply('You dont have permission to do this command')

        const robloxname = interaction.options.getString('username');
        const robloxid = await rbxbot.getIdFromUsername(robloxname)
        .then(async(robloxid) => {

            const rank = interaction.options.getString('new_role');
          const rankname = await rbxbot.getRankNameInGroup(config.GroupID, robloxid)
         rbxbot.setRank({ group: config.GroupID, target: robloxid , rank: rank})
           .then(() => interaction.reply(`Ranked ${robloxname} to ${rank}`))
           .catch((err)=> {
               interaction.reply('Couldnt rank the player(Rank Number Invalid)')
               console.log(err)
           })
        })

        .catch((err) => {
            interaction.reply("Invalid username.")
            console.log(err)
        })

    }
}