const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const rest = new REST({ version: '9' }).setToken(token);

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS
    ]
})

client.commands = new Collection();
const commands = [];

client.on('ready', async () => {
    try {
        await rest.put(Routes.applicationCommands(client.user.id), { body: commands });
    } catch (error) {
        console.error(error);
    }
    console.log(`${client.user.username} is online!`);
});

fs.readdirSync('./commands').forEach(async file => {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
    client.commands.set(command.data.name, command);
})

fs.readdirSync('./events').forEach(async file => {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
})

client.login(token);