import { google } from 'googleapis'

export const auth = new google.auth.GoogleAuth({
    keyFile: "tigr-shop-3e56ab3545d6.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets"
});

