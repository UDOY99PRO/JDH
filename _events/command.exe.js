module.exports= (client) => {
  client.on('messageCreate', async (message) =>{
    if(message.author.bot){	return; }

    var prefix = "-";
 if(!message.content.startsWith(prefix)){ return; }
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
       const cmd = args.shift().toLowerCase();
        var command = client.commands.get(cmd)
    console.log(command);
     if(!command) command = client.commands.get(client.aliases.get(cmd));
 if(command){ command.execute(client, message, args); }
  if(!command){   
    setTimeout(() => message.delete(), 8000)
    var nocmd = new Discord.EmbedBuilder()
    .setColor("#ff0808")
      .setTitle(` ❌ | Error `)
      .setThumbnail(message.author.displayAvatarURL())
  .setDescription(`No command found With this name (${args[0]}) \nUse ${prefix}help to get list of all command`)
    .setFooter({text: `Requested By ${message.author.username}` })
    .setTimestamp()
    return message.reply({embeds: [nocmd]}).then(msg => {
    setTimeout(() => msg.delete(), 8000)
  })
   
  }

          });
}      
  
