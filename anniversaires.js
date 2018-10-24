// Anniversaires.js
// A set of helper functions to calculate birthdays, lunisolar and gregorian.
const lunisolar = require('./lunisolar.js');

// Extend the Date datatype with an addDays method (from https://stackoverflow.com/questions/563406/add-days-to-javascript-date)
Date.prototype.addDays = function(days)
{
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

    "use strict";

    // Compares the dates of 2 birthdays
    function CompareBirthdays(a, b)
    {
        return a["nextBirthday"] - b["nextBirthday"];
    }

    // Calculates the date of the next birthday
    function CalculateNextBirthday(birthDate, calendar, reference)
    {
        var birthDateDate = new Date(birthDate);

        if (reference === undefined)
        {
            reference = new Date(Date.now());
        }
        
        var birthdayThisYear = new Date(reference.getFullYear(), birthDateDate.getMonth(), birthDateDate.getDate(), 23, 59, 59, 999);

        if (calendar == "lunar")
        {
            birthdayThisYear = lunisolar.GetGregorianFromLunisolar(birthdayThisYear);
        }

        if (birthdayThisYear <= reference)
        {
            birthdayThisYear = new Date(reference.getFullYear() + 1, birthDateDate.getMonth(), birthDateDate.getDate(), 23, 59, 59, 999);
            if (calendar == "lunar")
            {
                birthdayThisYear = lunisolar.GetGregorianFromLunisolar(birthdayThisYear);
            }
        }

        return new Date(birthdayThisYear.getFullYear(), birthdayThisYear.getMonth(), birthdayThisYear.getDate());
    }

    // Calculates the age
    function CalculateAge(birthDate, calendar, reference)
    {
        var birthDateDate = new Date(birthDate);
        if (calendar == "lunar")
        {
            birthDateDate = lunisolar.GetGregorianFromLunisolar(birthDateDate);
        }

        if (reference === undefined)
        {
            reference = new Date(Date.now());
        }

        return (new Date((reference - birthDateDate))).getFullYear() - 1970;            
    }

    // Adds the birthdays to the birthday table
    function RefreshBirthdays(table, birthdays)
    {
        // Augment the birthdays array with the next birthday date
        for (var birthday = 0; birthday < birthdays.length; birthday++)
        {
            var nextBirthday = this.CalculateNextBirthday(birthdays[birthday].date, birthdays[birthday].calendar);
            birthdays[birthday]["nextBirthday"] = nextBirthday;
        }

        // Sort the birthdays
        birthdays.sort(CompareBirthdays);

        for (birthday = 0; birthday < birthdays.length; birthday++)
        {
            var nextBirthday = birthdays[birthday].nextBirthday;
            var row = $(document.createElement("tr"));

            var nameElement = $(document.createElement("td")).addClass("birthdayName");
            var separatorElement = $(document.createElement("td")).addClass("birthdaySeparator");
            var dateElement = $(document.createElement("td")).addClass("birthdayDate");

            var t = new Date(nextBirthday).addDays(1);
            var age = CalculateAge(birthdays[birthday].date, birthdays[birthday].calendar, t);

            nameElement.html(birthdays[birthday].name.toUpperCase() + "&nbsp;&nbsp;(" + age + " ans)");
            var options = { month: "long", year: "numeric", day: "numeric" };
            dateElement.html(nextBirthday.toLocaleDateString("fr-FR", options));

            row.append(nameElement);
            row.append(separatorElement);
            row.append(dateElement);

            table.append(row);
        }
    }

module.exports.CalculateNextBirthday = CalculateNextBirthday;
module.exports.CalculateAge = CalculateAge;
module.exports.RefreshBirthdays = RefreshBirthdays;