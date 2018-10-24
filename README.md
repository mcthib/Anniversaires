# Anniversaires

A small "app" to track and display birthdays. It consists of some libraries, a node.js top-level module (refreshStaticCalendar.js), and a webpage (index.html).

## Refresh ther static calendar
`node refreshStaticCalendar.js`
 => re-creates anniversaires.ics

## Refresh the webpage
`browserify webpage.js -o bundle.js`
 => re-creates the bundled javascript to power the webpage
 
## Add a birthday
There needs to be a Dates.js file alongside these with the following format:

    // Dates.js
    // The birth dates of important people (no source control)`
    (function()
    {
        "use strict";
        this.birthdays =
        [
            { name: "Bill", date: "02/06/1950" },
            { name: "XiaoFeiYang", date: "01/10/1919", calendar: "lunar" }
        ]
    }).call(this);

The weird function stuff is an early attempt at making browser/node compatible files, you can probably disregard.
