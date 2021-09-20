import AWS from 'aws-sdk';

const ses = new AWS.SES({ region: 'ap-southeast-2' });

async function sendMail(event, context) {

  const record = event.Records[0];
  console.log('record processing', record);

  const email = JSON.parse(record.body);
  const { subject, body, sender, recipient } = email;
  // { "subject": "jAAA", "body": "my body", "sender": "rastha2000@gmail.com", "recipient": "rasela.tharaka@gmail.com" }

  const params = {
    Source: sender,
    Destination: {
      ToAddresses: [recipient]
    },
    Message: {
      Body: {
        Text: {
          Data: body
        }
      },
      Subject: {
        Data: subject
      }
    }
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch(error){
    console.error(error);
  }
}

export const handler = sendMail;
