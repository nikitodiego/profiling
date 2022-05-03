const express = require('express');
const winston = require('winston');
const compression = require('compression')

const PORT = process.argv[2] || 8080
const app = express();

const logger = winston.createLogger({
    //level: 'info',
    transports:[
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'error.log', level: 'error' })
    ]
})

app.get('/info', compression(), (req, res) => {
    //logger.debug('Probando debug')
    logger.info('Get request to route /info')
    res.send({
        directorio: process.cwd(),
        id: process.pid, version: process.version, titulo: process.title, OS: process.platform, "memory usage": process.memoryUsage()
    })
})

app.get('/bloq', (req, res) => {
    logger.info('Get request to route /bloq')
    let cant = parseInt(req.query.cant)
    if (!isNaN(cant)){
        logger.info('Ha ingresado un parámetro válido')
        //console.log(calculo(cant))
        res.send(calculo(cant))
    }else{
        logger.error('Ingrese un parámetro válido')
        res.send('Ingrese un parámetro valido')
    }    
});


app.get('*', (req,res) =>{
    const {url, method} = req
    logger.warn(`Ruta ${method} ${url} no implementada`)
    res.send(`Ruta ${method} ${url} no implementada`)
})


const server = app.listen(PORT, () => {
    logger.info(`Server on port ${PORT}`);
})
server.on('error', error => logger.error(`Error en servidor ${error}`))

function calculo(num) {
    const object = {}
    for (i = 0; i < num; i++) {
        let a = Math.floor(Math.random() * 1000)
        if (object[a]) {
            object[a] += 1;
        } else {
            object[a] = 1;
        }
    }
    return object;
}
