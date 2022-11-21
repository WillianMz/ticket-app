const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://suporte.williansistemas.kinghost.net',
        //target: 'https://localhost:5001/',
        secure: false,
        logLevel: 'debug'
    }
];

module.exports = PROXY_CONFIG;