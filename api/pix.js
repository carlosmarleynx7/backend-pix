import mercadopago from "mercadopago";

mercadopago.configure({
  access_token: process.env.MERCADO_PAGO_TOKEN,
});

export default async function handler(req, res) {
  try {
    const payment_data = {
      transaction_amount: 5,
      description: "Bolão Copa",
      payment_method_id: "pix",
      payer: {
        email: "testuser4422631723884201271@testuser.com",
      },
    };

    const response = await mercadopago.payment.create(payment_data);

    res.status(200).json({
      qr_code:
        response.body.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        response.body.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
      details: error.response?.body,
    });
  }
}
