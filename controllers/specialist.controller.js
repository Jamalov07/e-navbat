const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpecialists = async (req, res) => {
  try {
    const allSpecialists = await pool.query(`Select * from specialist`);
    if (!allSpecialists.rows) {
      return res.error(400, { friendlyMsg: "Specialists not found" });
    }
    res.ok(200, allSpecialists.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSpecialist = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [specialist],
    } = await pool.query("Select * from specialist where id = ($1)", [id]);
    if (!specialist) {
      return res.error(400, { friendlyMsg: "Specialist not found" });
    }
    res.ok(200, specialist);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addSpecialist = async (req, res) => {
  try {
    const {
      spec_position,
      spec_last_name,
      spec_first_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_phone_number,
      spec_password,
      spec_info,
      spec_is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_photo,
      show_social,
      show_info,
      show_birth_day,
      show_phone_number,
      otp_id,
    } = req.body;
    const {
      rows: [specialist],
    } = await pool.query(
      `
    insert into specialist (
        spec_position, spec_last_name, spec_first_name, spec_middle_name,
        spec_birth_day, spec_photo, spec_phone_number, spec_password, spec_info,
        spec_is_active, show_position, show_last_name, show_first_name, show_middle_name,
        show_photo, show_social, show_info, show_birth_day, show_phone_number, otp_id)
            values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) 
            returning *
        `,
      [
        spec_position,
        spec_last_name,
        spec_first_name,
        spec_middle_name,
        spec_birth_day,
        spec_photo,
        spec_phone_number,
        spec_password,
        spec_info,
        spec_is_active,
        show_position,
        show_last_name,
        show_first_name,
        show_middle_name,
        show_photo,
        show_social,
        show_info,
        show_birth_day,
        show_phone_number,
        otp_id,
      ]
    );
    if (!specialist) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, specialist);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSpecialist = async (req, res) => {
  try {
    const {
      spec_position,
      spec_last_name,
      spec_first_name,
      spec_middle_name,
      spec_birth_day,
      spec_photo,
      spec_phone_number,
      spec_password,
      spec_info,
      spec_is_active,
      show_position,
      show_last_name,
      show_first_name,
      show_middle_name,
      show_photo,
      show_social,
      show_info,
      show_birth_day,
      show_phone_number,
      otp_id,
    } = req.body;
    const id = req.params.id;
    const {
      rows: [specialistData],
    } = await pool.query(
      `
                  select * from specialist where id = $1`,
      [id]
    );
    if (!specialistData) {
      return res.error(400, { friendlyMsg: "Specialist not found" });
    }
    const {
      rows: [specialist],
    } = await pool.query(
      `
    update specialist 
              set spec_position=$2,
              spec_last_name=$3,
              spec_first_name=$4,
              spec_middle_name=$5,
              spec_birth_day=$6,
              spec_photo=$7,
              spec_phone_number=$8,
              spec_password=$9,
              spec_info=$10,
              spec_is_active=$11,
              show_position=$12,
              show_last_name=$13,
              show_first_name=$14,
              show_middle_name=$15,
              show_photo=$16,
              show_social=$17,
              show_info=$18,
              show_birth_day=$19,
              show_phone_number=$20,
              otp_id, WHERE id = $1 returning * 
              `,
      [
        id,
        spec_position || specialistData.spec_position,
        spec_last_name || specialistData.spec_last_name,
        spec_first_name || specialistData.spec_first_name,
        spec_middle_name || specialistData.spec_middle_name,
        spec_birth_day || specialistData.spec_birth_day,
        spec_photo || specialistData.spec_photo,
        spec_phone_number || specialistData.spec_phone_number,
        spec_password || specialistData.spec_password,
        spec_info || specialistData.spec_info,
        spec_is_active || specialistData.spec_is_active,
        show_position || specialistData.show_position,
        show_last_name || specialistData.show_last_name,
        show_first_name || specialistData.show_first_name,
        show_middle_name || specialistData.show_middle_name,
        show_photo || specialistData.show_photo,
        show_social || specialistData.show_social,
        show_info || specialistData.show_info,
        show_birth_day || specialistData.show_birth_day,
        show_phone_number || specialistData.show_phone_number,
        otp_id || specialistData.otp_id,
      ]
    );
    if (!specialist) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, specialist);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};


const deleteSpecialist = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        rows: [specialist],
      } = await pool.query(
        `
                  delete from specialist where id = $1 returning *
              `,
        [id]
      );
      if (!specialist) {
        return res.error(400, { friendlyMsg: "Specialist not found" });
      }
      res.ok(200, "deleted Specialist");
    } catch (error) {
      ApiError.internal(res, {
        message: error.message,
        friendlyMsg: "Serverda hatolik",
      });
    }
  };
  module.exports = {
    getSpecialists,
    getSpecialist,
    addSpecialist,
    updateSpecialist,
    deleteSpecialist,
  };