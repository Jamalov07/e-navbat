const pool = require("../config/db");
const ApiError = require("../errors/ApiError");

const getSpec_Services = async (req, res) => {
  try {
    const allSpec_Services = await pool.query(`Select * from spec_service`);
    if (!allSpec_Services.rows) {
      return res.error(400, { message: "Spec_Services not found" });
    }
    res.ok(200, allSpec_Services.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getSpec_Service = async (req, res) => {
  try {
    const {
      rows: [spec_service],
    } = await pool.query("Select * from spec_service where id = ($1)", [
      req.params.id,
    ]);
    if (!spec_service) {
      return res.error(400, { friendlyMsg: "Spec_Service no found" });
    }
    res.ok(200, spec_service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addSpec_Service = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;
    const {
      rows: [spec_service],
    } = await pool.query(
      `
                insert into spec_service 
                (spec_id,service_id,spec_service_price)
                values ($1,$2,$3) returning *
                `,
      [spec_id, service_id, spec_service_price]
    );
    if (!spec_service) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, spec_service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateSpec_Service = async (req, res) => {
  try {
    const { spec_id, service_id, spec_service_price } = req.body;
    const id = req.params.id;
    const {
      rows: [spec_ServiceData],
    } = await pool.query(
      `
                    select * from spec_service where id = $1`,
      [id]
    );
    if (!spec_ServiceData) {
      return res.error(400, { friendlyMsg: "Spec_Service not found" });
    }
    const {
      rows: [spec_Service],
    } = await pool.query(
      `
                update spec_service 
                set spec_id=$2, service_id=$3, spec_service_price=$4 WHERE id = $1 returning * 
                `,
      [
        id,
        spec_id || spec_ServiceData.spec_id,
        service_id || spec_ServiceData.service_id,
        spec_service_price || spec_ServiceData.spec_service_price,
      ]
    );
    if (!spec_Service) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, spec_Service);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteSpec_Service = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [spec_Service],
    } = await pool.query(
      `
                  delete from spec_service where id = $1 returning *
              `,
      [id]
    );
    if (!spec_Service) {
      return res.error(400, { friendlyMsg: "Spec_Service not found" });
    }
    res.ok(200, "deleted Spec_Service");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getSpec_Services,
  getSpec_Service,
  addSpec_Service,
  updateSpec_Service,
  deleteSpec_Service,
};
