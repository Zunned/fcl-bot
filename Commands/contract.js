const { Client, Message, CommandInteraction, MessageEmbed, MessageActionRow, MessageButton} = require('discord.js')
var Discord = require('discord.js')
const { SlashCommandBuilder, userMention } = require('@discordjs/builders');
const { message } = require('noblox.js');
const talkedRecently = new Set();
const wait = require('util').promisify(setTimeout);
module.exports = {

    name: 'contract',
    description: 'Sign players',
    data : new SlashCommandBuilder()
        .setName('contract')
        .setDescription('Sign players')
        .addUserOption(option =>
            option.setName('user')
                .setDescription('Player name')
                .setRequired(true))
        .addStringOption(option => option.setName('team').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('position').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('role').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('environment').setDescription('Enter a string').setRequired(true))
        .addStringOption(option => option.setName('extras').setDescription('Enter a string').setRequired(true)),

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

        if (interaction.member.roles.cache.has("933008433484038156")) {
        }
                else interaction.reply('You dont have permission to do this command')

        const user = interaction.options.getUser('user');
        const id = user.id
        const team = interaction.options.getString('team');
        const pos = interaction.options.getString('position');
        const role = interaction.options.getString('role');
        const env = interaction.options.getString('environment');
        const ex = interaction.options.getString('extras');

        var team1 = team.toUpperCase()
        var pos1 = pos.toUpperCase()
        var role1 = role.toUpperCase()
        var env1 = env.toUpperCase()
        var ex1 = ex.toUpperCase()

        const row = new MessageActionRow()
        .addComponents(
           accept = new MessageButton()
                .setCustomId('acceptbutton')
                .setLabel('Accept')
                .setStyle('SUCCESS')
                .setDisabled(false),
           deny = new MessageButton()
                .setCustomId('denybutton')
                .setLabel('Deny')
                .setStyle('DANGER')
                .setDisabled(false)
        );


        const embed = new MessageEmbed()
            .setTitle('Agreement')
            .setDescription('This is a contract made between the manager and player.')
            .addFields(
                            { name: '\u200B', value: `__**INFORMATION**__
                            **TEAM**: ${team1}
                            **POSITION**: ${pos1}
                            **ROLE**: ${role1}
                            **ENVIRONMENT**: ${env1}
                            **EXTRA**: ${ex1}`, inline: false },
                            { name: 'Signee', value: `${user}`, inline: true },
                            { name: 'Contractor', value: `${interaction.user}`, inline: true },
                            { name: 'Contractor ID', value: `I${interaction.user.id}D`, inline: true }
                        )
            .setFooter({
                text: "Football Confederation League",
                url: "https://www.roblox.com/groups/11542963/[FCL]-FootballConfederationLeague#!/about",
                iconURL: "https://i.ibb.co/Btt4LD4/fcllogo.png"
                })
            .setTimestamp()
            .setColor(0x005BFF)

            const log = new MessageEmbed()
            .setTitle('Contract Logs')
            .setDescription('Contract Completed')
            .addFields(
                            { name: '\u200B', value: `__**INFORMATION**__
                            **TEAM**: ${team1}
                            **POSITION**: ${pos1}
                            **ROLE**: ${role1}
                            **ENVIRONMENT**: ${env1}
                            **EXTRA**: ${ex1}`, inline: false },
                            { name: 'Signee', value: `${user}`, inline: true },
                            { name: 'Contractor', value: `${interaction.user}`, inline: true },
                            { name: 'Contractor ID', value: `I${interaction.user.id}D`, inline: true }
                        )
            .setFooter({
                text: "Football Confederation League",
                url: "https://www.roblox.com/groups/11542963/[FCL]-FootballConfederationLeague#!/about",
                iconURL: "https://i.ibb.co/Btt4LD4/fcllogo.png"
                })
            .setTimestamp()
            .setColor(0x04ff00)

            let coontractor = interaction.user

            let monkey = await interaction.reply({embeds : [embed], components : [row]})

            const filter = i => [i.customId === 'acceptbutton', i.customId === 'denybutton']  && i.user.id === user.id 

            const collector = interaction.channel.createMessageComponentCollector({ filter, time: 15000 });
            
            collector.on('collect', async i => {
                if (i.customId === 'acceptbutton') {
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    await interaction.editReply({embeds : [embed], components : [row]});
                    i.reply(`the signee __accepted__. Contractor ID = I${coontractor.id}D`)
                    channel2 = bot.channels.cache.get('944743595599081502');
                    await channel2.send({embeds : [log]})
                } else if (i.customId === 'denybutton') {
                    row.components[0].setDisabled(true)
                    row.components[1].setDisabled(true)
                    interaction.editReply({embeds : [embed], components : [row]});
                    i.reply(`the signee __declined__. Contractor ID = I${coontractor.id}D`)
                }
            });
            
            collector.on('end', collected => console.log(`Collected ${collected.size} items`));
    }
}