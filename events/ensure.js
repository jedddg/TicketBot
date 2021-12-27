module.exports = function (client) {
    client.on("messageCreate", (message) => {
        client.ticket.ensure(message.guild.id, {
            channel: "",
            msgID: "",
            message: ""
        });
        client.prefix.ensure(message.guild.id, {
            prefix: "t!"
        })
    })
};