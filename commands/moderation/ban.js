const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  if(!message.member.hasPermission("BAN_MEMBERS"))return message.channel.send("You need the ban members permission to use this command")
  
  let logchannel = message.guild.channels.cache.find(ch => ch.name === "logchannel")
  if(!logchannel) return message.channel.send("Cant find channel called logchannel")
  
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("You need to mention a user to ban. You know that right?")
  
  let reason = args.slice(1).join(" ")
  if(!reason) reason = "No Reason Provided"
  
  if(user.hasPermission("BAN_MEMBERS")) return message.channel.send("You can't ban someone with the ban members permission")
  let logembed = new discord.MessageEmbed()
  .setColor("RED")
  .setTitle(`User Banned | ${user.user.tag}`)
  .addField("Staff" , `${message.author}`)
  .addField("Reason" , `${reason}`)

  try{
    user.send(`You have been banned in ${message.guild.name} by ${message.author} for ${reason}`)
  } catch (err) {
    console.log(err)
  }
  
  await user.ban()
  logchannel.send(logembed)
  message.channel.send(`${user} has been successfully banned`)
  
}

module.exports.help = {
  name: "ban",
  aliases: ["banuser"],
  description: "Ban a user from your server",
  usage: "<user> (reason)",
  category:"Moderation"
}