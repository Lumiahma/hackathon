var testeri = 2;

function printTestNumber()
{
	return "Test number is " + testeri;
}

//change a timestamp to date
function timestampToDate(param)
{
		ts = new Date(param);
		
    return ts.getFullYear() + "-" + (ts.getMonth() < 10 ? "0" : "") + ts.getMonth() + "-" 
					+ (ts.getDate() < 10 ? "0" : "") + ts.getDate() + 'T' 
					+ (ts.getHours() < 10 ? "0" : "") + ts.getHours() + ":" 
					+ 
      (ts.getMinutes() < 10 ? "0" : "") + ts.getMinutes() + ":" + 
      (ts.getSeconds() < 10 ? "0" : "") + ts.getSeconds();
}

function returnDate(param)
{
	  ts = new Date(param);
		
    return ts.getFullYear() + "-" + (ts.getMonth() < 10 ? "0" : "") + ts.getMonth() + "-" 
				+ (ts.getDate() < 10 ? "0" : "") + ts.getDate();
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
					resolve(JSON.parse(request.responseText));
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
		events: [
        {
            title  : 'Popeda Hervannankiertue',
            start  : '2015-10-29T22:00:00',
						end		 : '2015-10-30T04:00:00',
						allDay : false						
        },
        {
            title  : 'Free buckets for everyone',
            start  : '2015-11-05',
            end    : '2010-11-07',
						allDay : false
        },
        {
            title  : 'Elcor Hamlet',
            start  : '2015-11-25T12:30:00',
						end		 : '2015-11-28T04:30:00',
            allDay : false // will make the time show
        }
    ]
	});

	$(".testRetrieval").on("click", function()
	{
		fetchTest().then(function(result)
		{
			console.log("Test 1:" + result[0].title);
			console.log("Test 2:" + timestampToDate(result[0].times[0].start_datetime));
			console.log("Test 3:" + timestampToDate(result[0].times[0].end_datetime));
			/*console.log("Test 4:" + result[0].times[0].start_datetime);
			console.log("Test 5:" + result[0].times[0].end_datetime);*/
			console.log("Test 6:" + !result[0].single_datetime ? result[0].times[0].start_datetime : 					
					result[0].start_datetime);
			console.log("Test 7:" + !result[0].single_datetime ? result[0].times[0].end_datetime : 
					result[0].end_datetime);
			console.log("Test 8:" + result[0].contact_info.link);
			console.log("Test 9:" + result[0].single_datetime == false);
			console.log("Test 10:" + Date.now());
			
			var testEvent = 
			{
				"title": result[0].title + "\n\n" + result[0].description,
				"allDay": false,
				"start": !result[0].single_datetime ? timestampToDate(result[0].times[0].start_datetime) : 					
					timestampToDate(result[0].start_datetime),
				"end":	 !result[0].single_datetime ? timestampToDate(result[0].times[0].end_datetime) : 
					timestampToDate(result[0].end_datetime)
				/*"start": Date.now(),
				"end": Date.now() + 3600*/
			}			
			
			$('#calendar').fullCalendar('renderEvent',testEvent);	
		});
	});	


});
