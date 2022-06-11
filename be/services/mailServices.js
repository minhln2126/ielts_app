const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const cron = require("node-cron");
const OAuth2 = google.auth.OAuth2;
const c = require("../constants");
const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    process.env.MAILSERVICE_CLIENT_ID,
    process.env.MAILSERVICE_CLIENT_SECRET,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.MAILSERVICE_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EDULOGY_EMAIL,
      accessToken,
      clientId: process.env.MAILSERVICE_CLIENT_ID,
      clientSecret: process.env.MAILSERVICE_CLIENT_SECRET,
      refreshToken: process.emitWarning.MAILSERVICE_REFRESH_TOKEN,
    },
  });
  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};

function createRemindEmail(mInfo) {
  let { minute, day, month, year, hour, customer_name, service_name, email } =
    mInfo;
  console.log(mInfo);
  let date = `${day}/${month}/${year} at ${hour} : ${minute}`;
  let msg = `Dear ${customer_name},

We look forward to welcoming you for your ${service_name} service on ${date}.
As always, please let us know if there is anything more we can do for you.
You may call us at ${process.env.IDENT_PHONE} with any questions or special requests.

Warm regards,

iDent`;
  return {
    subject: "Appoinment reminder.",
    text: msg,
    to: email,
    from: `iDent - Dentistry<${process.env.IDENT_EMAIL}>`,
  };
}

function createCancelEmail(dentist, date, time, service, customer, email) {
  let msg = `Dear ${customer},

We regret to inform you that we have to cancel your "${service}" appointment with Dr.${dentist} scheduled at ${time} on ${date}.
Dr.${dentist} has notified that he could not go to work this day.
We sincerely apologize for all the inconveniences.

Thank you once again for your consideration.

iDent`;
  return {
    subject: "Appoinment canceled.",
    text: msg,
    to: email,
    from: `iDent - Dentistry<${process.env.IDENT_EMAIL}>`,
  };
}

const scheduleEmail = async (req, res) => {
  try {
    let { minute, day, month, hour } = req.body;
    let emailMessage = createRemindEmail(req.body);
    cron.schedule(`${minute} ${hour - 1} ${day} ${month} *`, async () => {
      await sendEmail(emailMessage).then().catch(err);
    });
    console.log("email scheduled");
  } catch (err) {
    console.log(err);
    req.sendEmailErr = true;
  }
};
module.exports = {
  scheduleEmail,
  createCancelEmail,
  sendEmail,
};
