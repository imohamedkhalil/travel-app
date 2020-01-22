const projectData = {};
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static('dist'));


app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})

app.get('/', function(req, res) {
    res.send('dist/index.html');
});

app.get('/all', function(req, res) {
    res.send(projectData);
});

app.post('/add', function(req, res){
    projectData.countryName = req.body.countryName;
    projectData.lowTemp = req.body.lowTemp;
    projectData.highTemp = req.body.highTemp;
    projectData.summary = req.body.summary;
    projectData.image = req.body.image;
    projectData.city = req.body.city;
    projectData.date = req.body.date;
});
