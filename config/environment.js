const config = {
    DEV: {
        plaid: {
            client_id: "5873f693bdc6a41245f1b152",
            public_key: "96fc46d218d6e667be1ecf3eaf9e8e",
            secret: "8ec7a7d42d16f4029dfe3c8e126783",
            environment: "sandbox"
        },
        mongodb: 'mongodb://localhost/finances'
    }
};

module.exports = config;