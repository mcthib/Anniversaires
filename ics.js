/* global saveAs, Blob, BlobBuilder, console */
/* exported ics */
(function()
{
  this.ics = function(uidDomain, prodId) {
    'use strict';

    if (typeof uidDomain === 'undefined') { uidDomain = 'default'; }
    if (typeof prodId === 'undefined') { prodId = 'Calendar'; }

    var SEPARATOR = '\n';
    var calendarEvents = [];
    var calendarStart = [
      'BEGIN:VCALENDAR',
      'PRODID:' + prodId,
      'VERSION:2.0'
    ].join(SEPARATOR);
    var calendarEnd = SEPARATOR + 'END:VCALENDAR';
    var BYDAY_VALUES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];

    return {
      /**
       * Returns calendar
       * @return {string} Calendar in iCalendar format
       */
      'calendar': function() {
        return calendarStart + SEPARATOR + calendarEvents.join(SEPARATOR) + calendarEnd;
      },

      /**
       * Add event to the calendar
       * @param  {string} subject     Subject/Title of event
       * @param  {string} description Description of event
       * @param  {string} day         Date of event
       */
      'addEvent': function(subject, description, day) {
        if (typeof subject === 'undefined' ||
          typeof description === 'undefined' ||
          typeof day === 'undefined'
        ) {
          return false;
        }

        var start_date = new Date(day);
        var start_year = ("0000" + (start_date.getFullYear().toString())).slice(-4);
        var start_month = ("00" + ((start_date.getMonth() + 1).toString())).slice(-2);
        var start_day = ("00" + ((start_date.getDate()).toString())).slice(-2);
        var start = start_year + start_month + start_day;

        var now_date = new Date();
        var now_year = ("0000" + (now_date.getFullYear().toString())).slice(-4);
        var now_month = ("00" + ((now_date.getMonth() + 1).toString())).slice(-2);
        var now_day = ("00" + ((now_date.getDate()).toString())).slice(-2);
        var now_hours = ("00" + (now_date.getHours().toString())).slice(-2);
        var now_minutes = ("00" + (now_date.getMinutes().toString())).slice(-2);
        var now_seconds = ("00" + (now_date.getSeconds().toString())).slice(-2);
        var now_time = 'T' + now_hours + now_minutes + now_seconds;
        var now = now_year + now_month + now_day + now_time;

        var calendarEvent = [
          'BEGIN:VEVENT',
          'UID:' + calendarEvents.length + "@" + uidDomain,
          'CLASS:PUBLIC',
          'DESCRIPTION:' + description,
          'DTSTAMP;VALUE=DATE-TIME:' + now,
          'DTSTART:' + start,
          'DTEND:' + start,
          'SUMMARY:' + subject,
          'TRANSP:TRANSPARENT',
          'END:VEVENT'
        ];

        calendarEvent = calendarEvent.join(SEPARATOR);

        calendarEvents.push(calendarEvent);
        return calendarEvent;
      },
    };
  };
}).call(this);