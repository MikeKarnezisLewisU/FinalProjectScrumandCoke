const express = require('express');
const path = require('path');
var url = require('url');
const app = express()

//Define port
const port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/public/')) //Using the public folder which contains our site

//Handeling a url (home page)
app.get('/', (req, res) => {
    app.use(express.static(__dirname + '/public'))
    res.sendFile(path.join(__dirname + '/public/index.html'))
})


//Functions needed for the calculations

//Calculating the BMI
app.get('/calculate-bmi', (request, response) => {
	console.log('Calling "/calculate-bmi" on the Node.js server.')
	var inputs = url.parse(request.url, true).query
	const heightInches = parseInt(inputs.inches)
	const weight = parseInt(inputs.lbs)
	
	/*
		Done by Michael Karnezis
		The purpose of my commented out code was to put all the information under one function 
		to be calculated server side.
		commented out as to not break any code because I am unable to test it locally.
		
	const diabetes = parseInt(inputs.points)
	const age = parseInt(inputs.points)
	const alzheimers = parseInt(inputs.points)
	const cancer = parseInt(inputs.points)
	*/

    //Check if the height and weight went through fine
	console.log('Height:' + heightInches)
	console.log('Weight:' + weight + ' lbs.')

	//Implement unit conversions and BMI calculations.
	const weightKilo = weight * 0.45359237
	const sqrHeight = (heightInches * 0.0254)**2
	//Return BMI instead of Todo message.
	const BMI = weightKilo / sqrHeight

	/*
		Done by Michael Karnezis
		code for server side calculations, 
		was unable to test locally so commented out
	var BMIriskPoints = 0
	var BMIstate = ""

	if (BMI < 25){
		BMIstate = "normal"
		BMIriskPoints = 0
	}
	else if (BMI < 30) {
		BMIstate = "overweight"
		BMIriskPoints = 30
	}
	else {
		BMIstate = "obese"
		BMIriskPoints = 75
	}
	var riskPoints = diabetes + age + BMIriskPoints + alzheimers + cancer
	*/

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

//Log message for yourself as reference for what's going on along with the link to local site
const logMessage = 'App listening at http://localhost:' + port
app.listen(port, () => {
    console.log(logMessage)
    console.log('... press CTRL-C to terminate')
})