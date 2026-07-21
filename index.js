const {
Client,
GatewayIntentBits,
Collection
} = require("discord.js");

const express = require("express");
require("dotenv").config();


const app = express();


app.get("/", (req,res)=>{

res.send("🔵🔴⚪ Terror Tricolor online!");

});


app.listen(process.env.PORT || 3000, ()=>{

console.log("🌐 Servidor web iniciado!");

});



const client = new Client({

intents:[

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent

]

});



client.commands = new Collection();



const tickets = require("./systems/tickets");



// LOGIN DO BOT

client.once("ready",()=>{

console.log(`✅ Terror Tricolor#${client.user.tag} online!`);

});




// BOTÕES

client.on("interactionCreate", async interaction=>{


if(!interaction.isButton()) return;



// ABRIR RECRUTAMENTO

if(interaction.customId === "recrutamento"){


await tickets.criarTicket(interaction);


}




// ASSUMIR TICKET

if(interaction.customId === "assumir_ticket"){



await interaction.reply({

content:

`🛠️ Ticket assumido por ${interaction.user}`,

});


}




// FECHAR TICKET

if(interaction.customId === "fechar_ticket"){


await tickets.fecharTicket(interaction);


}


});




// COMANDO PAINEL

client.on("interactionCreate", async interaction=>{


if(!interaction.isChatInputCommand()) return;



if(interaction.commandName === "painel"){


const painel = require("./commands/painel");


await painel.execute(interaction);


}


});




client.login(process.env.TOKEN);
