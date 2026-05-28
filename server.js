import express from "express";
import cors from "cors";
import mercadopago from "mercadopago";

const app = express();

app.use(cors());
app.use(express.json());

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN
});

app.post("/criar-pix", async (req, res) => {
  try {
    const { nome, jogo, palpite } = req.body;

    const pagamento = await mercadopago.payment.create({
      transaction_amount: 5,
      description: `Palpite ${jogo}`,
      payment_method_id: "pix",
      payer: {
        email: `user${Date.now()}@gmail.com`,
        first_name: nome
      }
    });

    res.json({
      id: pagamento.body.id,
      qr_code: pagamento.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        pagamento.body.point_of_interaction.transaction_data.qr_code_base64,
      status: pagamento.body.status
    });
  } catch (erro) {
    console.log(erro);

    res.status(500).json({
      erro: "Erro ao gerar PIX"
    });
  }
});

app.get("/", (req, res) => {
  res.send("Backend PIX funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando");
});