import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
});

export default async function handler(req, res) {
  try {
    const payment = await mercadopago.payment.create({
      transaction_amount: 5,
      description: "Bolão Copa",
      payment_method_id: "pix",
      payer: {
        email: "teste@test.com",
      },
    });

    res.status(200).json({
      id: payment.body.id,
      qr_code: payment.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        payment.body.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
      detalhes: error,
    });
  }
}
