import loki from "lokijs";

const db = new loki('db.json');

db.addCollection("serviceData");

db.saveDatabase();

export {db};
