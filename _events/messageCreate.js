module.exports = (client) => {
client.on("messageCreate", (message) => {
  if(message.bot) return;
  if(message.content == "!ping!"){
    message.reply({content: `${client.ws.ping}`});
  }else if(message.content == "!uptime!"){
        message.reply({content: `${client.uptime}`});
  }
});
};
