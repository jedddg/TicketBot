const Discord = require("discord.js");

module.exports = function (client) {
    client.on("messageReactionAdd", async (messageReaction, user) => {
        const { message, emoji } = messageReaction;

        if (messageReaction?.partial) await messageReaction.fetch();

        if (message?.partial) await messageReaction.message.fetch();

        if (user.bot) return;

        if (emoji.name === '⛔') {
            await messageReaction.remove(user);
            if (!message.channel.name.includes('ticket')) {
                return message.channel.send('This is not a Ticket Channel!').then(msg => {
                    setTimeout(() => msg.delete(), 5000)
                })
            } else {
                message.channel.send('This channel will be deleted in 5 seconds!').then(() => {
                    setTimeout(() => message.channel.delete(), 5000)
                })
            }
        }
    })
};