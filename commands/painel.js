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

.setTitle("🔴🔵⚪ Centro de Atendimento")

.setDescription(
`
Olá! Bem-vindo(a) ao sistema de tickets.

Para abrir um ticket, por favor clique no botão abaixo e nos informe o motivo do seu contato. Estamos aqui para ajudar!


**Atendimento Via Ticket**

Após enviar o motivo, será gerado um canal de texto privado para que possamos ajudá-lo de forma segura e ágil. Estamos aqui para ajudar!
`
)

.setImage(
"https://cdn.discordapp.com/attachments/1493905634360295504/1524518701116952677/ChatGPT_Image_8_07_2026_17_52_15.png"
)

.setFooter({
text:"Terror Tricolor | Sistema de Tickets"
});





const menu = new ActionRowBuilder()

.addComponents(

new StringSelectMenuBuilder()

.setCustomId("ticket_menu")

.setPlaceholder("Escolha uma opção.")

.addOptions([

{

label:"Recrutamento TUTT",

description:"Abrir ticket de recrutamento",

value:"recrutamento",

emoji:"🔴"

}

])

);





await interaction.channel.send({

embeds:[embed],

components:[menu]

});





await interaction.editReply({

content:"✅ Painel enviado com sucesso!"

});



}

};
