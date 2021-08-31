module.exports = function(client)  {
    client.on("message", (message) => {
        client.ticket.ensure(message.guild.id, {
            channel: "",
            msgID: "",
            message: ""
        });
        client.prefix.ensure(message.guild.id, {
            prefix: ""
        })
    })
}