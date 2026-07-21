const {
  ChannelType,
  PermissionFlagsBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle
} = require("discord.js");

const config = require("../config.json");


async function criarTicket(interaction, motivo) {

  const guild = interaction.guild;

  const canal = await guild.channels.create({

    name: `🎫・${interaction.user.username}`,

    type: ChannelType.GuildText,

    parent: config.categoriaTickets,

    permissionOverwrites: [

      {
        id: guild.id,
        deny: [
          PermissionFlagsBits.ViewChannel
        ]
      },

      {
        id: interaction.user.id,
        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory
        ]
      },

      ...config.cargosStaff.map(cargo => ({

        id: cargo,

        allow: [
          PermissionFlagsBits.ViewChannel,
          PermissionFlagsBits.SendMessages,
          PermissionFlagsBits.ReadMessageHistory
        ]

      }))

    ]

  });


  const embed = new EmbedBuilder()

  .setColor(config.cor)

  .setTitle("🏟️ TERRITÓRIO TRICOLOR")

  .setDescription(`

👤 Usuário:
${interaction.user}


📌 Motivo:
**${motivo}**


Aguarde um membro da equipe.


`)

  .setFooter({
    text:"Terror Tricolor | Sistema de Tickets"
  });


  const botoes = new ActionRowBuilder()

  .addComponents(

    new ButtonBuilder()
    .setCustomId("assumir_ticket")
    .setLabel("Assumir Ticket")
    .setEmoji("🛠️")
    .setStyle(ButtonStyle.Success),


    new ButtonBuilder()
    .setCustomId("fechar_ticket")
    .setLabel("Fechar Ticket")
    .setEmoji("❌")
    .setStyle(ButtonStyle.Danger)

  );


  await canal.send({

    content:
    `${interaction.user} ${config.cargosStaff.map(c=>`<@&${c}>`).join(" ")}`,

    embeds:[embed],

    components:[botoes]

  });


  await interaction.reply({

    content:`✅ Seu ticket foi criado: ${canal}`,

    ephemeral:true

  });


}


module.exports = {
  criarTicket
};
