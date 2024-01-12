const bcrypt = require("bcryptjs");
const User = require("../models/user");

async function getMe(req, res) {
  const { user_id } = req.user;

  const response = await User.findById(user_id);

  if (!response) {
    res.status(400).send({ msg: "No se ha encontrado usuario" });
  } else {
    res.status(200).send(response);
  }
}

async function getUsers(req, res) {
  const { active } = req.query;
  let response = null;

  if (active === undefined) {
    response = await User.find();
  } else {
    response = await User.find({ active });
  }

  res.status(200).send(response);
}

async function createUser(req, res) {
  const {  username, password } = req.body;

  if (!username) res.status(400).send({ msg: "El nombre de Usuario es obligatorio" });
  else if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });
  else{
    const user = new User({
      ...req.body,
      username: username.toLowerCase(), 
      active: false });  
    const salt = bcrypt.genSaltSync(10);
    const hasPassword = bcrypt.hashSync(password, salt);
    user.password = hasPassword;  
    user.save((error, userStored) => {
      if (error) {
        res.status(400).send({ msg: "Error al crear el usuario,Verifique el Nombre de usuario" });
      } else {
        res.status(201).send(userStored);
      }
    });
  }
}

async function updateUser(req, res) {
  const { id } = req.params;
  const userData = req.body;

  if (userData.password) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(userData.password, salt);
    userData.password = hashPassword;
  } else {
    delete userData.password;
  }

  User.findByIdAndUpdate({ _id: id }, userData, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Actualizacion correcta" });
    }
  });
}

async function deleteUser(req, res) {
  const { id } = req.params;

  User.findByIdAndDelete(id, (error) => {
    if (error) {
      res.status(400).send({ msg: "Error al eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado" });
    }
  });
}

module.exports = {
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
