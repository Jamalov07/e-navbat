const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getTokens = async (req, res) => {
  try {
    const allTokens = await pool.query(`Select * from Token`);
    if (!allTokens.rows) {
      return res.error(400, { message: "Tokens not found" });
    }
    res.ok(200, allTokens.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getToken = async (req, res) => {
  try {
    const {
      rows: [token],
    } = await pool.query("Select * from Token where id = ($1)", [
      req.params.id,
    ]);
    if (!token) {
      return res.error(400, { friendlyMsg: "Token no found" });
    }
    res.ok(200, token);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addToken = async (req, res) => {
  try {
    const { table_name, user_id, user_os, user_device, token } = req.body;
    const {
      rows: [Token],
    } = await pool.query(
      `
                insert into Token 
                (table_name, user_id, user_os, user_device, token)
                values ($1,$2,$3,$4) returning *
                `,
      [table_name, user_id, user_os, user_device, token]
    );
    if (!Token) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, Token);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateToken = async (req, res) => {
  try {
    const { table_name, user_id, user_os, user_device, token } = req.body;
    const id = req.params.id;
    const {
      rows: [tokenData],
    } = await pool.query(
      `
                    select * from token where id = $1`,
      [id]
    );
    if (!tokenData) {
      return res.error(400, { friendlyMsg: "token not found" });
    }
    const {
      rows: [Token],
    } = await pool.query(
      `
                update token 
                set table_name=$2, user_id=$3, user_os=$4, user_device=$5, token WHERE id = $1 returning * 
                `,
      [
        id,
        table_name || tokenData.table_name,
        user_id || tokenData.user_id,
        user_os || tokenData.user_os,
        user_device || tokenData.user_device,
        token || tokenData.token,
      ]
    );
    if (!Token) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, Token);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};


const deleteToken = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        rows: [Token],
      } = await pool.query(
        `
                  delete from Token where id = $1 returning *
              `,
        [id]
      );
      if (!Token) {
        return res.error(400, { friendlyMsg: "Token not found" });
      }
      res.ok(200, "deleted Token");
    } catch (error) {
      ApiError.internal(res, {
        message: error.message,
        friendlyMsg: "Serverda hatolik",
      });
    }
  };
  module.exports = {
    getTokens,
    getToken,
    addToken,
    updateToken,
    deleteToken,
  };
  