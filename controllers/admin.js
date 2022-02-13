const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");
const { createTokens, validateToken } = require("../middleware/JWT");

const getAllAdmin = (req, res) => {
  adminModel
    .getAllAdminQuery()
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getOneAdminById = (req, res) => {
  const { id } = req.params;
  adminModel
    .getOneAdminByIdQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const getOneAdminByMail = (req, res) => {
  const { id } = req.params;
  adminModel
    .getOneAdminByIdQuery(id)
    .then(([results]) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      console.error(error);
    });
};

const postOneAdmin = (req, res) => {
  console.log(req.body);
  const { mail, password, role } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    adminModel
      .postOneAdminQuery({
        mail: mail,
        password: hash,
        role: role,
      })
      .then(() => {
        res.status(201).json("USER CREATED");
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  });
};

const loginAdmin = async (req, res) => {
  const { mail, password } = req.body;
  await adminModel.getOneAdminByMailQuery(mail).then(([[result]]) => {
    if (result) {
      console.log(result);
      const user = result;
      const dbPassword = user.password;
      bcrypt.compare(password, dbPassword).then((match) => {
        if (!match) {
          res
            .status(400)
            .json({ error: "Wrong mail and password combination" });
        } else {
          const accessToken = createTokens(user);
          res.json({ ...result, token: accessToken });
        }
      });
    } else {
      res.status(400).json({ error: "User not found with this mail " });
    }
  });
};

const deleteOneAdmin = (req, res) => {
  const { id } = req.params;
  adminModel
    .deleteOneAdminQuery(id)
    .then(([result]) => {
      if (result.affectedRows) {
        res.status(200).send(`admin with id ${id} deleted`);
      } else {
        res.status(404).send(`admin with id ${id} not found`);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("error deleting admin");
    });
};

const updateOneAdmin = (req, res) => {};

module.exports = {
  getAllAdmin,
  postOneAdmin,
  loginAdmin,
  getOneAdminById,
  getOneAdminByMail,
  updateOneAdmin,
  deleteOneAdmin,
};
