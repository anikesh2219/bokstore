const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/bookstore')
  
.then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const OrderSchema  = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true },
  book: { type: mongoose.Schema.Types.ObjectId, required: true },
  quantity: { type: Number, required: true, min: 1 },
  orderDate: { type: Date, default: Date.now }
});

const bookorder = mongoose.model('Order', OrderSchema);


module.exports = bookorder
