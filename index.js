const {
    Client,
    GatewayIntentBits,
    Collection
} = require("discord.js");

const express = require("express");
require("dotenv").config();

const app = express();


// ===============================
// SERVIDOR PARA RENDER
// ===============================

app.get("/", (req, res) => {
    res.send("🔴🔵⚪ Terror Tricolor online!");
});


app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Servidor web iniciado!");
});



// ===============================
// CLIENT DISCORD
// ===============================

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]

});



client.commands = new Collection();



// ===============================
// SISTEMA DE TICKET
// ===============================

const tickets = require("./systems/tickets");




// ===============================
// BOT ONLINE
// ===============================

client.once("ready", () => {

    console.log(`✅ Terror Tricolor#${client.user.tag} online!`);

});




// ===============================
// COMANDOS
// ===============================

client.on("interactionCreate", async interaction => {


    // COMANDO /PAINEL

    if(interaction.isChatInputCommand()){


        if(interaction.commandName === "painel"){


            const {
                EmbedBuilder,
                ActionRowBuilder,
                ButtonBuilder,
                ButtonStyle
            } = require("discord.js");



            const embed = new EmbedBuilder()

            .setColor("#E30613")

            .setTitle("🔴🔵⚪ Terror Tricolor")

            .setDescription(
`
🎫 **Central de Atendimento**

Escolha abaixo o motivo do seu contato.

🔴 Recrutamento TUTT
🔵 Suporte
⚪ Denúncias
❓ Dúvidas
`
            );



            const botoes = new ActionRowBuilder()

            .addComponents(

                new ButtonBuilder()
                .setCustomId("recrutamento")
                .setLabel("Recrutamento")
                .setStyle(ButtonStyle.Danger),


                new ButtonBuilder()
                .setCustomId("suporte")
                .setLabel("Suporte")
                .setStyle(ButtonStyle.Primary),


                new ButtonBuilder()
                .setCustomId("denuncia")
                .setLabel("Denúncia")
                .setStyle(ButtonStyle.Secondary),


                new ButtonBuilder()
                .setCustomId("duvidas")
                .setLabel("Dúvidas")
                .setStyle(ButtonStyle.Success)

            );



            await interaction.reply({

                embeds:[embed],

                components:[botoes]

            });


        }

    }



    // ===============================
    // CRIAR TICKET
    // ===============================


    if(interaction.isButton()){


        if(

            interaction.customId === "recrutamento" ||

            interaction.customId === "suporte" ||

            interaction.customId === "denuncia" ||

            interaction.customId === "duvidas"

        ){


            let motivo = interaction.customId;


            await tickets.criarTicket(
                interaction,
                motivo
            );


        }



        // ===============================
        // ASSUMIR TICKET
        // ===============================


        if(interaction.customId === "assumir"){


            await interaction.reply({

                content:
                `🛠️ ${interaction.user} assumiu este atendimento.`

            });


        }




        // ===============================
        // FECHAR TICKET
        // ===============================


        if(interaction.customId === "fechar"){


            await interaction.reply({

                content:
                "🔒 Ticket será fechado em 5 segundos..."

            });



            setTimeout(()=>{


                interaction.channel.delete()
                .catch(err =>
                    console.log(
                        "Erro ao fechar:",
                        err
                    )
                );


            },5000);


        }


    }



});




// ===============================
// LOGIN
// ===============================


client.login(process.env.TOKEN);
