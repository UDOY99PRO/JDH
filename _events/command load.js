module.exports = (client) =>{
  var Discord = require("discord.js");
  const {readdirSync} = require('fs');
  var num = 0;
  var ok = [];
  var er = [];

    readdirSync('./_commands/').forEach(dir => {
    
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
          num++;
            let pull = require(`../commands/${dir}/${file}`);
          
            if(pull.name){
                client.commands.set(pull.name, pull);
              ok.push(file.replace(".js", ''))      
            } else {
              er.push(file.replace(".js", ''))     
                continue;
            }
          if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
  console.log("success fully loaded", ok);
    console.log("Error whn loading", er);
}
