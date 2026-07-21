const {
Client,
GatewayIntentBits,
Collection,
REST,
Routes,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");


const express = require("express");
const fs = require("fs");
require("dotenv").config();



// ==========================
// SERVIDOR RENDER
// ==========================

const app = express();


app.get("/", (req,res)=>{

res.send("🔴🔵⚪ Terror Tricolor online!");

});


app.listen(process.env.PORT || 3000, ()=>{

console.log("🌐 Servidor web iniciado!");

});





// ==========================
// CLIENT DISCORD
// ==========================


const client = new Client({

intents:[

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent

]

});



client.commands = new Collection();

const comandos = [];





// ==========================
// CARREGAR COMANDOS
// ==========================


const commandFiles = fs.readdirSync("./commands")

.filter(file => file.endsWith(".js"));



for(const file of commandFiles){


const command = require(`./commands/${file}`);


client.commands.set(

command.data.name,

command

);


comandos.push(

command.data.toJSON()

);



console.log(

`✅ Comando carregado: ${command.data.name}`

);


}





// ==========================
// TICKETS
// ==========================


const tickets = require("./systems/tickets");






// ==========================
// BOT ONLINE
// ==========================


client.once("clientReady", async()=>{


console.log(

`✅ Terror Tricolor#${client.user.tag} online!`

);



// registra comandos automaticamente

const rest = new REST({

version:"10"

}).setToken(process.env.TOKEN);



try{


await rest.put(

Routes.applicationGuildCommands(

process.env.CLIENT_ID,

process.env.GUILD_ID

),

{

body:comandos

}

);


console.log("✅ Comandos registrados!");



}catch(error){

console.log(error);

}


});








// ==========================
// INTERAÇÕES
// ==========================


client.on("interactionCreate", async(interaction)=>{


try{





// ==========================
// COMANDOS SLASH
// ==========================


if(interaction.isChatInputCommand()){



const command = client.commands.get(

interaction.commandName

);



if(!command) return;



await command.execute(interaction);


return;


}







// ==========================
// MENU TICKET
// ==========================


if(interaction.isStringSelectMenu()){



if(interaction.customId === "ticket_menu"){



const escolha = interaction.values[0];



if(escolha === "recrutamento"){


return tickets.criarTicket(

interaction,

"Recrutamento TUTT"

);


}


}


}









// ==========================
// BOTÕES
// ==========================


if(interaction.isButton()){



const cargosPermitidos=[


"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"


];



const autorizado =

interaction.member.roles.cache.some(

role=>cargosPermitidos.includes(role.id)

);







// ==========================
// ASSUMIR TICKET
// ==========================


if(interaction.customId === "assumir"){



if(!autorizado){


return interaction.reply({

content:"❌ Você não tem permissão para assumir tickets.",

ephemeral:true

});


}





const mensagens = await interaction.channel.messages.fetch({

limit:10

});



const mensagemTicket = mensagens.find(

msg =>

msg.author.id === client.user.id &&

msg.embeds.length > 0

);




if(mensagemTicket){



const embed = EmbedBuilder.from(

mensagemTicket.embeds[0]

);



let texto = embed.data.description;



texto = texto.replace(

"Ticket não assumido.",

`${interaction.user}`

);



texto = texto.replace(

"🟡 Status:\nAguardando atendimento.",

"🟢 Status:\nEm atendimento."

);



embed.setDescription(texto);



await mensagemTicket.edit({

embeds:[embed]

});


}





await interaction.reply({

content:`🛠️ Ticket assumido por ${interaction.user}`

});


return;


}









// ==========================
// FECHAR TICKET
// ==========================


if(interaction.customId === "fechar"){



if(!autorizado){


return interaction.reply({

content:"❌ Você não tem permissão para fechar tickets.",

ephemeral:true

});


}



const botoes = new ActionRowBuilder()

.addComponents(


new ButtonBuilder()

.setCustomId("confirmar_fechar")

.setLabel("Confirmar")

.setEmoji("✅")

.setStyle(ButtonStyle.Danger),



new ButtonBuilder()

.setCustomId("cancelar_fechar")

.setLabel("Cancelar")

.setEmoji("❌")

.setStyle(ButtonStyle.Secondary)


);




return interaction.reply({

content:"🔒 Confirmar fechamento do ticket?",

components:[botoes],

ephemeral:true

});


}









// ==========================
// CONFIRMAR FECHAR
// ==========================


if(interaction.customId === "confirmar_fechar"){



await interaction.update({

content:

`🔒 Ticket fechado por ${interaction.user}`,

components:[]

});



setTimeout(()=>{


interaction.channel.delete()

.catch(()=>{});


},5000);



}







// ==========================
// CANCELAR
// ==========================


if(interaction.customId === "cancelar_fechar"){



return interaction.update({

content:"❌ Fechamento cancelado.",

components:[]

});


}





}



}catch(error){

console.log(error);


}



});








// ==========================
// LOGIN
// ==========================


client.login(process.env.TOKEN);
