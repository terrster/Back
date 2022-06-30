const { google } = require('googleapis');
const path = require('path');

const getDriveService = () => {
    const SCOPES = ['https://www.googleapis.com/auth/drive'];
    const TOKEN_PATH = path.join(__dirname, 'pruebaCre.json')

    const auth = new google.auth.GoogleAuth({
    keyFile: TOKEN_PATH,
    scopes: SCOPES,
    });
    const drive = google.drive({version: 'v3', auth});
    return drive;
};

const saveFile = async () => {
    const drive = getDriveService();
    // const folder = '17jM74uieWWG81JjEOS5DHBrIz6fMRFO7';
    // const res = await drive.files.create({
    // resource: file,
    // media: {
    //     mimeType: 'application/pdf',
    //     body: fs.createReadStream(file),
    //     parents:[folder]
    // },
    // fields: 'id',
    // });
    // return res.data.id;
    try {
        const res = await drive.files.list({
          q: 'mimeType=\'image/jpeg\'',
          fields: 'nextPageToken, files(id, name)',
          spaces: 'drive',
        });
        Array.prototype.push.apply(files, res.files);
        res.data.files.forEach(function(file) {
          console.log('Found file:', file.name, file.id);
        });
        return res.data.files;
      } catch (err) {
        // TODO(developer) - Handle error
        throw err;
      }
}

module.exports = saveFile;