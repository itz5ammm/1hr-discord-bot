const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let perm = message.member.hasPermission("MANAGE_EMOJIS")
  if(!perm) return message.channel.send("You need the manage emojis permission to warn members")
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")
  if(!logchannel) return message.channel.send("Couldnt find channel called logchannel")
  
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("You need to specify a user to warn i hope you know that")
  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "Not specifed"
  
  let logembed = new discord.MessageEmbed()
  .setColor("RED")
  .setTitle(`User Warned | ${user.user.tag}`)
  .addField("Staff" , `${message.author}`)
  .addField("Reason" , `${reason}`)
  
  try{
    user.send(`You have been warned in ${message.guild.name} by ${message.author} for ${reason}`)
  } catch (err) {
    console.log(err)
  }
  message.channel.send(`${user} has been successfully warned`)
  logchannel.send(logembed)
}

module.exports.help = {
  name: "warn",
  aliases: ["warnuser"],
  description: "Warn a member in the server",
  usage: "<user> (reason)",
  category: "Moderation"
}