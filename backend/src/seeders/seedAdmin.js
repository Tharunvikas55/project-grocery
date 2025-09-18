const UserModel =require("../models/User")// Adjust path as needed
const bcrypt = require('bcrypt');


 async function seedAdmin() {
  try {
    // Check if admin already exists
    const existingAdmin = await UserModel.findOne({ where: { role: 'admin' } });

    if (existingAdmin) {
      console.log('⚠️ Admin already exists. Skipping seeding.');
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash('Admin@123', 10); // Replace with env var in production

    // Create admin user
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
  } finally {
    process.exit();
  }
}

// export default seedAdmin;
