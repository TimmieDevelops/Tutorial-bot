const { InteractionType } = require('discord-api-types/v9');
const {  } = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'interactionCreate',
    execute: async (interaction) => {
        let client = interaction.client;
        if (interaction.type == InteractionType.ApplicationCommand) {
            if (interaction.user.bot) return;

            fs.readdirSync('./commands').forEach(file => {
                const command = require(`../commands/${file}`);
                if (interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
                    command.run(client, interaction);
                }
            })
        }
    }
}