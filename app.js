const express = require('express');
const Razorpay = require('razorpay');
const bodyParser = require('body-parser');
var cors = require('cors')


var totalCount = {
  yearly:1,
  monthly:12,
  weekly:48,
  daily:360
}


var app = express();
app.use(express.json())
app.use(cors())

app.post('/donate', (req, res) => {
  var instance = new Razorpay({ key_id: 'rzp_live_rvzZsHjlYJCMFE', key_secret: 'zV7fkq1X4Ho4xMFl0h8vVVnW' })

  instance.plans.create({
    period: req.body.period,
    interval: 1,
    item: {
      name: "Rashtrotthan "+req.body.period+ " Plan - "+ req.body.name,
      amount: req.body.amount*100,
      currency: "INR",
      description: "Donation for a great cause"
    },
    notes: {
      notes_key_1: "Tea, Earl Grey, Hot",
      notes_key_2: "Tea, Earl Grey… decaf."
    }
  },(err,resp) => {
    if(resp && resp.id){
      instance.subscriptions.create({
        plan_id: resp.id,
        customer_notify: 0,
        total_count: totalCount[req.body.period],
        // start_at: 1495995837,
        addons: [],
        notes: {
          key1: "value3",
          key2: "value2"
        }
      },(err,resp) => {
        console.log(err);
        console.log(resp)
        res.send(resp);
      })
    }
  })
})

app.listen(5000)
