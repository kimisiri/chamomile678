const events = [{
    event_name: "Chamo Chajai",
    date: "20/10/2025 - 31/10/2025",
    time: "",
    location: "",
    thumbnail: "stamps/Placeholder.PNG",
    description: "Encouraging words or smth idk"
  },
  {
    event_name: "Chamoo Cinema",
    date: "",
    time: "12:00 - 18:00",
    location: "A623",
    thumbnail: "https://media1.tenor.com/m/SeLBRCUiQaoAAAAC/absolute-cinema-cinema.gif",
    description: "Movie time"
  },
  {
    event_name: "Midweek Melody",
    date: "12/11/2025 - 25/11/2025",
    time: "12:00 - 13:30",
    location: "Aditayathorn Building (G Floor)",
    thumbnail: "https://media1.tenor.com/m/3e367oeQvBIAAAAd/rainbow-stickman.gif",
    description: "Vibe"
  },
  {
    event_name: "Creative Content",
    date: "30/10/2025",
    time: "TBA",
    location: "Online",
    thumbnail: "https://media1.tenor.com/m/zO6Eq_dyctQAAAAC/day-zero-claw.gif",
    description: "Create content"
  },

];


const eventsContainer = document.getElementById('scroll-container');

function parseEventDate(dateString, timeString) {
  var day;
  var month;
  if (dateString !== "") {
    if (dateString.includes(" - ")) {
      const [datePart1, datePart2] = dateString.split(' - ');
      const [day1, month1, year1] = datePart1.split('/');
      const [day2, month2, year2] = datePart2.split('/');

      const dateObj1 = new Date(year1, month1 - 1, day1);
      const dateObj2 = new Date(year2, month2 - 1, day2);

      day = day1 + "-" + day2;
      month = dateObj1.toLocaleDateString('en-US', {
        month: 'short'
      }).toUpperCase();
      if (month1 !== month2) {
        month = month + "-" + dateObj2.toLocaleDateString('en-US', {
          month: 'short'
        }).toUpperCase();
      }

    } else {
      const [datePart1, datePart2] = dateString.split(' - ');
      const [day1, month1, year1] = datePart1.split('/');
      const dateObj1 = new Date(year1, month1 - 1, day1);
      day = day1;
      month = dateObj1.toLocaleDateString('en-US', {
        month: 'short'
      }).toUpperCase();
    }


  } else {
    day = "TBA";
    month = "";
    dateString = "TBA";
  }

  var time = null;

  if (timeString !== "") {
    time = timeString;
  }

  return {
    fullDate: dateString,
    day: day,
    month: month,
    time: time
  };
}

events.forEach(event => {
  const dateData = parseEventDate(event.date, event.time);

  var cardHTML = `
            <div class="event-card">
                <div class="event-thumbnail" style="background-image: url('${event.thumbnail}');">
                    <div class="date-badge">
                        <span class="day">${dateData.day}</span>
                        <span class="month">${dateData.month}</span>
                    </div>
                </div>
                <div class="event-content">
                    <h2 class="event-name">${event.event_name}</h2>
                    <p class="event-info" style="">
                        <span class="icon-text"><img src="calendar.png" style="width: 1rem; height: 1rem;"> ${dateData.fullDate}</span>
                        TIMEREPLACE
                        LOCATIONREPLACE
                    </p>
                    <p class="event-description">${event.description}</p>
                    <a href="#" class="details-button">View Details &rarr;</a>
                </div>
            </div>
        `;
  console.log(dateData.time)
  if (dateData.time) {
    cardHTML = cardHTML.replace("TIMEREPLACE", `<span class="icon-text"><img src="time.png" style="width: 1rem; height: 1rem;"> ${dateData.time}</span>`)
  } else {
    cardHTML = cardHTML.replace("TIMEREPLACE", "</br>")
  }
  if (event.location !== "") {
    cardHTML = cardHTML.replace("LOCATIONREPLACE", `<span class="icon-text"><img src="location.png" style="width: 1rem; height: 1rem;"> ${event.location}</span>`)
  } else {
    cardHTML = cardHTML.replace("LOCATIONREPLACE", "</br>")
  }
  eventsContainer.insertAdjacentHTML('beforeend', cardHTML);
});