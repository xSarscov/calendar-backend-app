const jwt = require('jsonwebtoken');

const createJwt = ( uid, name ) => {

    return new Promise( (resolve, reject) => {
        const payload = { uid, name };
        
        jwt.sign(
            payload, 
            process.env.SECRET_JWT_SEED, 
            { expiresIn: '2h' },
            (error, token) => {
                if (error) {
                    console.log(err);
                    reject("JWT couldn't be generated.")
                }
                
                resolve(token);
            }
        );

    });
}

module.exports = {
    createJwt
}