const Discord = require("discord.js");
module.exports = function(client) {
    client.on("messageReactionAdd", async (reaction, user) => {
        const { message } = reaction;
        if(user.bot) return;
        if(!reaction.emoji.name === '🎫') return reaction.users.remove(user);

        if(reaction.emoji.name === '🎫' && message.id === (client.ticket.get(message.guild.id, `msgID`))) {
            if(message.guild.channels.cache.find(c => c.name === `ticket-${user.id}`)){
                return message.channel.send('Already exist').then(msg => msg.delete()) +
                reaction.users.remove(user)
                
          
              }
              else{
              reaction.users.remove(user)
              console.log(`A ticket has been Opend on ${message.guild.name}`)
              
      
                let ticketchannelembed2 = new Discord.MessageEmbed()
                .setTitle("Welcome to your Ticket!")
                .setDescription("Hello and Welcome to your ticket! We get in touch with you soon!") 
                .setFooter(`Ticket opend by: ${user.tag}!`)  
              
            
                let ticketchannelembed1 = new Discord.MessageEmbed()
                .setTitle("Welcome to your Ticket!")
                .setDescription(client.ticket.get(message.guild.id, "message")) 
                .setFooter(`Ticket opend by: ${user.tag}!`)
              
                
              let guild = reaction.message.guild
              guild.channels.create(`ticket-${user.id}`, {
                permissionOverwrites: [
                {
                    id: user.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: reaction.message.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                       }
                    ]
                }).then(channel => {   
                channel.send(`<@${user.id}>`);
                if(!client.ticket.get(message.guild.id, `message`)) {
                    channel.send(ticketchannelembed2)
                }
                if(client.ticket.get(message.guild.id, `message`)) {
                    channel.send(ticketchannelembed1)
                }
                })
            }
        }
    })
}