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

//DON'T DELETE; THIS IS THE HEALTH INSURANCE SITE WE NEEDED TO ATTACH
app.get('/about', (request, response) => {
	app.use(express.static(__dirname + '/about'))
    response.sendFile(path.join(__dirname + '/about/index.html'))
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

/* ________________________________
  |this is for the final project   | 
  |________________________________|*/

app.get('/send-Input', (request, response) => {
	console.log('Calling "/send-Input" on the Node.js server.')
	var inputs = url.parse(request.url,true).query
	const letters = parseInt(inputs.letters)
	const digits = parseInt(inputs.digits)
    const specials = parseInt(inputs.specials)
    const theLeng = parseInt(inputs.theLeng)
    //Check 
	console.log('letters:' + letters)
	console.log('numbers:' + digits)
    console.log('specials:' + specials)
	console.log('theLeng:' + theLeng)

	const _D= new Date()
	const _Year = _D.getFullYear()
	const _Month = _D.getMonth()
	const _day = _D.getDate()
	console.log(_Year + _Month + _day)

	const _password = generating(letters, digits, specials, theLeng)
	
    response.type('text/plain')
	let password_gen = _password.toString()
	response.send(password_gen)
})
// Pool of characters to create passwords from
const lower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
const upper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];
const nums = ["0", "1", "3", "4", "5", "6", "7", "8", "9"];
const special = ["!", "@", "#", "$", "%", "&", "*"];

const lower2 = ["a", "b", "d", "f", "g", "h", "j", "k"];
const upper2 = ["A", "C", "D", "E", "F", "G", "H", "J"];
const nums2 = ["0", "3", "4", "5", "6", "8", "9"];
const special2 = ["!", "#", "$", "%", "&"];

const lower3 = ["d", "e", "f", "g", "h", "i", "j", "k"];
const upper3 = ["A", "B", "C", "D", "E", "I", "J", "K"];
const nums3 = ["3", "4", "5","0", "1", "8", "9"];
const special3 = [ "#", "@", "%", "&", "*", "$","!"];

const Pool1 = [lower, upper, nums, special];
const Pool2 = [lower2, upper2, nums2, special2];
const Pool3 = [lower3, upper3, nums3, special3];
const PoolArr = [Pool1, Pool2, Pool3];

function ShuffleArray(tempArray, tempShuffled, keyNum){
	console.log(tempShuffled)
    _tempArray = [];
    _tempShuffled = Array.from(tempShuffled);
    let leng = tempArray.length;

    let x = 0;
    let positionX = 0;
    if (leng != 0){
        while (x < keyNum){
            if (positionX + 1 < leng){
                ++positionX;
            } else {
                positionX = 0;
            }
            ++x;
        }
        for (let i = 0; i < leng; ++i){
            if (i == positionX){
                _tempShuffled.push(tempArray[i]);
            } else {
                _tempArray.push(tempArray[i]);
            }
        }
        return ShuffleArray(_tempArray, _tempShuffled, keyNum);
    }
    return _tempShuffled;
}
function generating(param1, param2, param3, param4){
	const _D= new Date()
	const _Year = _D.getFullYear()
	const _Month = _D.getMonth()
	const _day = _D.getDate()
	const _seconds = _D.getMilliseconds()
	console.log(_Year + _Month + _day)

	const currentPool = createPool(_Year, _Month)
	const arrEmpty = []
	const lowerLetterPool = ShuffleArray(PoolArr[currentPool[0]][0], arrEmpty, _seconds)
	console.log('lowerLetterPool output is:  ' + lowerLetterPool)
	const upperLetterPool = ShuffleArray(PoolArr[currentPool[1]][1], arrEmpty, _seconds )
	console.log('upperLetterPool output is:  ' + upperLetterPool)
	const numPool = ShuffleArray(PoolArr[currentPool[2]][2], arrEmpty, _seconds + _Month)
	console.log('numPool output is:  ' + numPool)
	const specialPool = ShuffleArray(PoolArr[currentPool[3]][3], arrEmpty, _seconds + _Year - _day)
	console.log('specialrPool output is:  ' + specialPool)
	let _password = ""

	let i = 0
	const _param1 = _seconds % param4
	const _param2 = (_param1 + 1) % param4
	const _param3 = (_param1 + 5) % param4
	while (i < param4){
		if (param1 >= 1 && i == _param1){
			_password = _password + upperLetterPool[i % upperLetterPool.length].toString()
		} else if (param2 >= 1 && i == _param2){
			_password = _password + numPool[i % numPool.length].toString()
		} else  if (param3 >= 1 && i == _param3){
			_password = _password + specialPool[i % specialPool.length].toString()
		} else {
			_password = _password + lowerLetterPool[i % lowerLetterPool.length].toString()
		}
		i = i + 1
	}
	console.log(_password)
	return _password
}

function createPool(y, m){
	const poolNum = (y/m) % 64
	let lowerTemp = 0
	let upperTemp = 0
	let numTemp = 0
	let specialTemp = 0
	let i = 0
	while ( i < poolNum){
		if (lowerTemp == 2){
			if (upperTemp != 2){
				lowerTemp = 0
				upperTemp = upperTemp + 1
			}	
			if (upperTemp == 2){
				if (numTemp != 2){
					upperTemp = 0
					numTemp = numTemp + 1
				}	
				else {
					if (specialTemp != 2){
						numTemp = 0
					}	
					specialTemp = specialTemp + 1	
				}
			}
		}
		else{
			lowerTemp = lowerTemp + 1
		}
		i = i + 1 
	}

	const createdPool = [lowerTemp, upperTemp, numTemp, specialTemp]
	console.log('createdPool is: ' + createdPool)

	return createdPool
}

// End of final project specific code

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

/*
* takes input from generate/index
* currently working on trying to get the fetch function and getting variables between html and JS
* remember to import code from backEndGenerator after solving the fetch problem 
*/