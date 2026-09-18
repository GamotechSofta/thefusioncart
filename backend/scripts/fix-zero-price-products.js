import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { Product } from '../models/product.js';

const possiblePrices = [99, 149, 199, 249, 299, 349, 399, 449, 499];

async function run() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const products = await Product.find({
      $or: [
        { mrp: 0 },
        { price: 0 },
        { MRP: 0 },
        { MRP: "0" },
        { mrp: "0" },
        { price: "0" },
        { mrp: null },
        { price: null },
        { mrp: { $exists: false } },
        { price: { $exists: false } }
      ]
    });

    console.log(`Found ${products.length} products with 0 or missing price.`);

    let updatedCount = 0;
    for (const p of products) {
      // Pick a random price from the array
      const randomPrice = possiblePrices[Math.floor(Math.random() * possiblePrices.length)];
      
      p.mrp = randomPrice;
      p.price = randomPrice;
      
      // Also update string fields if they exist
      if (p.MRP !== undefined) p.MRP = randomPrice;
      
      await p.save();
      updatedCount++;
      if (updatedCount % 50 === 0) {
        console.log(`Updated ${updatedCount} products...`);
      }
    }

    console.log(`Successfully updated ${updatedCount} products.`);
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

run();
