// Function to filter events based on status (upcoming or past)
function filterEvents(status) {
    const cards = document.querySelectorAll('.event-card');

    cards.forEach(card => {
        if (status === 'upcoming' && !card.classList.contains('upcoming')) {
            card.style.display = 'none';
        } else if (status === 'past' && !card.classList.contains('past')) {
            card.style.display = 'none';
        } else {
            card.style.display = 'block';
        }
    });

    // Highlight the selected button
    upcomingButton.classList.toggle('selected', status === 'upcoming');
    pastButton.classList.toggle('selected', status === 'past');
}

function sortByDate() {
    const eventCards = document.querySelectorAll('.event-card');
    const sortedCards = Array.from(eventCards).sort((a, b) => {
        const dateA = new Date(a.getAttribute('data-date'));
        const dateB = new Date(b.getAttribute('data-date'));
        return dateA - dateB;
    });

    const eventCardsContainer = document.getElementById('eventCards');

    // Clear existing cards
    eventCardsContainer.innerHTML = '';

    // Append the sorted cards to the container
    sortedCards.forEach(card => {
        eventCardsContainer.appendChild(card);
    });
}


// Function to open the default email client
function openEmail() {
    window.location.href = 'mailto:willierossouw001@gmail.com';
}

/*
function createEventCard(event) {
    // ... (existing code) ...

    card.innerHTML = `
        <div class="text-box">
            <a href="${event.link}" target="_blank" class="card-link">
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <p>Status: ${status}</p>
                <p>Location: ${event.location.name}</p>
                <p>${event.miscellaneous || ''}</p>
                <p><a href="${event.location.mapLink}" target="_blank" class="map-link">Open in Google Maps</a></p>
            </a>
        </div>
    `;

    // ... (existing code) ...
}
*/
document.addEventListener('DOMContentLoaded', () => {
    const eventCardsContainer = document.getElementById('eventCards');
    const upcomingButton = document.getElementById('upcomingButton');
    const pastButton = document.getElementById('pastButton');

    // Function to create event cards
    function createEventCard(event) {
        const card = document.createElement('div');
        card.classList.add('event-card');
        
        // Determine if the event is past or upcoming
        const currentDate = new Date();
        const eventDate = new Date(event.date);
        const status = eventDate < currentDate ? 'past' : 'upcoming';

        // Add a class to the card based on status
        card.classList.add(status);
        card.setAttribute('data-date', event.date);
        card.style.backgroundImage = `url('${event.photo}')`; // Set background image

        card.innerHTML = `
        <div class="text-box">
            <a href="${event.link}" target="_blank" class="card-link">
                <h3>${event.title}</h3>
                <p>Date: ${event.date}</p>
                <p>Status: ${status}</p>
                <p>Location: ${event.location.name}</p>
                ${event.miscellaneous ? `<p> ${event.miscellaneous}</p>` : ''}
                <p><a href="${event.location.mapLink}" target="_blank" class="map-link">Open in Google Maps</a></p>
            </a>
        </div>
    `;
        return card;
    }

    // Function to fetch and display events
    async function fetchAndDisplayEvents() {
        try {
            const response = await fetch('events.json');
            const data = await response.json();

            // Clear existing cards
            eventCardsContainer.innerHTML = '';

            // Create event cards and append to the container
            data.forEach(event => {
                const card = createEventCard(event);
                eventCardsContainer.appendChild(card);
            });

            // Set default filter to upcoming events
            filterEvents('upcoming');

            // Event listeners for filter buttons
            upcomingButton.addEventListener('click', () => filterEvents('upcoming'));
            pastButton.addEventListener('click', () => filterEvents('past'));
            sortByDate();
        } catch (error) {
            console.error('Error fetching or displaying events:', error.message);
        }
    }



    // Event listeners for filter buttons
    upcomingButton.addEventListener('click', () => filterEvents('upcoming'));
    pastButton.addEventListener('click', () => filterEvents('past'));

    // Initial fetch and display of events when the page loads
    fetchAndDisplayEvents();
});
