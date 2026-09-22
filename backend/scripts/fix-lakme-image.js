const mongoose = require('mongoose');
require('dotenv').config();
mongoose.connect(process.env.MONGODB_URI).then(() => {
  return mongoose.connection.db.collection('products').updateOne(
    { title: /Lakme Peach Milk/i }, 
    { $set: { "images.image1": "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80" } }
  );
}).then(() => {
  console.log('Updated Lakme product');
  process.exit(0);
});
