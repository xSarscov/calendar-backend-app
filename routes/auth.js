const { Router } = require('express');
const router = Router();
const { check } = require('express-validator')

const { createUser, userSignin, tokenRenew } = require('../controllers/auth');
const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { validateJwt } = require('../middlewares/validateJwt');

router.post(
    '/', 
    [
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password must be 6 characters.').isLength({ min: 6 }),
        fieldsValidator
    ], 
    userSignin
);

router.post(
    '/new',
    [
        check('name', 'Name is required.').not().isEmpty(),
        check('email', 'Email is required.').isEmail(),
        check('password', 'Password must be 6 characters.').isLength({ min: 6 }),
        fieldsValidator
    ], 
    createUser
);

router.get(
    '/renew',
    validateJwt,
    tokenRenew

);

module.exports = router;