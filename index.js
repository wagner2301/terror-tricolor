const {
Client,
GatewayIntentBits,
Collection
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



console.log(

`✅ Comando carregado: ${command.data.name}`

);


}





// ==========================
// SISTEMA TICKETS
// ==========================


const tickets = require("./systems/tickets");







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




const autorizado = interaction.member.roles.cache.some(

role => cargosPermitidos.includes(role.id)

);







// ASSUMIR


if(interaction.customId === "assumir"){



if(!autorizado){


return interaction.reply({

content:"❌ Você não tem permissão para assumir tickets.",

ephemeral:true

});


}




await interaction.reply({

content:`🛠️ Ticket assumido por ${interaction.user}`

});


return;


}








// FECHAR


if(interaction.customId === "fechar"){



if(!autorizado){


return interaction.reply({

content:"❌ Você não tem permissão para fechar tickets.",

ephemeral:true

});


}




await interaction.reply({

content:`🔒 Ticket fechado por ${interaction.user}. Apagando em 5 segundos...`

});




setTimeout(()=>{


interaction.channel.delete().catch(()=>{});


},5000);



return;


}



}



}

catch(error){


console.error(error);



if(!interaction.replied){

interaction.reply({

content:"❌ Ocorreu um erro no sistema.",

ephemeral:true

}).catch(()=>{});


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
