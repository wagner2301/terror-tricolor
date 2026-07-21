require("dotenv").config();

const {
  Client,
  GatewayIntentBits,
  Collection,
  Events
} = require("discord.js");

const { criarTicket } = require("./systems/tickets");

const client = new Client({

  intents: [

    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent

  ]

});


client.once(Events.ClientReady, () => {

console.log(`✅ ${client.user.tag} online!`);

client.user.setActivity(
"Tickets do Terror Tricolor"
);

});



client.on(Events.InteractionCreate, async interaction => {


try {


/* COMANDO /PAINEL */

if(interaction.isChatInputCommand()) {


if(interaction.commandName === "painel") {


const {
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle
} = require("discord.js");


const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🏟️ TERRITÓRIO TRICOLOR")

.setDescription(`

Bem-vindo ao sistema oficial de atendimento.

Escolha abaixo o motivo do contato:

🔴 Recrutamento TUTT
🔵 Suporte
⚪ Denúncias
❓ Dúvidas

`)

.setFooter({
text:"Terror Tricolor"
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


/* BOTÕES */

if(interaction.isButton()){


if(
interaction.customId === "recrutamento" ||
interaction.customId === "suporte" ||
interaction.customId === "denuncia" ||
interaction.customId === "duvida"
){


let motivo;


if(interaction.customId === "recrutamento")
motivo="Recrutamento TUTT";


if(interaction.customId === "suporte")
motivo="Suporte";


if(interaction.customId === "denuncia")
motivo="Denúncia";


if(interaction.customId === "duvida")
motivo="Dúvidas";


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
