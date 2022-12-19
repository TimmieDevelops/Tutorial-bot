const { ActivityType } = require('discord-api-types/v9');
const {  } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        let activities = [ 'TimFN', `${client.user.username}`], i = 0;
        setInterval(() => client.user.setActivity({ name: `${activities[i ++ % activities.length]}`, type: ActivityType.Listening }), 22000)
    }
}