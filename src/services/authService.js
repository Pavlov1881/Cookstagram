const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jsonWebToken');
const { SECRET } = require('../constants');


exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {

    //! validate password
    if (password.length <= 3) {
        throw new Error('Password too short');
    }

    if (repeatPassword !== password) {
        throw new Error('Password don`t match!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username, email, password: hashedPassword });

    // auto login after register
    return this.login(username, password);
};


exports.login = async (username, password) => {

    // user exist
    const user = await User.find(username);
    if (!user) {
        throw new Error('Invalid email or password');
    }
    // password is valid
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    // generate token
    const payload = {
        _id: user._id,
        username: user.username,
    };

    const token = await jwt.sign(payload, SECRET);
    return token;
}

