const contactmail = require("../utils/contactMail");

const sendContactMail = async (req, res) => {
  try {
    const { username, email, message } = req.body;
    const subject = "Tu as un nouveau message !";
    const html = `
      <h3>Message de ${username}</h3>
      <p>Email : ${email}</p>
      <p>Message :</p>
      <p>${message}</p>
    `;
    await contactmail(process.env.EMAIL_USER, subject, html);
    res.status(200).json({ message: "Message envoyé avec succès !" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erreur lors de l'envoi du message", error });
  }
};

module.exports = { sendContactMail };
