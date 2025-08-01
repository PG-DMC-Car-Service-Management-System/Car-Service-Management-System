const express = require("express")
const cors = require('cors');
const app = express()

app.use(cors());
app.use(express.json());

const bookingRouter = require("./routes/booking")
const billingRouter = require("./routes/billing")
const customerRoutes = require('./routes/customers');
const feedbackRoutes = require('./routes/feedback');
const mechanicsRoutes = require('./routes/mechanics_list');
const servicesRoutes = require('./routes/service_request');

//const categoryRoutes = require('./routes/categories');


app.use(express.json())
app.use("/", bookingRouter)
app.use("/", billingRouter)
app.use('/', customerRoutes);
app.use('/', feedbackRoutes);
app.use('/', mechanicsRoutes);
app.use('/', servicesRoutes);

//app.use('/', categoryRoutes);


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});


