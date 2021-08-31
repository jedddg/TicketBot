const Discord = require("discord.js");
const config = require("../botconfig/config.json");
module.exports = function(client) {
    client.on("message", async (message) => {
        let prefix = 't!';

        const curperf = client.prefix.get(message.guild.id, `prefix`);
        if (!curperf) {
        prefix = "t!";
        } else {
        prefix = client.prefix.get(message.guild.id, `prefix`);
        }


        if(message.mentions.has(client.user)){
            let mentionedembed = new Discord.MessageEmbed()
            .setTitle(`Thats me, ${client.user.username}`)
            .setDescription(`My standard prefix is \`\`t!\`\` \n The prefix for this server is ${prefix} \n **You can invite me [here](https://discord.com/api/oauth2/authorize?client_id=877869083855581234&permissions=8&scope=bot)!**`)
            .setColor(config.color)
            message.channel.send(mentionedembed);
        }
    })
}