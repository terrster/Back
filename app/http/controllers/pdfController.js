const scot = require('../controllers/scotController');
const userController = {
    create: (req, res) => {
        try {
            console.log('hola bb')
            scot.generate();
            res.status(200).json({
                message: 'Se ha generado el pdf'
            });
        }
        catch (error) {
            console.log(error)
            res.status(500).json({
                message: 'Error al generar el pdf'
            });
        }
    },
    remake: (req, res) => {
        res.send('remake');
    }
}

module.exports = userController;