const Discord = require("discord.js");
module.exports = function (client) {
    client.on("messageCreate", async (message) => {
        let prefix = 't!';


        const curperf = client.prefix.get(message.guild.id, `prefix`);
        if (!curperf) {
            prefix = "t!"
        } else {
            prefix = client.prefix.get(message.guild.id, `prefix`)
        };


        if (message.mentions.has(client.user)) {
            let mentionedembed = new Discord.MessageEmbed()
                .setTitle(`Thats me, ${client.user.username}`)
                .setDescription(`My standard prefix is \`\`t!\`\` \n The prefix for this server is \`${prefix}\` \n **You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands)!**`)
                .setColor(color);

            message.channel.send({
                embeds: [mentionedembed]
            })
        }
    })
};