const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient.js");

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: `<h1>${body}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "This is the text format email",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject, body, toEmailId) => {
  const sendEmailCommand = createSendEmailCommand(
    toEmailId || "jeeveshmahato100@gmail.com",
    "jeeveshatwork@gmail.com",
    subject,
    body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    console.error("Email sending error:", caught);
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    // Don't throw the error, just return it so the main request doesn't fail
    return { error: caught.message };
  }
};

// snippet-end:[ses.JavaScript.email.sendEmailV3]
module.exports = { run };
