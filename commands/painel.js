const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");


module.exports = {

data: new SlashCommandBuilder()

.setName("painel")

.setDescription("Envia o painel de recrutamento"),



async execute(interaction){


const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🔴🔵⚪ Terror Tricolor | Recrutamento")

.setDescription(`

Bem-vindo ao sistema oficial de recrutamento do **Terror Tricolor**.

Clique abaixo para iniciar seu recrutamento.


🔴 **Recrutamento TUTT**

Nossa equipe entrará em contato com você.


🔵 Terror Tricolor
⚪ Atendimento Oficial

`)


.setImage("https://cdn.discordapp.com/attachments/1493905634360295504/1524518701116952677/ChatGPT_Image_8_07_2026_17_52_15.png?ex=6a5fdc2e&is=6a5e8aae&hm=fb8fdca70aeb0edf9bbd2dc04218a9b2f18d57028261c2216d5f04cffa5aad0b&");



const menu = new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId("ticket_menu")

.setPlaceholder("Escolha uma opção.")

.addOptions([

{
label:"Recrutamento TUTT",
description:"Abra seu recrutamento",
value:"recrutamento",
emoji:"🔴"
}

])

);



await interaction.reply({

content:"✅ Painel enviado!",

ephemeral:true

});



await interaction.channel.send({

embeds:[embed],

components:[menu]

});


}

};
