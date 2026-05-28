import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN
});

export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(200).json({
      mensagem: "Backend PIX funcionando"
    });
  }

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

    res.status(200).json({
      qr_code:
        pagamento.body.point_of_interaction.transaction_data.qr_code,

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
}
