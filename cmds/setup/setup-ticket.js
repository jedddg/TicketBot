const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "setup-ticket",
    aliases: ["ticket"],
    run: async (client, message, args) => {
        let perms = message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR);
        let channel = message.mentions.channels.first();

        let inenmap = client.ticket.get(message.guild.id, `channel`);

        if (!perms) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle("Missing Permissions!")
                .setDescription('You have no permission to use this Command!')
                .setColor(ee.color);

            return message.reply({ embeds: [nopermsembed] })
        };

        if (perms) {
            if (!args[0] === "set" || !args[0] === "unset" || !args[0] === "message") {
                let usesetunsetmessageembed = new Discord.MessageEmbed()
                    .setTitle("Please use a vaild method!")
                    .setDescription("Please use \`\`set\`\` or \`\`unset\`\` or \`\`message\`\`!")
                    .setColor(ee.color);

                return message.reply({ embeds: [usesetunsetmessageembed] })
            } else {
                if (args[0] === "set") {
                    if (inenmap) {
                        let embed1 = new Discord.MessageEmbed()
                            .setTitle("Please use the right usage!")
                            .setDescription("Please use \`\`unset\`\` before you use \`\`set\`\`!")
                            .setColor(ee.color);

                        return message.reply({ embeds: [embed1] })
                    };

                    if (!inenmap) {
                        if (!channel) {
                            let embed2 = new Discord.MessageEmbed()
                                .setTitle("Provid a channel!")
                                .setDescription("You have to provid a channel!")
                                .setColor(ee.color);

                            return message.reply({ embeds: [embed2] })
                        } else {
                            client.ticket.set(message.guild.id, channel.id, `channel`);

                            let embed3 = new Discord.MessageEmbed()
                                .setTitle("Ticket channel setted!")
                                .setDescription(`The Ticket-channel is now ${channel}!`)
                                .setColor(ee.color);

                            message.channel.send({ embeds: [embed3] });

                            let embed4 = new Discord.MessageEmbed()
                                .setTitle("Open a Ticket here!")
                                .setDescription("React to this message to open a ticket!")
                                .setColor(ee.color);

                            let themsg = await channel.send({ embeds: [embed4] });
                            themsg.react("🎫");
                            client.ticket.set(message.guild.id, themsg.id, `msgID`)
                        }
                    }
                };

                if (args[0] === "unset") {
                    if (!inenmap) {
                        let embed5 = new Discord.MessageEmbed()
                            .setTitle("Please use the right usage!")
                            .setDescription("Please use \`\`set\`\` before you use \`\`unset\`\`!")
                            .setColor(ee.color);

                        return message.reply({ embeds: [embed5] })
                    };
                    if (inenmap) {
                        client.ticket.delete(message.guild.id, `channel`);
                        client.ticket.delete(message.guild.id, `msgID`);
                        let embed6 = new Discord.MessageEmbed()
                            .setTitle("Ticket System disbaled!")
                            .setDescription("The Ticket System is now Successfully disabled!")
                            .setColor(ee.color);

                        message.channel.send({ embeds: [embed6] })
                    }
                };
                if (args[0] === "message") {
                    let msginemap = client.ticket.get(message.guild.id, "message");
                    if (!args[1]) {
                        let embed7 = new Discord.MessageEmbed()
                            .setTitle("Please use the right usage!")
                            .setDescription('Please use \`\`set\`\` or \`\`unset\`\`!')
                            .setColor(ee.color);

                        return message.reply({ embeds: [embed7] })
                    };
                    if (!args[1] === "set" || !args[0] === "unset") {
                        let embed8 = new Discord.MessageEmbed()
                            .setTitle("Please use the right usage!")
                            .setDescription('Please use \`\`set\`\` or \`\`unset\`\`!')
                            .setColor(ee.color);

                        return message.reply({ embeds: [embed8] })
                    };
                    if (args[1] === "set") {
                        if (msginemap) {
                            let embed9 = new Discord.MessageEmbed()
                                .setTitle("Please use the right usage!")
                                .setDescription("Please use \`\`unset\`\` before \`\`set\`\`!")
                                .setColor(ee.color);

                            return message.reply({ embeds: [embed9] })
                        };
                        if (!msginemap) {
                            if (!args[2]) {
                                let embed10 = new Discord.MessageEmbed()
                                    .setTitle("Give a new Ticket Message!")
                                    .setDescription("Please give a new Ticket Message!")
                                    .setColor(ee.color);

                                return message.reply({ embeds: [embed10] })
                            } else {
                                client.ticket.set(message.guild.id, args.slice(2).join(" "), `message`);
                                let embed11 = new Discord.MessageEmbed()
                                    .setTitle("Setted new Ticket Message!")
                                    .setDescription(`Successfully setted new Ticket message to: \n ${args.slice(2).join(" ")}`)
                                    .setColor(ee.color);

                                message.channel.send({ embeds: [embed11] })
                            }
                        }
                    };

                    if (args[1] === "unset") {
                        if (!msginemap) {
                            let embed12 = new Discord.MessageEmbed()
                                .setTitle("Please use the right usage!")
                                .setDescription("Please use \`\`set\`\` before \`\`unset\`\`!")
                                .setColor(ee.color);

                            return message.reply({ embeds: [embed12] })
                        } else {
                            client.ticket.delete(message.guild.id, `message`);
                            let embed13 = new Discord.MessageEmbed()
                                .setTitle("Deleted Ticket Message!")
                                .setDescription("Successfully deleted Ticket message!")
                                .setColor(ee.color);

                            message.channel.send({ embeds: [embed13] })
                        }
                    }
                };

                if (!args[0]) {
                    let usesetunsetmessageembed2 = new Discord.MessageEmbed()
                        .setTitle("Please use a vaild method!")
                        .setDescription("Please use \`\`set\`\` or \`\`unset\`\` or \`\`message\`\`!")
                        .setColor(ee.color);

                    return message.reply({ embeds: [usesetunsetmessageembed2] })
                }
            }
        }
    }
};