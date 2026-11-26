const anniversaires = require('./anniversaires.js');

const fullDate = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric', month: 'long', year: 'numeric'
});
const monthAndYear = new Intl.DateTimeFormat('fr-FR', {
    month: 'long', year: 'numeric'
});

function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
}

function dateElement(date) {
    const time = element('time', fullDate.format(date));
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    time.dateTime = date.getFullYear() + '-' + month + '-' + day;
    return time;
}

function renderBirthdays(birthdays) {
    const reference = new Date();
    const entries = birthdays.map(birthday => {
        const date = anniversaires.CalculateNextBirthday(birthday.date, birthday.calendar, reference);
        const ageReference = new Date(date).addDays(1);
        const age = anniversaires.CalculateAge(birthday.date, birthday.calendar, ageReference);
        return { name: birthday.name, date, age: age + ' ans' };
    }).sort((a, b) => a.date - b.date);

    if (!entries.length) {
        document.getElementById('empty-birthdays').hidden = false;
        return;
    }

    const next = entries[0];
    document.getElementById('next-name').textContent = next.name;
    document.getElementById('next-details').append(dateElement(next.date), ' · ', next.age);
    document.getElementById('next-birthday').hidden = false;

    const months = document.getElementById('birthdays');
    let previousMonth;
    let list;
    for (const entry of entries) {
        const label = monthAndYear.format(entry.date);
        if (label !== previousMonth) {
            const section = element('section', undefined, 'month');
            const heading = element('h2', label[0].toUpperCase() + label.slice(1));
            list = element('ul');
            list.setAttribute('role', 'list');
            section.append(heading, list);
            months.append(section);
            previousMonth = label;
        }

        const row = element('li', undefined, 'birthday');
        row.append(dateElement(entry.date), element('strong', entry.name), element('span', entry.age, 'age'));
        list.append(row);
    }

    months.style.setProperty('--month-rows', Math.ceil(months.childElementCount / 2));
}

renderBirthdays(typeof birthdays === 'undefined' ? [] : birthdays);
