const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res
      .status(403)
      .send({ msg: "La peticion no tiene la cabecera de autenticación" });
  }

  const token = req.headers.authorization.replace("Bearer ", "");

  try {
  
    const payload = jwt.decoded(token);
    const { exp } = payload;
    const currentData = new Date().getTime();

    if (exp <= currentData) {
      return res.status(400).send({ msg: "El token ha expirado" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "Token invalido" });
  }
}

function roleAuth(req, res, next) { 
  const token = req.headers.authorization.replace("Bearer ", "");

  try {
  
    const payload = jwt.decoded(token);
    const { role } = payload;

    if (role != "admin") {
      return res.status(400).send({ msg: "rol no valido" });
    }

    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).send({ msg: "rol incorrecto" });
  }
}

module.exports = {
  asureAuth,
  roleAuth
};
