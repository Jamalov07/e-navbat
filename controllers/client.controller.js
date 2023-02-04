const pool = require("../config/db");
const ApiError = require("../errors/ApiError");
const DeviceDetector = require("node-device-detector");

const detector = new DeviceDetector({
  clientIndexes: true,
  deviceIndexes: true,
  deviceAliasCode: true,
});

const getClients = async (req, res) => {
  try {
    const userAgent = req.headers["user-agent"];
    console.log(userAgent);
    const result = detector.detect(userAgent);
    console.log("result parse", result);

    const allClients = await pool.query(`Select * from client`);
    if (!allClients.rows) {
      return res.error(400, { friendlyMsg: "clients not found" });
    }
    res.ok(200, allClients.rows);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const getClient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [client],
    } = await pool.query("Select * from client where id = ($1)", [id]);
    if (!client) {
      return res.error(400, { friendlyMsg: "client not found" });
    }
    res.ok(200, client);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const addClient = async (req, res) => {
  try {
    const { client_last_name, client_first_name, client_photo, client_info } =
      req.body;

    const {
      rows: [client],
    } = await pool.query(
      `
        insert into client 
        (client_last_name, client_first_name, client_photo, client_info)
        values ($1,$2,$3,$4) returning *
        `,
      [client_last_name, client_first_name, client_photo, client_info]
    );
    if (!client) {
      return res.error(400, { friendlyMsg: "error in adding" });
    }
    res.ok(200, client);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const updateClient = async (req, res) => {
  try {
    const { client_last_name, client_first_name, client_photo, client_info } =
      req.body;
    const id = req.params.id;
    const {
      rows: [clientData],
    } = await pool.query(
      `
            select * from client where id = $1`,
      [id]
    );
    if (!clientData) {
      return res.error(400, { friendlyMsg: "client not found" });
    }
    const {
      rows: [client],
    } = await pool.query(
      `
        update client 
        set client_last_name = $2, client_first_name = $3, client_photo = $4, client_info = $5, client_is_active = $6 WHERE id = $1 returning * 
        `,
      [
        id,
        client_last_name || clientData.client_last_name,
        client_first_name || clientData.client_first_name,
        client_photo || clientData.client_photo,
        client_info || clientData.client_info,
        clientData.client_is_active,
      ]
    );
    if (!client) {
      return res.error(400, { friendlyMsg: "error in updating" });
    }
    res.ok(200, client);
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      rows: [client],
    } = await pool.query(
      `
            delete from client where id = $1 returning *
        `,
      [id]
    );
    if (!client) {
      return res.error(400, { friendlyMsg: "client not found" });
    }
    res.ok(200, "deleted client");
  } catch (error) {
    ApiError.internal(res, {
      message: error.message,
      friendlyMsg: "Serverda hatolik",
    });
  }
};

module.exports = {
  getClients,
  getClient,
  addClient,
  updateClient,
  deleteClient,
};
