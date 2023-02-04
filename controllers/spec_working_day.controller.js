const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_Working_Days = async (req, res) => {
  try {
    const allSpec_Working_Days = await pool.query(
      `Select * from spec_working_day`
    );
    if (!allSpec_Working_Days.rows) {
      return res.error(400, { message: "Spec_Working_Days not found" });
    }
    res.ok(200, allSpec_Working_Days.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSpec_Working_Day = async (req, res) => {
  try {
    const {
      rows: [spec_Working_Day],
    } = await pool.query("Select * from spec_working_day where id = ($1)", [
      req.params.id,
    ]);
    if (!spec_Working_Day) {
      return res.error(400, { friendlyMsg: "Spec_Working_Day no found" });
    }
    res.ok(200, spec_Working_Day);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addSpec_Working_Day = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;
    const {
      rows: [spec_Working_Day],
    } = await pool.query(
      `
                insert into spec_working_say 
                (spec_id,day_of_week,start_time,finish_time,rest_start_time,rest_finish_time)
                values ($1,$2,$3,$4,$5,$6) returning *
                `,
      [
        spec_id,
        day_of_week,
        start_time,
        finish_time,
        rest_start_time,
        rest_finish_time,
      ]
    );
    if (!spec_Working_Day) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, spec_Working_Day);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSpec_Working_Day = async (req, res) => {
  try {
    const {
      spec_id,
      day_of_week,
      start_time,
      finish_time,
      rest_start_time,
      rest_finish_time,
    } = req.body;
    const id = req.params.id;
    const {
      rows: [spec_Working_DayData],
    } = await pool.query(
      `
                    select * from spec_working_day where id = $1`,
      [id]
    );
    if (!spec_Working_DayData) {
      return res.error(400, { friendlyMsg: "Spec_Working_Day not found" });
    }
    const {
      rows: [spec_Working_Day],
    } = await pool.query(
      `
        update spec_working_day 
            set spec_id=$2, day_of_week=$3, start_time=$4,
            finish_time=$5, rest_start_time=$6, rest_finish_time=$7, WHERE id = $1 returning * 
                `,
      [
        id,
        spec_id || spec_Working_DayData.spec_id,
        day_of_week || spec_Working_DayData.day_of_week,
        start_time || spec_Working_DayData.start_time,
        finish_time || spec_Working_DayData.finish_time,
        rest_start_time || spec_Working_DayData.rest_start_time,
        rest_finish_time || spec_Working_DayData.rest_finish_time,
      ]
    );
    if (!spec_Working_Day) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, spec_Working_Day);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSpec_Working_Day = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [spec_Working_Day],
    } = await pool.query(
      `
                  delete from spec_working_day where id = $1 returning *
              `,
      [id]
    );
    if (!spec_Working_Day) {
      return res.error(400, { friendlyMsg: "Spec_Working_Day not found" });
    }
    res.ok(200, "deleted Spec_Working_Day");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
module.exports = {
  getSpec_Working_Days,
  getSpec_Working_Day,
  addSpec_Working_Day,
  updateSpec_Working_Day,
  deleteSpec_Working_Day,
};
