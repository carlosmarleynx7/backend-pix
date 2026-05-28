import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
});

export default async function handler(req, res) {
  try {
    const payment = new Payment(client);

    const body = {
      transaction_amount: 5,
      description: "Bolão Copa",
      payment_method_id: "pix",

      payer: {
        email: "test_user_4422631723884201271@testuser.com",
      },
    };

    const response = await payment.create({ body });

    res.status(200).json({
      qr_code:
        response.point_of_interaction.transaction_data.qr_code,

      qr_code_base64:
        response.point_of_interaction.transaction_data.qr_code_base64,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
      details: error,
    });
  }
}
