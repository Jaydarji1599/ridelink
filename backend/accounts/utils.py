from twilio.rest import Client
from random import randint
from twilio.rest import Client

def send_verification_code(phone_number, code):
    account_sid = 'your_account_sid'
    auth_token = 'your_auth_token'
    client = Client(account_sid, auth_token)
    message = client.messages \
                    .create(
                         body=f"Your verification code is {code}",
                         from_='your_twilio_phone_number',
                         to=phone_number
                     )
    print(message.sid)


# Function to generate a 6-digit confirmation code
def generate_phone_confirmation_code():
    return randint(100000, 999999)

# Function to send the confirmation code via SMS using Twilio
def send_phone_confirmation_code(phone_number, confirmation_code):
    account_sid = "YOUR_TWILIO_ACCOUNT_SID"
    auth_token = "YOUR_TWILIO_AUTH_TOKEN"
    client = Client(account_sid, auth_token)

    message = client.messages.create(
        to=phone_number,
        from_="YOUR_TWILIO_PHONE_NUMBER",
        body=f"Your confirmation code is: {confirmation_code}"
    )

    return message.sid
