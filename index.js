const { 
    Client, 
    GatewayIntentBits, 
    Collection 
} = require("discord.js");

const express = require("express");
require("dotenv").config();


// =======================
// SERVIDOR PARA O RENDER
// =======================

const app = express();

app.get("/", (req, res) => {
    res.send("🔴🔵⚪ Terror Tricolor online!");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("🌐 Servidor web iniciado!");
});


// =======================
// BOT DISCORD
// =======================

const client = new Client({

    intents: [

        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent

    ]

});


client.commands = new Collection();


// sistema tickets
const tickets = require("./systems/tickets");



// =======================
// BOT ONLINE
// =======================

client.once("ready", () => {

    console.log(`✅ Terror Tricolor#${client.user.tag} online!`);

});



// =======================
// INTERAÇÕES
// =======================

client.on("interactionCreate", async interaction => {


    // COMANDO /painel

    if(interaction.isChatInputCommand()){


        if(interaction.commandName === "painel"){

            const painel = require("./painel");

            painel(interaction);

        }

    }



    // BOTÕES

    if(interaction.isButton()){


        // criar ticket

        if(
            interaction.customId === "recrutamento" ||
            interaction.customId === "suporte" ||
            interaction.customId === "denuncia" ||
            interaction.customId === "duvidas"
        ){


            let motivo;



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



        // ======================
        // ASSUMIR TICKET
        // ======================


        if(interaction.customId === "assumir"){


            await interaction.reply({

                content:
                `🛠️ **Ticket assumido por ${interaction.user}!**\n\n` +
                `O atendente irá cuidar deste atendimento.`,

                ephemeral:false

            });


        }



        // ======================
        // FECHAR TICKET
        // ======================


        if(interaction.customId === "fechar"){


            await interaction.reply({

                content:
                "❌ Fechando ticket...",

                ephemeral:false

            });


            setTimeout(()=>{

                interaction.channel.delete();

            },3000);


        }


    }


});



// =======================
// LOGIN
// =======================

client.login(process.env.TOKEN);
