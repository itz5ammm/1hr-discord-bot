const discord = require("discord.js")

module.exports.run = async (client, message, args) => {
let replies = ["yes" , "no" , "maybe" , "ask someone else" , "i don't know"]

let question = args.slice(0).join(" ")
const embed1 = new discord.MessageEmbed()
.setColor("RED")
.setDescription("You need to specify the question for me to answer")
if(!question)return message.channel.send(embed1)
  
  let result = Math.floor((Math.random() * replies.length));

let embed = new discord.MessageEmbed()
.setColor("#00FFFF")
.addField("Your question" , `${question}`)
.addField("My answer" , `${replies[result]}`)
message.channel.send(embed)
}

module.exports.help = {
name: "8ball",
  aliases: ["eightball"],
  description: "Answer me a question and I will answer it",
  usage: "<question>",
  category: "Misc"
}