const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getAdmins = async (req, res) => {
  try {
    const allAdmins = await pool.query(`Select * from admin`);
    if (!allAdmins.rows) {
      return res.error(400, { friendlyMsg: "admins not found" });
    }
    res.ok(200,allAdmins.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [admin],
    } = await pool.query("Select * from admin where id = ($1)", [id]);
    if (!admin) {
      return res.error(400, { friendlyMsg: "admin not found" });
    }
    res.ok(200,admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { admin_name, admin_phone_number, admin_password } = req.body;
    const {
      rows: [admin],
    } = await pool.query(
      `
          insert into admin 
          (admin_name,admin_phone_number,admin_password)
          values ($1,$2,$3) returning *
          `,
      [admin_name, admin_phone_number, admin_password]
    );
    if (!admin) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200,admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const { admin_name, admin_phone_number, admin_password } = req.body;
    const id = req.params.id;
    const {
      rows: [adminData],
    } = await pool.query(
      `
              select * from admin where id = $1`,
      [id]
    );
    if (!adminData) {
      return res.error(400, { friendlyMsg: "admin not found" });

    }

    const {
      rows: [admin],
    } = await pool.query(
      `
          update admin 
          set admin_name=$2, admin_phone_number=$3, admin_password=$4 WHERE id = $1 returning * 
          `,
      [
        id,
        admin_name || adminData.admin_name,
        admin_phone_number || adminData.admin_phone_number,
        admin_password || adminData.admin_password,
      ]
    );
    if (!admin) {
      return res.error(400, { friendlyMsg: "error in updating " });
      
    }
    res.ok(200,admin);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [admin],
    } = await pool.query(
      `
              delete from admin where id = $1 returning *
          `,
      [id]
    );
    if (!admin) {
      return res.error(400, { friendlyMsg: "admin not found" });
      
    }
    res.ok(200,"admin deleted");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
module.exports = {
  getAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  deleteAdmin,
};
