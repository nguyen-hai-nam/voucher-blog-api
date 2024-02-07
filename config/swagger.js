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
                schemas:{
                    ProductCategory: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                            },
                        },
                    },
                    ProductCategoryCreate: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                            },
                        },
                    },
                    ProductCategoryUpdate: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                            },
                        },
                    },
                    Product: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            category_id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['AVAILABLE', 'UNAVAILABLE'],

                            },
                            images: {
                                type: 'array',
                                items: {
                                    type: 'object',
                                    properties: {
                                        id: {
                                            type: 'string',
                                            format: 'uuid',
                                        },
                                        url: {
                                            type: 'string',
                                        },
                                    },
                                },
                            },
                        },
                    },
                    ProductCreate: {
                        type: 'object',
                        properties: {
                            category_id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            name: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['AVAILABLE', 'UNAVAILABLE'],
                            },
                            images: {
                                type: 'array',
                                items: {
                                    type: 'string',
                                    format: 'uuid',
                                },
                            },
                        },
                    },
                    ProductUpdate: {
                        type: 'object',
                        properties: {
                            name: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                            price: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['AVAILABLE', 'UNAVAILABLE'],
                            },
                        },
                    },
                    Voucher: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            campaign_id: {
                                type: 'string',
                                format: 'uuid',
                            },
                            index: {
                                type: 'number',
                            },
                            type: {
                                type: 'string',
                                enum: ['DISCOUNT', 'FIXED_PRICE'],
                            },
                            media_url: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                            discount_type: {
                                type: 'string',
                                enum: ['PERCENT', 'VALUE'],
                            },
                            percent: {
                                type: 'number',
                            },
                            max_value: {
                                type: 'number',
                            },
                            value: {
                                type: 'number',
                            },
                            fixed_price: {
                                type: 'number',
                            },
                            usage: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['ACTIVE', 'INACTIVE'],
                            },
                            collected_count: {
                                type: 'number',
                            },
                            max_use: {
                                type: 'number',
                            },
                            condition_min_bill_value: {
                                type: 'number',
                            },
                            condition_beginning_hour: {
                                type: 'number',
                            },
                            condition_ending_hour: {
                                type: 'number',
                            },
                            condition_target: {
                                type: 'string',
                                enum: ['ALL', 'NEW_CUSTOMER'],
                            },
                        },
                    },
                    VoucherCreate: {
                        type: 'object',
                        required: ['media'],
                        properties: {
                            index: {
                                type: 'number',
                            },
                            type: {
                                type: 'string',
                                enum: ['DISCOUNT', 'GIFT'],
                            },
                            media: {
                                type: 'string',
                                format: 'binary',
                                description: 'Image or video file',
                            },
                            description: {
                                type: 'string',
                            },
                            discount_type: {
                                type: 'string',
                                enum: ['PERCENT', 'VALUE', 'FIXED_PRICE'],
                            },
                            percent: {
                                type: 'number',
                            },
                            max_value: {
                                type: 'number',
                            },
                            value: {
                                type: 'number',
                            },
                            fixed_price: {
                                type: 'number',
                            },
                            usage: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['AVAILABLE', 'UNAVAILABLE'],
                            },
                            max_use: {
                                type: 'number',
                            },
                            condition_min_bill_value: {
                                type: 'number',
                            },
                            condition_beginning_hour: {
                                type: 'number',
                            },
                            condition_ending_hour: {
                                type: 'number',
                            },
                            condition_target: {
                                type: 'string',
                                enum: ['ALL', 'SILVER', 'GOLD', 'DIAMOND'],
                            },
                        },
                    },
                    VoucherUpdate: {
                        type: 'object',
                        properties: {
                            index: {
                                type: 'number',
                            },
                            type: {
                                type: 'string',
                                enum: ['DISCOUNT', 'GIFT'],
                            },
                            media_url: {
                                type: 'string',
                            },
                            description: {
                                type: 'string',
                            },
                            discount_type: {
                                type: 'string',
                                enum: ['PERCENT', 'VALUE', 'FIXED_PRICE'],
                            },
                            percent: {
                                type: 'number',
                            },
                            max_value: {
                                type: 'number',
                            },
                            value: {
                                type: 'number',
                            },
                            fixed_price: {
                                type: 'number',
                            },
                            usage: {
                                type: 'number',
                            },
                            status: {
                                type: 'string',
                                enum: ['AVAILABLE', 'UNAVAILABLE'],
                            },
                        },
                    },
                }
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