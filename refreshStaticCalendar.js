const lunisolar = require('./lunisolar.js');
const anniversaires = require('./anniversaires.js');
const dates = require('./dates.js');
const ics = require('./ics.js');
const fs = require('fs');

// Goes through and calculates everyone's birthdays from now until they are 100 years old.
// Adds an event for each and spews out the resulting calendar file (.ics).

var cal = ics.ics();

var options = { month: "long", year: "numeric", day: "numeric" };
            
// Augment the birthdays array with the next birthday date
for (var birthday = 0; birthday < dates.birthdays.length; birthday++)
{
	var age = 0;
	var reference = new Date(Date.now());
	while (age < 100)
	{
		var nextBirthday = anniversaires.CalculateNextBirthday(dates.birthdays[birthday].date, dates.birthdays[birthday].calendar, reference);
		
		reference = new Date(nextBirthday);
		reference.addDays(1);

		age = anniversaires.CalculateAge(dates.birthdays[birthday].date, dates.birthdays[birthday].calendar, reference);

		cal.addEvent("Anniversaire de " + dates.birthdays[birthday].name, age + " an(s)", nextBirthday);
	}    
}

fs.writeFile("./anniversaires.ics", cal.calendar(), function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 