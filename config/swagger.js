import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    userModule: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'User Module API Documentation',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000/user',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ['./modules/user/**/*.route.js'],
    },
    businessModule: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Business Module API Documentation',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000/business',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ['./modules/business/**/*.route.js'],
    },
    adminModule: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Admin Module API Documentation',
                version: '1.0.0',
            },
            servers: [
                {
                    url: 'http://localhost:3000/admin',
                },
            ],
            components: {
                securitySchemes: {
                    bearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                        bearerFormat: 'JWT',
                    },
                },
            },
        },
        apis: ['./modules/admin/**/*.route.js'],
    },
};

const openapiSpecification = {
    userModule: swaggerJsdoc(options.userModule),
    businessModule: swaggerJsdoc(options.businessModule),
    adminModule: swaggerJsdoc(options.adminModule),
}

export default openapiSpecification;