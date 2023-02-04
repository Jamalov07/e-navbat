const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const { encode, decode } = require("../services/crypt");
const uuid = require("uuid");
const otpGenerator = require("otp-generator");

function AddMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

const dates = {
  convert: function (d) {
    return d.constructor === Date
      ? d
      : d.constructor === Array
      ? new Date(d[0], d[1], d[2])
      : d.constructor === Number
      ? new Date(d)
      : d.constructor === String
      ? new Date(d)
      : typeof d === "object"
      ? new Date(d.year, d.month, d.date)
      : NaN;
  },
  compare: function (a, b) {
    return isFinite((a = this.convert(a).valueOf())) &&
      isFinite((b = this.convert(b).valueOf()))
      ? (a > b) - (a < b)
      : NaN;
  },
  inRange: function (d, start, end) {
    return isFinite((d = this.convert(d).valueOf())) &&
      isFinite((start = this.convert(start).valueOf())) &&
      isFinite((end = this.convert(end).valueOf()))
      ? start <= d && d <= end
      : NaN;
  },
};

const newOTP = async (req, res) => {
  try {
    const { phone_number } = req.body;
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    const now = new Date();
    const expiration_time = AddMinutesToDate(now, 5);

    const newOtp = await pool.query(
      `
      insert into otp (id,otp,expiration_time) values ($1,$2,$3) returning id;
    `,
      [uuid.v4(), otp, expiration_time]
    );
    const details = {
      timestamp: now,
      check: phone_number,
      success: true,
      message: "otp sent to user",
      otp_id: newOtp.rows[0].id,
    };

    const encoded = await encode(JSON.stringify(details));
    return res.ok(200, { Status: "Success", Details: encoded });
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const verifyOTP = async (req, res) => {
  const { verification_key, otp, check } = req.body;
  const currentdate = new Date();
  let decoded;
  try {
    decoded = await decode(verification_key);
  } catch (err) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.error(400, { friendlyMsg: response });
  }

  const obj = JSON.parse(decoded);
  const check_obj = obj.check;

  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not send to  this particular phone number",
    };
    return res.error(400, { friendlyMsg: response });
  }
  let params = {
    id: obj.otp_id,
  };

  const otpResult = await pool.query(
    `
    select * from otp where id = $1
    `,
    [params.id]
  );
  const result = otpResult.rows[0];
  if (result != null) {
    //check if otp is already used or not
    if (result.verified != true) {
      //check if otp is expired or not
      if (dates.compare(result.expiration_time, currentdate) == 1) {
        //check if otp is equal to the otp in the db
        if (otp === result.otp) {
          let params_verified = {
            id: result.id,
            verified: true,
          };
          await pool.query(
            `
            update otp set verified=$2 where id = $1;
            `,
            [params_verified.id, params_verified.verified]
          );

          const clientResult = await pool.query(
            `
            select * from client where client_phone_number = $1;
            `,
            [check]
          );
          if (clientResult.rows.length == 0) {
            const response = {
              Status: "Success",
              Details: "new",
              Check: check,
            };
            return res.ok(200, response);
          } else {
            const response = {
              status: "Success",
              Detailts: "old",
              Check: check,
              ClientName: clientResult.rows.client_first_name,
            };
            return res.ok(200, response);
          }
        } else {
          const response = { Status: "Failure", Details: "OTP NOT matched" };
          return res.error(400, { friendlyMsg: response });
        }
      } else {
        const response = { Status: "Failure", Details: "otp expired" };
        return res.error(400, { friendlyMsg: response });
      }
    } else {
      const response = { Status: "Failure", Details: "otp already used" };
      return res.error(400, { friendlyMsg: response });
    }
  } else {
    const response = { Status: "Failure", Details: "bad request" };
    return res.error(400, { friendlyMsg: response });
  }
};

const deleteOTP = async (req, res) => {
  const { verification_key, check } = req.body;

  let decoded;

  try {
    decoded = await decode(verification_key);
  } catch (err) {
    const response = { Status: "Failure", Details: "Bad Request" };
    return res.status(400).send(response);
  }
  var obj = JSON.parse(decoded);
  const check_obj = obj.check;

  if (check_obj != check) {
    const response = {
      Status: "Failure",
      Details: "OTP was not sent to this particular  phone number",
    };
    return res.status(400).send(response);
  }
  let params = {
    id: obj.otp_id,
  };

  const deletedOTP = await pool.query(
    `DELETE FROM otp WHERE id = $1 RETURNING id`,
    [params.id]
  );
  if (deletedOTP.rows.length == 0) {
    return res.status(400).send("Invalid OTP");
  }
  return res.status(200).send(params);
};

const getOTPs = async (req, res) => {
  try {
    const allOTPs = await pool.query(`Select * from otp`);
    if (!allOTPs.rows) {
      return res.error(400, { message: "OTPs not found" });
    }
    res.ok(200, allOTPs.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
const getOTP = async (req, res) => {
  try {
    const id = req.params.id;
    if (id.length != 36) {
      return res.error(400, { friendlyMsg: "invalid token" });
    }
    const {
      rows: [otp],
    } = await pool.query("Select * from otp where id = ($1)", [id]);
    if (!otp) {
      return res.error(400, { friendlyMsg: "otp no found" });
    }
    res.ok(200, otp);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getOTPs,
  getOTP,
  newOTP,
  verifyOTP,
  deleteOTP,
};
