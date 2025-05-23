import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['']
})

export const docs = google.docs({ version: 'v1', auth })