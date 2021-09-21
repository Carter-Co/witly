import { createUser } from '../models/users.js';

export const createUserFormController = function (req,res) {
    return res.render('createAccount');
};

export const createUserController = async function (req, res) {
    let userData = req.body;
    const user = await createUser(userData);
    return res.send(user.rows[0]);
};

export const loginFormController = function (req, res) {
        return res.render('login');
};
