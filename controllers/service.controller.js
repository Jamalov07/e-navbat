const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getServices = async (req, res) => {
  try {
    const allServices = await pool.query(`Select * from Service`);
    if (!allServices.rows) {
      return res.error(400, { message: "Services not found" });
    }
    res.ok(200, allServices.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getService = async (req, res) => {
  try {
    const {
      rows: [service],
    } = await pool.query("Select * from Service where id = ($1)", [
      req.params.id,
    ]);
    if (!service) {
      return res.error(400, { friendlyMsg: "Service no found" });
    }
    res.ok(200, service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const {
      rows: [service],
    } = await pool.query(
      `
            insert into service 
            (service_name,service_price)
            values ($1,$2) returning *
            `,
      [service_name, service_price]
    );
    if (!service) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateService = async (req, res) => {
  try {
    const { service_name, service_price } = req.body;
    const id = req.params.id;
    const {
      rows: [serviceData],
    } = await pool.query(
      `
                select * from service where id = $1`,
      [id]
    );
    if (!serviceData) {
      return res.error(400, { friendlyMsg: "Service not found" });
    }
    const {
      rows: [service],
    } = await pool.query(
      `
            update service 
            set  service_name=$2, service_price=$3 WHERE id = $1 returning * 
            `,
      [
        id,
        service_name || serviceData.service_name,
        service_price || serviceData.service_price,
      ]
    );
    if (!service) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [service],
    } = await pool.query(
      `
              delete from service where id = $1 returning *
          `,
      [id]
    );
    if (!service) {
      return res.error(400, { friendlyMsg: "Service not found" });
    }
    res.ok(200, "deleted Service");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};
module.exports = {
  getServices,
  getService,
  addService,
  updateService,
  deleteService,
};
