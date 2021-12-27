const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client({
  shards: "auto",
  allowedMentions: {
    parse: ["users"], // roles, users, everyone is all the OPTIONS
    repliedUser: false
  },
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  // restTimeOffset: 0, //if you want your reactions asap (rather than 1 second per each reaction)
  failIfNotExists: true,
  presence: {
    activities: [{
      name: "Ticket Bot",
      type: "STREAMING",
      url: "https://twitch.tv/#"
    }]
  },
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS
  ]
});

const config = require(`${process.cwd()}/botconfig/config.json`);
const Enmap = require("enmap");
const os = require("os");
const colors = require("colors");

client.login(config.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`${process.cwd()}/cmds/`);

const events = fs.readdirSync(`${process.cwd()}/events/`);
events.forEach(eventfile => {
  require(`${process.cwd()}/events/${eventfile}`)(client)
});
console.log("All events/modules loaded!".green);

client.handler = ["anticrash", "command"];
client.handler.forEach(hand => {
  require(`${process.cwd()}/handler/${hand}`)(client)
});

client.ticket = new Enmap({ name: "ticket", dataDir: "./databases/ticket" });
client.prefix = new Enmap({ name: "prefix", dataDir: "./databases/prefix" });

client.on("ready", () => {
  const readytext = `The Client: ${client.user.tag} is now online!`;
  console.log(readytext.green)
});

/** 
@EVERYONE

THIS COMMAND HANDLER IS COMPLETLY MADE BY Shoda#1966

ALL RIGHTS GO TO HIM AND CRIME DEVELOPMENT

IF YOU REMOVE THIS TEXT, YOUR CODE WHOULD BE ILLEGAL!

@EVERYONE
**/