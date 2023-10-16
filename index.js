async function run(){
  //including web server
require("./dashboard/app.js");
require("./_include/icons.js");
require("./_include/colors.js");
require("./function/console.js");
require("./function/ms.js");
var qdb = require("./_db/quick.js");
global.qdb = qdb;
var Discord = require("discord.js");
global.Discord = Discord;
var { GatewayIntentBits, Partials, Client, Events } = require("discord.js"); 
var fs = require("fs");
global.fs = fs;

const client = new Client({
    fetchAllMembers: true,
    restTimeOffset: 0,
    failIfNotExists: false,
    shards: "auto",
    shardCount: 5,
    allowedMentions: {
      parse: ["roles", "users"],
      repliedUser: true,
    },
    partials: ['MESSAGE', 'CHANNEL', 'REACTION', 'GUILD_MEMBER', 'USER', 'MANAGE_MESSAGE', 'DIRECT_MESSAGE', Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction],
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates
    ]
  });
client.login(process.env.BOT_TOKEN);
 client.commands = new Discord.Collection();
 client.aliases = new Discord.Collection();
client.on("ready", () => {
  console.log(`Client started as: ${client.user.username}`);
  discord_console(`Client started as: ${client.user.username}`);
client.user.setStatus('idle');
discord_console("status Set to IDLE [🌙]");
client.user.setActivity({ name: `JDH OFFICIAL`, type: 0 });
  
fs.readdirSync('./_events').forEach((event) => {
      require(`./_events/${event}`)(client)
    });
});
 // console.log(qdb.set("test", "yes"));
  console.log(qdb.get("test"));
}
run();
