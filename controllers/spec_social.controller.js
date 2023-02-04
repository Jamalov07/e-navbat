const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_Socials = async (req, res) => {
  try {
    const allSpec_Socials = await pool.query(`Select * from spec_social`);
    if (!allSpec_Socials.rows) {
      return res.error(400, { message: "Spec_Socials not found" });
    }
    res.ok(200, allSpec_Socials.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSpec_Social = async (req, res) => {
  try {
    const {
      rows: [spec_Social],
    } = await pool.query("Select * from spec_social where id = ($1)", [
      req.params.id,
    ]);
    if (!spec_Social) {
      return res.error(400, { friendlyMsg: "Spec_Social no found" });
    }
    res.ok(200, spec_Social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addSpec_Social = async (req, res) => {
  try {
    const { spec_id, social_id, social_link } = req.body;
    const {
      rows: [spec_Social],
    } = await pool.query(
      `
              insert into spec_social 
              (spec_id,social_id,social_link)
              values ($1,$2,$3) returning *
              `,
      [spec_id, social_id, social_link]
    );
    if (!spec_Social) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, spec_Social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSpec_Social = async (req, res) => {
  try {
    const { spec_id, social_id, social_link } = req.body;
    const id = req.params.id;
    const {
      rows: [spec_SocialData],
    } = await pool.query(
      `
                  select * from spec_social where id = $1`,
      [id]
    );
    if (!spec_SocialData) {
      return res.error(400, { friendlyMsg: "Spec_Social not found" });
    }
    const {
      rows: [spec_Social],
    } = await pool.query(
      `
              update spec_social 
              set spec_id=$2, social_id=$3, social_link=$4 WHERE id = $1 returning * 
              `,
      [
        id,
        spec_id || spec_SocialData.spec_id,
        social_id || spec_SocialData.social_id,
        social_link || spec_SocialData.social_link,
      ]
    );
    if (!spec_Social) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, spec_Social);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSpec_Social = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [spec_Social],
    } = await pool.query(
      `
                    delete from spec_social where id = $1 returning *
                `,
      [id]
    );
    if (!spec_Social) {
      return res.error(400, { friendlyMsg: "Spec_Social not found" });
    }
    res.ok(200, "deleted Spec_Social");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getSpec_Socials,
  getSpec_Social,
  addSpec_Social,
  updateSpec_Social,
  deleteSpec_Social,
};
