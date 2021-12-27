const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "clear",
    run: async (client, message, args) => {
        if (!message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR)) {
            let nopermsembed = new Discord.MessageEmbed()
                .setTitle('You have no Permission')
                .setDescription("You have no Permission to use this Command!")
                .setColor(ee.color);
            return message.channel.send({ embeds: [nopermsembed] })
        } else {
            if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
                let noamountembed = new Discord.MessageEmbed()
                    .setTitle("No Amount given")
                    .setDescription("Please provide an amount, how many message should be deleted!")
                    .setColor(ee.color);
                return message.channel.send({ embeds: [noamountembed] })
            } else {
                let deleteAmount;
                deleteAmount = parseInt(args[0]);
                message.channel.bulkDelete(deleteAmount + 1, true);
                message.channel.send(`${args[0]} messages deleted!`)
                    .then(msg => {
                        setTimeout(() => msg.delete(), 5000)
                    })
            }
        }
    }
};