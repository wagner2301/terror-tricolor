const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

module.exports = {

name: "painel",

async execute(interaction){

const embed = new EmbedBuilder()
.setColor("#E30613")
.setTitle("🏟️ TERRITÓRIO TRICOLOR")
.setDescription(
`
Bem-vindo ao sistema oficial de atendimento do **Terror Tricolor**.

Selecione abaixo o motivo do contato:

🔴 Recrutamento TUTT
🔵 Suporte
⚪ Denúncias
❓ Dúvidas
`
)
.setFooter({
text:"Terror Tricolor | Sistema de Tickets"
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
