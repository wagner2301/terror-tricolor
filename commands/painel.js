const {
SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
StringSelectMenuBuilder
} = require("discord.js");


module.exports = {

data: new SlashCommandBuilder()

.setName("painel")

.setDescription("Painel de recrutamento"),



async execute(interaction){


await interaction.deferReply({
ephemeral:true
});



const embed = new EmbedBuilder()

.setColor("#E30613")

.setTitle("🔴🔵⚪ Terror Tricolor | Recrutamento")

.setDescription(`

Bem-vindo ao sistema oficial de recrutamento do **Terror Tricolor**.


Selecione abaixo para iniciar seu atendimento.


🔴 **Recrutamento TUTT**

Nossa equipe entrará em contato com você.


🔵 Terror Tricolor
⚪ Atendimento Oficial

`)

.setImage("https://cdn.discordapp.com/attachments/1493905634360295504/1524518701116952677/ChatGPT_Image_8_07_2026_17_52_15.png");




const menu = new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId("ticket_menu")

.setPlaceholder("Escolha uma opção.")

.addOptions(

{
label:"Recrutamento TUTT",
description:"Abrir recrutamento",
value:"recrutamento",
emoji:"🔴"
}

)

);



await interaction.channel.send({

embeds:[embed],

components:[menu]

});



await interaction.editReply({

content:"✅ Painel enviado!"

});


}

};
