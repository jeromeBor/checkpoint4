const adminModel = require("../models/admin");
const bcrypt = require("bcrypt");

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

const getOneAdmin = (req, res) => {
  const { id } = req.params;
  adminModel
    .getOneAdminQuery(id)
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
        res.status(500).send("error creating the admin");
      });
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

// const loginAdmin = (req, res) => {
//   adminModel.loginAdmin({ ...req.body }).then((res) => {
//     res.status(200).json("Logged in !");
//   });
// };

const updateOneAdmin = (req, res) => {};

module.exports = {
  getAllAdmin,
  postOneAdmin,
  //   loginAdmin,
  getOneAdmin,
  updateOneAdmin,
  deleteOneAdmin,
};
