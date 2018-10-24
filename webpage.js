const anniversaires = require('./anniversaires.js');

$(document).ready(
    function ()
    {
        // Refresh the first table
        anniversaires.RefreshBirthdays($("#birthdays"), birthdays);
    });
