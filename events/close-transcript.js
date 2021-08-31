const Discord = require("discord.js");
module.exports = function(client) {
    client.on("messageReactionAdd", async (reaction, user) => {
        const {message} = reaction;

        if(reaction.message.partial) await reaction.message.fetch();

        if(reaction.partial) await reaction.fetch();

        if(user.bot) return;

        if(reaction.emoji.name === '⛔') {
            await reaction.remove(user)
            if(!reaction.message.channel.name.includes('ticket')) {
                return reaction.message.channel.send('This is not a Ticket Channel!').then( msg  => {
                    setTimeout(() =>  msg.delete(), 5000)
                });
            }
            else {
               
                reaction.message.channel.send('This channel got deleted in 5 seconds!').then( () => {
                    setTimeout(() => reaction.message.channel.delete(), 5000)
                });
            }
        }
    });
}