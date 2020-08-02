const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  let perm = message.member.hasPermission("MANAGE_ROLES")
  if(!perm) return message.channel.send("You need the Manage Roles permission to use this command") 
  
  let user = message.mentions.members.first()
  if(!user) return message.channel.send("Where is the user? Who is the user?")
  
  let role = message.mentions.roles.first()
  if(!role) return message.channel.send("Did you forget the role?")
  
  if(!user.roles.has(role)) return message.channel.send("This user doesnt have the role.")
  
  let embed = new discord.MessageEmbed()
  .setColor("GREEN")
  .setDescription(`${user} has no longer the ${role}`)
  
  user.roles.remove(role)
  message.channel.send(embed)
}

module.exports.help = {
  name: "remrole",
  aliases: ["remroles"],
  description: "Add a role to a user",
  usage: "<user> <role>",
  category: "Utility"
}