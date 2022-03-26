# Twilio QR Code

Node Express APP to send QR Code via SMS using Twilio's service

## Running Project in Local

1. Install dependencies using `npm i`

2. Create .env file in root directory and add following configurations:

```
NODE_ENV= "local"

TWILIO_SID = "<twilio_sid>"
TWILIO_AUTH_TOKEN= "<twilio_auth_token>"
TWILIO_NUMBER = "<twilio_number>"

```

3. Start application using `npm run dev`

## Running Project in Production

1. Set environment variables for the following configurations:

```
TWILIO_SID = "<twilio_sid>"
TWILIO_AUTH_TOKEN= "<twilio_auth_token>"
TWILIO_NUMBER = "<twilio_number>"

```

Also set API URL in the `constants/production.js` in apiUrl field without preceding /

2. Start application using `npm start`

## Optional Configurations

Public static/assets folder name can be changed by changing the following configurations in environment `constants/<env>.js`:

```
publicFolder: "<folder_name>"
qrCodesFolder: "<folder_name>"
```
