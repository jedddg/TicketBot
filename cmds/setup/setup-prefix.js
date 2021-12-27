const Discord = require("discord.js");
const ee = require(`${process.cwd()}/botconfig/config.json`);
module.exports = {
    name: "setup-prefix",
    run: async (client, message, args) => {
        let prefix = 't!';

        const curperf = client.prefix.get(message.guild.id, `prefix`);
        if (!curperf) {
            prefix = "t!"
        } else {
            prefix = client.prefix.get(message.guild.id, `prefix`)
        };

        let perms = message.member.permissions.has(Discord.Permissions.FLAGS.ADMINISTRATOR);
        let newprefix = args.slice(0).join(" ");

        if (!perms) {
            return message.reply('You have no permissions to use this Command!')
        } else {
            if (!args[0]) {
                message.channel.send(`The current prefix is ${prefix}`);
            } else {
                client.prefix.set(message.guild.id, newprefix, 'prefix')
                message.channel.send(`The new prefix is ${newprefix}`);
            }
        }
    }
}