const Discord = require("discord.js");
module.exports = function (client) {
    client.on("messageReactionAdd", async (messageReaction, user) => {
        const { client, count, emoji, me, message, partial, users } = messageReaction;
        if (user.bot) return;
        //if (emoji.name === '🎫') return users.remove(user);
        if (emoji.name === '🎫' && message.id === (client.ticket.get(message.guild.id, `msgID`))) {
            if (message.guild.channels.cache.find(c => c.name === `ticket-${user.id}`)) {
                return message.channel.send(`${user}, Your ticket already exists`).then(msg => {
                    setTimeout(() => msg.delete(), 5000) + users.remove(user)
                })
            } else {
                users.remove(user);
                console.log(`A ticket has been opened on ${message.guild.name}`);

                let ticketchannelembed2 = new Discord.MessageEmbed()
                    .setTitle("Welcome to your Ticket!")
                    .setDescription("Hello and welcome to your ticket! We will get in touch with you soon!")
                    .setFooter(`Ticket opened by: ${user.tag}!`);
                let ticketchannelembed1 = new Discord.MessageEmbed()
                    .setTitle("Welcome to your Ticket!")
                    .setDescription(client.ticket.get(message.guild.id, "message"))
                    .setFooter(`Ticket opened by: ${user.tag}!`);

                let guild = message.guild;
                guild.channels.create(`ticket-${user.id}`, {
                    type: "GUILD_TEXT",
                    topic: `ticket-${user.id}`,
                    nsfw: false,
                    permissionOverwrites: [
                        {
                            id: user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                        },
                        {
                            id: messageReaction.message.guild.roles.everyone,
                            deny: ["VIEW_CHANNEL"]
                        }
                    ],
                    rateLimitPerUser: 0,
                    reason: `${user.tag} opened a new a ticket, so I created a channel for it.`
                }).then(async (channel) => {
                    channel.send(`<@${user.id}>`);
                    if (!client.ticket.get(message.guild.id, `message`)) {
                        channel.send({ embeds: [ticketchannelembed2] }).then((msg) => {
                            msg.react("⛔")
                        })
                    };

                    if (client.ticket.get(message.guild.id, `message`)) {
                        channel.send({ embeds: [ticketchannelembed1] }).then((msg) => {
                            msg.react("⛔")
                        })
                    }
                })
            }
        }
    })
};