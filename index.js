const {
Client,
GatewayIntentBits,
Collection
} = require("discord.js");

const express = require("express");
require("dotenv").config();

const app = express();


// ==========================
// SERVIDOR RENDER
// ==========================

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



// ==========================
// SISTEMA DE TICKETS
// ==========================

const tickets = require("./systems/tickets");



// ==========================
// INTERAÇÕES
// ==========================


client.on("interactionCreate", async(interaction)=>{



// MENU DE SELEÇÃO

if(interaction.isStringSelectMenu()){



if(interaction.customId === "ticket_menu"){


const escolha = interaction.values[0];



if(escolha === "recrutamento"){


return tickets.criarTicket(

interaction,

"Recrutamento TUTT"

);


}



if(escolha === "suporte"){


return tickets.criarTicket(

interaction,

"Suporte"

);


}



if(escolha === "denuncia"){


return tickets.criarTicket(

interaction,

"Denúncia"

);


}



if(escolha === "duvidas"){


return tickets.criarTicket(

interaction,

"Dúvidas"

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




// ASSUMIR


if(interaction.customId==="assumir"){



const permitido =
interaction.member.roles.cache.some(

role=>cargosPermitidos.includes(role.id)

);



if(!permitido){

return interaction.reply({

content:"❌ Você não tem permissão para assumir tickets.",

ephemeral:true

});

}




await interaction.channel.send({

content:
`🛠️ Ticket assumido por ${interaction.user}`

});



return interaction.reply({

content:"✅ Ticket assumido com sucesso!",

ephemeral:true

});



}




// FECHAR


if(interaction.customId==="fechar"){



const permitido =
interaction.member.roles.cache.some(

role=>cargosPermitidos.includes(role.id)

);



if(!permitido){

return interaction.reply({

content:"❌ Apenas recrutadores autorizados podem fechar tickets.",

ephemeral:true

});

}



await interaction.reply({

content:"🔒 Ticket fechado. Apagando canal em 5 segundos..."

});



setTimeout(()=>{


interaction.channel.delete();


},5000);



}



}



});




// ==========================
// BOT ONLINE
// ==========================


client.once("clientReady",()=>{


console.log(

`✅ Terror Tricolor#${client.user.tag} online!`

);


});




// LOGIN


client.login(process.env.TOKEN);
