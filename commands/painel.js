const {

SlashCommandBuilder,
EmbedBuilder,
ActionRowBuilder,
ButtonBuilder,
ButtonStyle

} = require("discord.js");



module.exports = {



data: new SlashCommandBuilder()

.setName("painel")

.setDescription("Abrir painel de recrutamento Terror Tricolor"),




async execute(interaction){



const embed = new EmbedBuilder()


.setColor("#005CA9")


.setTitle("🔵🔴⚪ Terror Tricolor | Recrutamento")


.setDescription(`


Bem-vindo ao sistema oficial de recrutamento.


Clique no botão abaixo para iniciar seu recrutamento.


🔴 **Recrutamento TUTT**


Nossa equipe entrará em contato com você.


🔵 Terror Tricolor
⚪ Atendimento Oficial


`);



const botoes = new ActionRowBuilder()


.addComponents(


new ButtonBuilder()

.setCustomId("recrutamento")

.setLabel("Recrutamento")

.setEmoji("🔴")

.setStyle(ButtonStyle.Danger)


);



await interaction.reply({


embeds:[embed],


components:[botoes]


});



}


};
