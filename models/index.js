// models/index.js

// Dependencies
const Sequelize = require('sequelize');
const config = require('../config/config');
const { DataTypes } = require('sequelize');

const User = require('./user');
const Admin = require('./roles/admin');
const Client = require('./roles/client');
const Consultant = require('./roles/consultant');
const Coordinator = require('./roles/coordinator');
const Interpreter = require('./roles/interpreter');
const Operator = require('./roles/operator');
const Technician = require('./roles/technician');
const Reputation = require('./reputation');
const Room = require('./room');
const Booth = require('./booth');
const BoothAssignment = require('./boothAssignment');
const Glossary = require('./glossary');
const GlossaryAssignment = require('./glossaryAssignment');


// Configuration of the Connection to the DATABASE
const sequelize = new Sequelize(config.development);


// Relationships for Admin: N-to-1  (user-admin) (PENDIENTE) -------------------------
Admin.hasMany(User, { foreignKey: 'admin_id', as: 'adminDetails' });
User.belongsTo(Admin, { foreignKey: 'admin_id' });

// Relationships for Roles: 1-to-1 (user-role) ---------------------------------------
User.hasOne(Client, { foreignKey: 'id', as: 'clientDetails' });
Client.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Consultant, { foreignKey: 'id', as: 'consultantDetails' });
Consultant.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Coordinator, { foreignKey: 'id', as: 'coordinatorDetails' });
Coordinator.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Interpreter, { foreignKey: 'id', as: 'interpreterDetails' });
Interpreter.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Operator, { foreignKey: 'id', as: 'operatorDetails' });
Operator.belongsTo(User, { foreignKey: 'id' });

User.hasOne(Technician, { foreignKey: 'id', as: 'technicianDetails' });
Technician.belongsTo(User, { foreignKey: 'id' });

// Relationships for Reputation: 1-to-1 (reputation-interpreter) ---------------------
Interpreter.hasOne(Reputation, { foreignKey: 'id', as: 'reputationDetails' });
Reputation.belongsTo(Interpreter, { foreignKey: 'id' });

// Relationships for Room: 1-to-N (role-room) (PENDIENTE CONFIRMACIÓN) ---------------
Consultant.hasMany(Room, { foreignKey: 'id', as: 'consultantRoomDetails' });
Room.belongsTo(Consultant, { foreignKey: 'id' });

Coordinator.hasMany(Room, { foreignKey: 'id', as: 'coordinatorRoomDetails' });
Room.belongsTo(Coordinator, { foreignKey: 'id' });

Operator.hasMany(Room, { foreignKey: 'id', as: 'operatorRoomDetails' });
Room.belongsTo(Operator, { foreignKey: 'id' });

Technician.hasMany(Room, { foreignKey: 'id', as: 'technicianRoomDetails' });
Room.belongsTo(Technician, { foreignKey: 'id' });

// Relationships for Booth: 1-to-N (room-booth) --------------------------------------
Room.hasMany(Booth, { foreignKey: 'room_id', as: 'boothDetails' });
Booth.belongsTo(Room, { foreignKey: 'room_id' });


// Relationships for Interpreter: N-to-M (interpreter-boothAssignment-booth) (PENDIENTE CONFIRMACIÓN) ---------
Interpreter.belongsToMany(Booth, { through: BoothAssignment, foreignKey: 'interpreter_id' });
Booth.belongsToMany(Interpreter, { through: BoothAssignment, foreignKey: 'booth_id' });

// Relationships for Glossary: 1-to-1 (booth-glossary) (PENDIENTE SABER RELACIÓN) ---------------------
Booth.hasOne(Glossary, { foreignKey: 'glossary_id', as: 'glossaryDetails' });
Glossary.belongsTo(Booth, { foreignKey: 'glossary_id' });

// Relationships for Glossary: 1-to-1 (booth-glossary) (PENDIENTE SABER RELACIÓN) ---------------------
Booth.hasOne(Glossary, { foreignKey: 'glossary_id', as: 'glossaryDetails' });
Glossary.belongsTo(Booth, { foreignKey: 'glossary_id' });

// Relationships for Interpreter: N-to-M (interpreter-glossaryAssignment-glossary) (PENDIENTE CONFIRMACIÓN) ---------
Interpreter.belongsToMany(Glossary, { through: GlossaryAssignment, foreignKey: 'interpreter_id' });
Glossary.belongsToMany(Interpreter, { through: GlossaryAssignment, foreignKey: 'glossary_id' });




// DATABASE Object
const db = { sequelize, User, Admin, Client, Consultant, Coordinator, Interpreter, Operator, Technician, Reputation, Room, Booth, BoothAssignment };

// Close the Sequelize connection when the Node.js process is closed
process.on('exit', () => {
  sequelize.close();
});

// Export of the DATABASE object
module.exports = db;