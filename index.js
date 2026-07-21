require("dotenv").config();

const {
Client,
GatewayIntentBits,
Events,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle,
REST,
Routes
} = require("discord.js");


const { criarTicket } = require("./systems/tickets");


const client = new Client({

intents:[

GatewayIntentBits.Guilds,
GatewayIntentBits.GuildMembers,
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent

]

});




// BOT ONLINE + REGISTRA /PAINEL

client.once(Events.ClientReady, async () => {


console.log(`✅ ${client.user.tag} online!`);


client.user.setActivity(
"Tickets do Terror Tricolor"
);



const commands = [

{

name:"painel",

description:"Abrir painel de tickets do Terror Tricolor"

}

];



const rest = new REST({version:"10"})
.setToken(process.env.TOKEN);



try{


await rest.put(

Routes.applicationGuildCommands(

process.env.CLIENT_ID,

process.env.GUILD_ID

),

{

body:commands

}

);


console.log("✅ Comando /painel registrado!");



}catch(error){

console.error(error);

}



});






// INTERAÇÕES

client.on(Events.InteractionCreate, async interaction => {


try{


// COMANDO /PAINEL

if(interaction.isChatInputCommand()){


if(interaction.commandName === "painel"){



const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🔴🔵⚪ Terror Tricolor")

.setDescription(`

🏟️ **Central de Atendimento**

Escolha abaixo o motivo do seu contato.

🔴 Recrutamento TUTT
🔵 Suporte
⚪ Denúncias
❓ Dúvidas


Nossa equipe irá atender o mais rápido possível.

`)

.setFooter({

text:"Sistema oficial Terror Tricolor"

});



const botoes = new ActionRowBuilder()

.addComponents(


new ButtonBuilder()

.setCustomId("recrutamento")

.setLabel("Recrutamento")

.setEmoji("🔴")

.setStyle(ButtonStyle.Danger),



new ButtonBuilder()

.setCustomId("suporte")

.setLabel("Suporte")

.setEmoji("🔵")

.setStyle(ButtonStyle.Primary),



new ButtonBuilder()

.setCustomId("denuncia")

.setLabel("Denúncia")

.setEmoji("⚪")

.setStyle(ButtonStyle.Secondary),



new ButtonBuilder()

.setCustomId("duvida")

.setLabel("Dúvidas")

.setEmoji("❓")

.setStyle(ButtonStyle.Success)


);



await interaction.reply({

embeds:[embed],

components:[botoes]

});


}


}






// BOTÕES DO PAINEL


if(interaction.isButton()){



let motivo;



if(interaction.customId === "recrutamento")

motivo="Recrutamento TUTT";



if(interaction.customId === "suporte")

motivo="Suporte";



if(interaction.customId === "denuncia")

motivo="Denúncia";



if(interaction.customId === "duvida")

motivo="Dúvidas";




if(motivo){


await criarTicket(

interaction,

motivo

);


}



}



}catch(error){

console.error(error);

}



});






client.login(process.env.TOKEN);
