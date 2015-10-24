var testeri = 2;

function printTestNumber()
{
	return "Test number is " + testeri;
}

function fetchTest()
{
	//initialize a new http request
	var request = new XMLHttpRequest();

	//initialize a new Promise object (useful for controlling synchronization for JS apps)
	var requestPromise = new Promise(function(resolve, reject)
	{
		//set the method and target address
		request.open("GET", "http://hackathon-node-red.eu-gb.mybluemix.net/testget/");

		//event handler when the state of the request changes
		request.onreadystatechange = function()
		{
			if(request.readyState == 4)	//when the request completes...
			{
				if(request.status == 200) //and it is successful, parse the resulting text as JSON and return it
				{
					console.log("Request successfully resolved");
					console.log("Request output: " + request.responseText);
					resolve(JSON.parse(request.statusText));
				}
				else //otherwise resolve with a placeholder value and throw an error
				{
					console.log("Error on test request: " + request.status + ", " + request.statusText);
					resolve(false);
				}

			}

		}
		//finally send the request
		request.send();
	});

	return requestPromise; //return the promise object from this function
}

function fetchEvents(params)
{

}

//initial setup function, aíd functions go above this
$(document).ready(function()
{
	console.log("Beginning initial setup");

	$('#calendar').fullCalendar
	({

	})

	$(".testRetrieval").on("click", function()
	{
		fetchTest();
	});	


});
