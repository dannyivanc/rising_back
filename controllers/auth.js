const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");

function register(req, res) {
  const { name, username, password } = req.body;

  if (!username) res.status(400).send({ msg: "El nombre de Usuario es obligatorio" });
  else if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
  else {
    const user = new User({
      name,
      username: username.toLowerCase(),
      role: "user",
      active: false,
    });
  
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    user.password = hashPassword;
  
    user.save((error, userStorage) => {
      if (error) {      
        res.status(400).send({ msg: "Error al crear el usuario" });
      } else {
        res.status(200).send(userStorage);
      }
    });
  }


}

function login(req, res) {
  const { username, password } = req.body;

  if (!username) res.status(400).send({ msg: "El nombre de Usuario es obligatorio" });
  if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

  const usernameLowerCase = username.toLowerCase();

  User.findOne({ username: usernameLowerCase }, (error, userStore) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    }
    else if(!userStore){
      res.status(400).send({msg:"Error al autenticar 0"})
    }   
    else {     
      bcrypt.compare(password, userStore.password, (bcryptError, check) => {
        if (bcryptError) {
          res.status(500).send({ msg: "Error del servidor" });
        } else if (!check) {
          res.status(400).send({ msg: "Error al autenticar 1" });
        } else if (!userStore.active) {
          res.status(400).send({ msg: "Error al autenticar 2" });
        }             
        else {
          res.status(200).send({
            access: jwt.createAccessToken(userStore),
            refresh: jwt.createRefreshToken(userStore),
          });
        }
      });
    }
  });
}

function refreshAccessToken(req, res) {
  const { token } = req.body;

  if (!token) res.status(400).send({ msg: "Token requerido" });

  const { user_id } = jwt.decoded(token);

  User.findOne({ _id: user_id }, (error, userStorage) => {
    if (error) {
      res.status(500).send({ msg: "Error del servidor" });
    } else {
      res.status(200).send({
        accessToken: jwt.createAccessToken(userStorage),
      });
    }
  });
}



module.exports = {
  register,
  login,
  refreshAccessToken, 
};
