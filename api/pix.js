import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_TOKEN,
});

const payment = new Payment(client);

export default async function handler(req, res) {
  try {
    const body = {
      transaction_amount: 5,
      description: "Bolão Copa",
      payment_method_id: "pix",
      payer: {
        email: "teste@teste.com",
      },
    };

    const result = await payment.create({ body });

    res.status(200).json({
      qr_code:
        result.point_of_interaction.transaction_data.qr_code,
      qr_code_base64:
        result.point_of_interaction.transaction_data.qr_code_base64,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: error.message,
    });
  }
}
