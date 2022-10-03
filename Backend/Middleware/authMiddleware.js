const {BCRYPT_SALT} = require('../config');
const bcryptSalt = BCRYPT_SALT;
const bcryptAuth= async (next) =>{
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();
  }

module.exports = {bcryptAuth}

