require('dotenv').config();
const bcrypt = require('bcrypt');
const saltRounds = 5;
const User = require("../models/userModel");
const Dealer = require("../models/dealerModel");

const hashPassword = (password) => {

    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds , function (err, hash) {
            if (err) reject(err);
            else {
                return resolve(hash);
            }
        });
    })
}

const userCode = () => {
    return new Promise((resolve,reject) => {
        Dealer.count().then((c) => {
            var code = "USR";
            code = code + '_' + c;
            return resolve(code);
        });
    });
}

const dealerCode = () => {
	return new Promise((resolve, reject) => {
		User.count().then((c) => {
			var code = "DLR";
			code = code + "_" + c;
			return resolve(code);
		});
	});
};

module.exports = {
    hashPassword: hashPassword,
    userCode: userCode,
    dealerCode: dealerCode
}
