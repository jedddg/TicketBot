const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "invite",
    run: async (client, message, args) => {
        let inviteembed = new Discord.MessageEmbed()
            .setTitle('Here you can get my invite link!')
            .setDescription(`Just press [here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)!`)
            .setColor(ee.color)
            .setURL(`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`);

        message.channel.send({ embeds: [inviteembed] })
    }
};