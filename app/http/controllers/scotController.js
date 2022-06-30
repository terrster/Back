const fs = require('fs');
const path = require('path');
const {PDFDocument} = require('pdf-lib');
const { readFileSync } = require("fs");
const getCurp = require('../helpers/curp');
const getData = require('../services/googleService');
const SelectOption = require('../helpers/optionsSelect');
const saveFile = require('../services/driveService');
const { nextTick } = require('process');

const estado_civil = (estado_civil) => {
    
}

const scot = {
  async generate() {
      const pdfPath = path.join(__dirname, '../../assets/scot.pdf');
      const JsonPath = path.join(__dirname, '../../assets/scot.json');
      const PDFdoc = await PDFDocument.load(readFileSync(pdfPath));
      const form = PDFdoc.getForm();
      let archivo = JSON.parse(fs.readFileSync(JsonPath, 'utf8'));
      let {fields} = archivo
      let nombre = '';
      let curp = await getData(`X2`);
      let Pdata = getCurp(curp)
      let Option;
      
      await Promise.all(fields.map(async item => {
          if (item.cell) {
              let value = await getData(`${item.cell}`)
              if (item.name ===  'Datos Personales_Nombre(s)'){
                nombre = value
              }
              if(item.type === 'PDFTextField'){
                form.getField(item.name).setText(`${value}`);
              } else {
                Option = form.getCheckBox(item.name).acroField.getWidgets()
                SelectOption(Option, `${value}`)
              }
          }
          switch (item.name) {
            case 'Datos personales_Sexo':
              Option = form.getCheckBox(item.name).acroField.getWidgets()
              Pdata.genero === 'M'?  SelectOption(Option, 'Femenino') : SelectOption(Option, 'Masculino')
              break;
            case 'Datos Personales_Edad-Años':
              form.getField(item.name).setText(`${Pdata.edad}`);
              break;
            case 'Datos Personales_Fecha de nacimiento-Día':
              form.getField(item.name).setText(`${Pdata.dia}`);
              break;
            case 'Datos Personales_Fecha de nacimiento-Mes':
              form.getField(item.name).setText(`${Pdata.mes}`);
              break;
            case 'Datos Personales_Fecha de nacimiento-Año':
              form.getField(item.name).setText(`${Pdata.axo}`);
              break;
            case 'Datos Personales_Entidad de nacimiento':
              form.getField(item.name).setText(`${Pdata.entidad}`);
              break;
            case 'Datos personales_Estado civil':
              let res = await getData(`R2`)
              res = res.split('/')
              console.log(res[0])
              Option = form.getCheckBox(item.name).acroField.getWidgets()
              res[0] === 'Casado(a)'?  SelectOption(Option, 'Casado') : SelectOption(Option, 'Soltero')
              if(res[0] === 'Casado(a)'){
                Option = form.getCheckBox('Datos personales_Regimen').acroField.getWidgets()
                res[1] === 'BienesSeparados'?  SelectOption(Option, 'Separación de Bienes') : SelectOption(Option, 'Sociedad Conyugal')
                break;
              } else {
                break;
              }
      }}
      ))
      
        const pdfBytes = await PDFdoc.save();
        const buffer = Buffer.from(pdfBytes);
        // fs.unlinkSync(pdfPath2), console.log('borrado')
        fs.writeFileSync(path.join(__dirname, `../../temp/${nombre}.pdf`), buffer), (err) => {
          if (err) return console.error(err);
          console.log('Pdf Error');
        }
        // try {
        //   await saveFile();
        // } catch (error) {
        //   console.log(error);
        // }
      },
}

module.exports = scot;