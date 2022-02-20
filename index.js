const { REST } = require('@discordjs/rest')
const { Routes } = require('discord-api-types/v9')

const { Client, Intents, Interaction } = require('discord.js')
const rbxbot = require('noblox.js')
const { readdirSync } = require('fs')
const { Token } = require('./config.json')
var config = require(`./config.json`)

const intents = new Intents(["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES"])

const bot = new Client({intents: intents})

bot.commands = new Map()
const slashcommands = []

const rest = new REST({ version : '9' }).setToken(Token)

const commands = readdirSync('./Commands').filter((file) =>
file.endsWith('.js')
)

for (command of commands) {

    const file = require(`./Commands/${command}`)
    bot.commands.set(file.name.toLowerCase(), file)

    if(file.data) {
        slashcommands.push(file.data)
    }
}




bot.login(Token)


bot.on('ready', async () => {
    await rbxbot.setCookie(config.Cookie);
    console.log(`${bot.user.tag} has logged in`)
})

bot.on('messageCreate', (message) => {

    if (message.author.bot) return
    if(!message.guild) return

    const prefix = "-"
    const args = message.content.slice(prefix.length).split(/ +/g)
    const command = args.shift().toLowerCase

    if(!bot.commands.has(command)) return

    bot.commands.get(command).execute(bot, message, args)
})

; (async () => {

        const botid = '941907714790019223'
        const serverid = '933007176509829180'
        try {
            console.log('Started Refreshing Slash Commands')

            await rest.put(Routes.applicationGuildCommands(botid, serverid) , {body: slashcommands})

            console.log('Refreshed')
        } catch (error) {
            console.log(error)
        }
})()

bot.on('interactionCreate', (interaction) =>{
    console.log('Interaction Recived')

    if(!interaction.isCommand()) return
    const command = interaction.commandName

    if(!bot.commands.has(command)) return
    
    bot.commands.get(command).slashexecute(bot, interaction)
})