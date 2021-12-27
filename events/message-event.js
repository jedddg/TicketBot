module.exports = client => {
  // lol what a funny console log :joy:
  //console.log("HI")
  client.on("messageCreate", async (message) => {
    let { prefix } = require(`${process.cwd()}/botconfig/config.json`);

    if (!message.guild) return;

    if (message.author.bot) return;

    const curperf = client.prefix.get(message.guild.id, `prefix`);
    if (!curperf) {
      prefix = "t!"
    } else {
      prefix = client.prefix.get(message.guild.id, `prefix`)
    };

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd1 = args.shift().toLowerCase();

    if (cmd1.length === 0) return;

    let cmd = client.commands.get(cmd1);
    if (!cmd) cmd = client.commands.get(client.aliases.get(cmd1));

    if (!cmd) return;
    if (!message.content.startsWith(prefix)) return;

    if (cmd) {
      try {
        cmd.run(client, message, args)
      } catch (e) {
        console.log(e);
        message.reply(`There is an error with the ${cmd.name}! Please contact **Shoda#1966**!`);
        message.channel.send(`\`\`\`${String(e.message).substr(0, 2000)}\`\`\``)
      }
    }
  })
};

/** 
@EVERYONE

THIS COMMAND HANDLER IS COMPLETLY MADE BY Shoda#1966

ALL RIGHTS GO TO HIM AND CRIME DEVELOPMENT

IF YOU REMOVE THIS TEXT, YOUR CODE WHOULD BE ILLEGAL!

@EVERYONE
**/