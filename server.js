import express from "express";
import cors from "cors";
import { MercadoPagoConfig, Preference } from "mercadopago";

const app = express();

app.use(cors());
app.use(express.json());

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
});

app.post("/create-payment", async (req, res) => {

  try {

    const preference = new Preference(client);

    const response = await preference.create({
      body: {

        items: [
          {
            title: "Palpite Bolão Copa",
            quantity: 1,
            unit_price: 5
          }
        ],

        back_urls: {
          success: "https://bolaocopa2026pi.netlify.app/index.html",
          failure: "https://bolaocopa2026pi.netlify.app/index.html",
          pending: "https://bolaocopa2026pi.netlify.app/index.html"
        },

        auto_return: "approved"
      }
    });

    res.json({
      init_point: response.init_point
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      error: error.message
    });

  }

});

app.listen(3000, () => {
  console.log("Servidor rodando");
});