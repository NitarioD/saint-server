const axios = require("axios");

exports.verify = async (req, res) => {
  const ref = req.params.ref;

  const paystackApiUrl = `https://api.paystack.co/transaction/verify/${ref}`;

  try {
    const { data } = await axios.get(paystackApiUrl, {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
      },
    });

    // Check if the request was successful
    if (data.data.status === "success") {
      // Transaction is valid, handle the success
      return res.json({ ok: true });
    } else {
      // Transaction verification failed, handle the error
      return res.json({ ok: false });
    }
  } catch (error) {
    // Handle any network or request errors
    console.error("Error verifying transaction:", error.message);
  }
};
