const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSocials = async (req, res) => {
  try {
    const allSocials = await pool.query(`Select * from Social`);
    if (!allSocials.rows) {
      return res.error(400, { message: "Socials not found" });
    }
    res.ok(200, allSocials.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSocial = async (req, res) => {
  try {
    const {
      rows: [social],
    } = await pool.query("Select * from Social where id = ($1)", [
      req.params.id,
    ]);
    if (!social) {
      return res.error(400, { friendlyMsg: "Social no found" });
    }
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addSocial = async (req, res) => {
  try {
    const { social_name, social_icon } = req.body;
    const {
      rows: [social],
    } = await pool.query(
      `
              insert into Social 
              (social_name,social_icon)
              values ($1,$2) returning *
              `,
      [social_name, social_icon]
    );
    if (!social) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSocial = async (req, res) => {
  try {
    const { social_name, social_icon } = req.body;
    const id = req.params.id;
    const {
      rows: [socialData],
    } = await pool.query(
      `
                  select * from social where id = $1`,
      [id]
    );
    if (!socialData) {
      return res.error(400, { friendlyMsg: "Social not found" });
    }
    const {
      rows: [social],
    } = await pool.query(
      `
              update social 
              set social_name=$2, social_icon =$3 WHERE id = $1 returning * 
              `,
      [
        id,
        social_name || socialData.social_name,
        social_icon || socialData.social_icon,
      ]
    );
    if (!social) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSocial = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [social],
    } = await pool.query(
      `
                delete from social where id = $1 returning *
            `,
      [id]
    );
    if (!social) {
      return res.error(400, { friendlyMsg: "Social not found" });
    }
    res.ok(200, "deleted Social");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
module.exports = {
  getSocials,
  getSocial,
  addSocial,
  updateSocial,
  deleteSocial,
};
