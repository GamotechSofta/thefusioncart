import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

import User from '../models/User.js';

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const adminAccounts = [
      {
        email: 'admin@shopzenventures.shop',
        password: 'Admin@shopzen123',
        name: 'Shopzen Master Admin',
      },
      {
        email: 'admin@buynestventures.shop',
        password: 'Admin@buynest123',
        name: 'BuyNest Master Admin',
      },
    ];

    const salt = await bcrypt.genSalt(10);

    for (const acc of adminAccounts) {
      const passwordHash = await bcrypt.hash(acc.password, salt);
      let user = await User.findOne({ email: acc.email });

      if (user) {
        user.name = acc.name;
        user.passwordHash = passwordHash;
        user.isAdmin = true;
        user.provider = 'local';
        await user.save();
        console.log(`Existing admin updated: ${acc.email}`);
      } else {
        user = await User.create({
          name: acc.name,
          email: acc.email,
          passwordHash,
          isAdmin: true,
          provider: 'local',
        });
        console.log(`New admin created: ${acc.email}`);
      }

      console.log('-------------------------------------------');
      console.log('Admin Account:');
      console.log('Email:', acc.email);
      console.log('Password:', acc.password);
      console.log('isAdmin:', user.isAdmin);
    }
    console.log('-------------------------------------------');

    process.exit(0);
  } catch (err) {
    console.error('Error seeding admin:', err);
    process.exit(1);
  }
}

seedAdmin();
