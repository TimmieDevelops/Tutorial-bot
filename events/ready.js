const { ActivityType } = require('discord-api-types/v9');
const {  } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        let activities = [ 'Made By TimmieDevelops#2325', `${client.user.username}`], i = 0;
        setInterval(() => client.user.setActivity({ name: `${activities[i ++ % activities.length]}`, type: ActivityType.Listening }), 22000)
    }
}
