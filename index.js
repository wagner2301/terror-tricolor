const { Client, GatewayIntentBits, Collection } = require("discord.js");
const express = require("express");
require("dotenv").config();

const app = express();

app.get("/", (req, res) => {
    res.send("🔴🔵⚪ Terror Tricolor online!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Servidor web iniciado!");
});


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});


client.commands = new Collection();


// carregar sistema de tickets
const tickets = require("./systems/tickets");


// quando bot ligar
client.once("ready", async () => {

    console.log(`✅ Terror Tricolor#${client.user.tag} online!`);

});


// comandos e botões
client.on("interactionCreate", async interaction => {


    if (interaction.isChatInputCommand()) {

        if (interaction.commandName === "painel") {

            const painel = require("./painel");

            painel(interaction);

        }

    }



    if (interaction.isButton()) {


        if (
            interaction.customId === "recrutamento" ||
            interaction.customId === "suporte" ||
            interaction.customId === "denuncia" ||
            interaction.customId === "duvidas"
        ) {


            let motivo = "";


            if(interaction.customId === "recrutamento")
                motivo = "Recrutamento TUTT";


            if(interaction.customId === "suporte")
                motivo = "Suporte";


            if(interaction.customId === "denuncia")
                motivo = "Denúncia";


            if(interaction.customId === "duvidas")
                motivo = "Dúvidas";



            await tickets.criarTicket(
                interaction,
                motivo
            );

        }



        if(interaction.customId === "fechar"){

            await interaction.channel.delete();

        }



        if(interaction.customId === "assumir"){


            await interaction.reply({
                content:"🛠️ Ticket assumido!",
                ephemeral:false
            });


        }

    }


});



client.login(process.env.TOKEN);
