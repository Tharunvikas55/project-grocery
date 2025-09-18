const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('dotenv').config();
const sequelize = require('./src/config/sequelizeConfig');
const UserModel = require("./src/models/User")// Adjust path as needed
const CustomerModel = require("./src/models/Customer")// Adjust path as needed

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

    const hashedPassword = await bcrypt.hash('superAdmin123', 10); // Replace with env var in production

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



// app.use('/api', require('./src/routes'));

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



