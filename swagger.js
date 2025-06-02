const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Games Hub Api',
        description: 'Games Hub Api Documentation',
    },
    host: 'https://gamehub-stab.onrender.com',
    schemes: ['https', 'http'],
}

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);