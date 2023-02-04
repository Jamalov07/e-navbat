const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getQueues = async (req, res) => {
  try {
    const allQueues = await pool.query(`Select * from queue`);
    if (!allQueues.rows) {
      return res.error(400, { message: "Queues not found" });
    }
    res.ok(200, allQueues.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getQueue = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [queue],
    } = await pool.query("Select * from queue where id = ($1)", [id]);
    if (!queue) {
      return res.error(400, { friendlyMsg: "Queue no found" });
    }
    res.ok(200, queue);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addQueue = async (req, res) => {
  try {
    const { client_id, spec_service_id, queue_date_time, queue_number } =
      req.body;
    const {
      rows: [queue],
    } = await pool.query(
      `
            insert into Queue 
            (client_id,spec_service_id,queue_date_time,queue_number)
            values ($1,$2,$3,$4) returning *
            `,
      [client_id, spec_service_id, queue_date_time, queue_number]
    );
    if (!queue) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, queue);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateQueue = async (req, res) => {
  try {
    const { client_id, spec_service_id, queue_date_time, queue_number } =
      req.body;
    const id = req.params.id;
    const {
      rows: [queueData],
    } = await pool.query(
      `
                select * from Queue where id = $1`,
      [id]
    );
    if (!queueData) {
      return res.error(400, { friendlyMsg: "Queue not found" });
    }
    const {
      rows: [queue],
    } = await pool.query(
      `
            update queue 
            set client_id=$2, spec_service_id=$3, queue_date_time=$4, queue_number=$5 WHERE id = $1 returning * 
            `,
      [
        id,
        client_id || queueData.client_id,
        spec_service_id || queueData.spec_service_id,
        queue_date_time || queueData.queue_date_time,
        queue_number || queueData.queue_number,
      ]
    );
    if (!queue) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, queue);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteQueue = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [queue],
    } = await pool.query(
      `
              delete from queue where id = $1 returning *
          `,
      [id]
    );
    if (!queue) {
      return res.error(400, { friendlyMsg: "Queue not found" });
    }
    res.ok(200, "deleted Queue");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
module.exports = {
  getQueues,
  getQueue,
  addQueue,
  updateQueue,
  deleteQueue,
};
