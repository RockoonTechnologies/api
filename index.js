var express = require('express');
var app = express();
var cors = require('cors');
var fs = require('fs');
var data = require(__dirname + '/data.json');
app.use(cors());
app.set('json spaces', 2)
app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

app.get('/', (req, res) => {
  res.redirect("https://itslaunchti.me/api");
});

app.get('/uptime', (req, res) => {
  res.send("up");
});

/*setInterval(async function() {
  if(Event.status !== ''){
    var json = {
      "status": Event.status,
      "event": {
        "event": Event.type,
        "name": Event.name,
        "description": Event.description,
        "net": Event.net
      },
      "vehicle": {
        "vehicle": Vehicle.name,
        "stages": Vehicle.stages,
        "booster": {
          "serialNumber": Vehicle.boosterNumber,
          "flightProven": Vehicle.flightProven,
          "previousFlights": Vehicle.previousFlights
        }
      },
      "other": Event.other
    }

    let data = JSON.stringify(json);
    fs.writeFileSync('data.json', data);
    let rawdata = fs.readFileSync('data.json');
    let launchdata = JSON.parse(rawdata);
    console.log(launchdata);
  }
}, 1000);*/

class Event {
  static name = "";
  static description = "";
  static net = "";
  static other = "";
  static status = "";
}

class Vehicle {
  static name = "";
  static stages = 0;
  static boosterNumber = "";
  static flightProven = "";
  static previousFlights = 0;
}

app.get('/v1/event', (req, res) => {
  let rawdata = fs.readFileSync('data.json');
  let launchdata = JSON.parse(rawdata);
  var json = {
    "name": launchdata.event.name,
    "description": launchdata.event.description,
    "net": launchdata.event.net
  }
  res.send(json);
});

app.get('/v1/vehicle', (req, res) => {
  let rawdata = fs.readFileSync('data.json');
  let launchdata = JSON.parse(rawdata);
  var json = {
    "vehicle":  launchdata.vehicle.vehicle,
    "stages": launchdata.vehicle.stages,
    "booster": {
      "serialNumber": launchdata.vehicle.booster.serialNumber,
      "flightProven": launchdata.vehicle.booster.flightProven,
      "previousFlights": launchdata.vehicle.booster.previousFlights
    },
  }
  res.send(json);
});

app.get('/v1/data', (req, res) => {
  let rawdata = fs.readFileSync('data.json');
  let launchdata = JSON.parse(rawdata);
  var json = {
    "status": launchdata.status,
    "event": {
      "name": launchdata.event.name,
      "description": launchdata.event.description,
      "net": launchdata.event.net
    },
    "vehicle": {
      "vehicle": launchdata.vehicle.vehicle,
      "stages": launchdata.vehicle.stages,
      "booster": {
        "serialNumber": launchdata.vehicle.booster.boosterNumber,
        "flightProven": launchdata.vehicle.booster.flightProven,
        "previousFlights": launchdata.vehicle.booster.previousFlights
      }
    },
    "other": Vehicle.other
  }
  res.header("Content-Type",'application/json');
  res.send(launchdata);
});

app.post('/update-event', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.event.name = req.body.dat;
    Event.name = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-description', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.event.description = req.body.dat;
    Event.description = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-net', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.event.net = req.body.dat;
    Event.net = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-vehicle', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.vehicle.vehicle = req.body.dat;
    Vehicle.name = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-stages', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.vehicle.stages = req.body.dat;
    Vehicle.stages = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-sn', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.vehicle.booster.serialNumber = req.body.dat;
    Vehicle.boosterNumber = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-flightproven', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.vehicle.booster.flightProven = req.body.dat;
    Vehicle.flightProven = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-previousflights', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.vehicle.booster.previousFlights = req.body.dat;
    Vehicle.previousFlights = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-other', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.other = req.body.dat;
    Event.other = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

app.post('/update-status', (req, res) => {
  if(req.query.auth === process.env.AUTHCODE){
    data.status = req.body.dat;
    Event.status = req.body.dat;
    res.send("received");
    fs.writeFileSync("data.json", JSON.stringify(data));
  }
  else {
    res.send("denied");
  }
});

/*app.get('/wenhop', (req, res) => {
  var json = {
    "wen": "now!"
  }
  res.send(json);
});*/

app.get('/docs', (req, res) => {
  res.redirect("https://itslaunchti.me/api")
});

app.listen(42069, function() {
  console.log('running /');
});
