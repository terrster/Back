const { google } = require('googleapis');
const path = require('path');

const getSheetsService = () => {
    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
    const TOKEN_PATH = path.join(__dirname, 'pruebaCre.json')

    const auth = new google.auth.GoogleAuth({
    keyFile: TOKEN_PATH,
    scopes: SCOPES,
    });
    const sheets = google.sheets({version: 'v4', auth});
    return sheets;
};

const getData = async (cell) => {
    const sheets = getSheetsService();
    const res = await sheets.spreadsheets.values.get({
    spreadsheetId: '1y_gvDeVRSOapFVM5lUJV_0rXsb9HTpYVnMQsRt9cxjY',
    range: cell,
    });
    const rows = ((res.data.values[0])[0]);
    return rows;
}

module.exports = getData;