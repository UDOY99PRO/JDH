module.exports = {
  name: "help",
  aliases: [],
  execute: async(client, message, args) => {
  var helpEmbed = new Discord.EmbedBuilder()
    .setColor(color.green).setTitle("Help Menu")
    .setDescription(`Avalable Commands:\n\n---`).setTimestamp()
    .setFooter({text: `JDH OFFICIAL`})
    message.reply({embeds: [helpEmbed]});
}}
