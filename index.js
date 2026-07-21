const { 
Client, 
GatewayIntentBits, 
Collection, 
EmbedBuilder 
} = require("discord.js");

const express = require("express");
require("dotenv").config();

const app = express();


// WEB SERVICE RENDER

app.get("/", (req,res)=>{

res.send("🔴🔵⚪ Terror Tricolor online!");

});


app.listen(process.env.PORT || 3000, ()=>{

console.log("🌐 Servidor web iniciado!");

});




// CLIENT DISCORD

const client = new Client({

intents:[

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent

]

});



client.commands = new Collection();



// SISTEMA DE TICKETS

const tickets = require("./systems/tickets");




// QUANDO BOT LIGA

client.once("ready",()=>{


console.log(`✅ Terror Tricolor#${client.user.tag} online!`);


});




// INTERAÇÕES

client.on("interactionCreate", async interaction => {



try{



// MENU DO PAINEL


if(interaction.isStringSelectMenu()){



if(interaction.customId === "abrir_ticket"){



if(interaction.values[0] === "recrutamento"){



await tickets.criarTicket(

interaction,

"RECRUTAMENTO"

);



}


}


}






// BOTÕES


if(interaction.isButton()){



const cargosStaff = [


"1493905534376742974",
"1493905535492427836",
"1528241558204317788",
"1493905538566590524",
"1493905541699997726",
"1493905547626287197"


];



const pode = interaction.member.roles.cache.some(role =>

cargosStaff.includes(role.id)

);






// ASSUMIR TICKET


if(interaction.customId === "assumir"){



if(!pode){


return interaction.reply({

content:"❌ Apenas recrutadores podem assumir tickets.",

ephemeral:true

});


}



await interaction.reply({

content:`🛠️ ${interaction.user} assumiu este ticket.`

});



}







// FECHAR TICKET


if(interaction.customId === "fechar"){



if(!pode){


return interaction.reply({

content:"❌ Apenas recrutadores podem fechar tickets.",

ephemeral:true

});


}




await interaction.reply({

content:"🔒 Ticket fechado. Este canal será apagado em 5 segundos."

});



setTimeout(()=>{


interaction.channel.delete();


},5000);



}



}





}catch(error){


console.log(error);


}



});





// LOGIN


client.login(process.env.TOKEN);
