//SERVER SIDE JAVASCRIPT
//Password Generator Final Project

//Need requirements below in order for us to use easier functionality
const express = require('express')
const app = express()
const path = require('path');

var url = require('url');
var dt = require('./date-time');

const port = process.env.PORT || 3000
const majorVersion = 1
const minorVersion = 2

// Use Express to publish static HTML, CSS, and JavaScript files that run in the browser. 
app.use(express.static(__dirname + '/static/'))

//DON'T DELETE; THIS IS FOR THE FINAL PROJECT PROPOSAL
app.get('/proposal', (request, response) => {
	app.use(express.static(__dirname + '/proposal'))
    response.sendFile(path.join(__dirname + '/proposal/index.html'))
})

//DON'T DELETE; THIS IS THE HEALTH INSURANCE SITE WE NEEDED TO ATTACH
app.get('/health', (request, response) => {
	app.use(express.static(__dirname + '/health'))
    response.sendFile(path.join(__dirname + '/health/index.html'))
})

//DON'T DELETE; THIS IS THE GENERATOR PAGE
app.get('/generate', (request, response) => {
	app.use(express.static(__dirname + '/generate'))
    response.sendFile(path.join(__dirname + '/generate/index.html'))
})

// The app.get functions below are being processed in Node.js running on the server. (CLASS EXAMPLES)
// Implement a custom About page.
app.get('/about', (request, response) => {
	console.log('Calling "/about" on the Node.js server.')
	response.type('text/plain')
	response.send('About Node.js on Azure Template.')
})

app.get('/version', (request, response) => {
	console.log('Calling "/version" on the Node.js server.')
	response.type('text/plain')
	response.send('Version: '+majorVersion+'.'+minorVersion)
})

// Return the value of 2 plus 2.
app.get('/2plus2', (request, response) => {
	console.log('Calling "/2plus2" on the Node.js server.')
	response.type('text/plain')
	response.send('4')
})

// Add x and y which are both passed in on the URL. 
app.get('/add-two-integers', (request, response) => {
	console.log('Calling "/add-two-integers" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	let x = parseInt(inputs.x)
	let y = parseInt(inputs.y)
	let sum = x + y
	response.type('text/plain')
	response.send(sum.toString())
})

//OUR HEALTH INSURANCE CALCULATOR BMI STUFF NEEDED (couldn't get it to work on two different servers.)
//Calculating the BMI
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)
	
    //Check if the height and weight went through fine
	console.log('Height:' + heightInches)
	console.log('Weight:' + weight + ' lbs.')

	//Implement unit conversions and BMI calculations.
	const weightKilo = weight * 0.45359237
	const sqrHeight = (heightInches * 0.0254)**2
	//Return BMI instead of Todo message.
	const BMI = weightKilo / sqrHeight

	response.type('text/plain')
	strBMI = BMI.toString()
	response.send(strBMI)
	//response.send(BMI.toString())
})
//INSERT GET FUNCTION FOR DOING THE COMPARISONS (INFO FROM CALCULATE POINTS!)
//Calculating the Blood Pressure category 
app.get('/calculate-bp',(request,response) => {
	console.log('Calling "/calculate-bp" on the Node.js server')
	var inputs = url.parse(request.url,true).query
	const systolic = parseInt(inputs.systolic)
	const diastolic = parseInt(inputs.diastolic)
	response.type('text/plain')
	strCategoryPoints = categoryPoints.toString()
	response.send(strCategoryPoints)
	
})

// Test a variety of functions.
app.get('/test', (request, response) => {
    // Write the request to the log. 
    console.log(request);

    // Return HTML.
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.write('<h3>Testing Function</h3>')

    // Access function from a separate JavaScript module.
    response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");

    // Show the full url from the request. 
    response.write("req.url="+request.url+"<br><br>");

    // Suggest adding something tl the url so that we can parse it. 
    response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
    
	// Parse the query string for values that are being passed on the URL.
	var q = url.parse(request.url, true).query;
    var txt = q.year + " " + q.month;
    response.write("txt="+txt);

    // Close the response
    response.end('<h3>The End.</h3>');
})

// Return Batman as JSON.
var spiderMan = {
	"firstName":"Bruce",
	"lastName":"Wayne",
	"preferredName":"Batman",
	"email":"darkknight@lewisu.edu",
	"phoneNumber":"800-bat-mann",
	"city":"Gotham",
	"state":"NJ",
	"zip":"07101",
	"lat":"40.73",
	"lng":"-74.17",
	"favoriteHobby":"Flying",
	"class":"cpsc-24700-001",
	"room":"AS-104-A",
	"startTime":"2 PM CT",
	"seatNumber":"",
	"inPerson":[
		"Monday",
		"Wednesday"
	],
	"virtual":[
		"Friday"
	]
}

app.get('/batman', (request, response) => {
	console.log('Calling "/batman" on the Node.js server.')
	response.type('application/json')
	response.send(JSON.stringify(spiderMan, null, 4))
})

// Custom 404 page.
app.use((request, response) => {
  response.type('text/plain')
  response.status(404)
  response.send('404 - Not Found')
})

// Custom 500 page.
app.use((err, request, response, next) => {
  console.error(err.message)
  response.type('text/plain')
  response.status(500)
  response.send('500 - Server Error')
})

app.listen(port, () => console.log(
  `Express started at \"http://localhost:${port}\"\n` +
  `press Ctrl-C to terminate.`)
)
