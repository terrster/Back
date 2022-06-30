const getEntidad = (clave) => {
    switch (clave) {
      case 'AS':
        return 'Aguascalientes'
      case 'BC':
        return 'Baja California'
      case 'BS':
        return 'Baja California Sur'
      case 'CC':
        return 'Campeche'
      case 'CS':
        return 'Chiapas'
      case 'CH':
        return 'Chihuahua'
      case 'CL':
        return 'Coahuila'
      case 'CM':
        return 'Colima'
      case 'DF':
        return 'Ciudad de México'
      case 'DG':
        return 'Durango'
      case 'GT':
        return 'Guanajuato'
      case 'GR':
        return 'Guerrero'
      case 'HG':
        return 'Hidalgo'
      case 'JC':
        return 'Jalisco'
      case 'MC':
        return 'México'
      case 'MN':
        return 'Michoacán'
      case 'MS':
        return 'Morelos'
      case 'NT':
        return 'Nayarit'
      case 'NL':
        return 'Nuevo León'
      case 'OC':
        return 'Oaxaca'
      case 'PL':
        return 'Puebla'
      case 'QT':
        return 'Querétaro'
      case 'QR':
        return 'Quintana Roo'
      case 'SP':
        return 'San Luis Potosí'
      case 'SL':
        return 'Sinaloa'
      case 'SR':
        return 'Sonora'
      case 'TC':
        return 'Tabasco'
      case 'TS':
        return 'Tamaulipas'
      case 'TL':
        return 'Tlaxcala'
      case 'VZ':
        return 'Veracruz'
      case 'YN':
        return 'Yucatán'
      case 'ZS':
        return 'Zacatecas'
      default:
        return 'No se encontro la entidad'
    }
  }
  
  const getCurp = (curp) => {
    let curpArray = curp.split('')
    let axo = curpArray[4] + curpArray[5] 
    let mes = curpArray[6] + curpArray[7]
    let dia = curpArray[8] + curpArray[9]
    let genero = curpArray[10]
    let entidad = getEntidad(`${curpArray[11] + curpArray[12]}`)
    let aoActual = new Date().getFullYear().toString()
    let claveAo = aoActual.substring(2, 2)
    let edad;
    if (axo < claveAo) {    // Si el año es menor a la clave de año
        axoTonumber = parseInt(`20${axo}`)
         edad = aoActual - axoTonumber
    } else {
        axoTonumber = parseInt(`19${axo}`)
        edad = aoActual - axoTonumber
    }
    let mesActual = new Date().getMonth() + 1
    let mesNacimiento = mesActual - mes
    console.log(mesNacimiento)
    if (mesNacimiento < 0) {
        mesNacimiento = mesNacimiento + 12
        edad = edad - 1
        console.log(mesNacimiento)}
    return {
        curp,
        axo,
        mes,
        dia,
        genero,
        entidad,
        edad
    }
  }
  module.exports = getCurp;