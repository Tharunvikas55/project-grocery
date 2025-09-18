const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const sequelize = require('./src/config/sequelizeConfig');
const UserModel = require("./src/models/User")
const CustomerModel = require("./src/models/Customer")

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

 async function seedAdmin() {
  try {
    const existingAdmin = await UserModel.findOne({ where: { role: 'admin' } });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists. Skipping seeding.');
      return ;
    }

    const hashedPassword = await bcrypt.hash('superAdmin123', 10); 

     await UserModel.create({
      username: 'Super Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      phone: '1234567890'
    });

    console.log('✅ Admin user seeded successfully.');
  } catch (error) {
    console.error('❌ Error seeding admin user:', error);
  } 
}

sequelize.authenticate().then(async() => {
  console.log('✅ Database connected.');

  await sequelize.sync({force: false});

  await seedAdmin();

  app.use('/api', require('./src/routes'));

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('❌ Unable to connect to database:', err);
});



