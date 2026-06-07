// Initial events array
let events = [
    {
        id: 1,
        name: "Tech Conference 2026",
        date: "2026-06-15",
        description: "A gathering of tech enthusiasts to discuss future trends."
    },
    {
        id: 2,
        name: "Music Festival",
        date: "2026-07-20",
        description: "Enjoy live performances from top artists around the world."
    },
    {
        id: 3,
        name: "Art Exhibition",
        date: "2026-05-01",
        description: "Showcasing beautiful art pieces from local artists."
    }
];

// DOM Elements
const eventForm = document.getElementById('event-form');
const eventList = document.getElementById('event-list');
const warningMsg = document.getElementById('warning-message');
const searchBar = document.getElementById('search-bar');
const currentYearSpan = document.getElementById('current-year');

// Set current year in footer
currentYearSpan.textContent = new Date().getFullYear();

// Function to render events
function renderEvents(eventsToDisplay) {
    eventList.innerHTML = '';
    
    // Sort events by date ascending
    const sortedEvents = [...eventsToDisplay].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const isPast = eventDate < today;
        
        const card = document.createElement('div');
        card.className = `event-card ${isPast ? 'past' : ''}`;
        
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p class="event-date">Date: ${event.date}</p>
            <p>${event.description}</p>
            <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
        `;
        
        eventList.appendChild(card);
    });
}

// Function to add a new event
eventForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('event-name').value.trim();
    const date = document.getElementById('event-date').value;
    const desc = document.getElementById('event-desc').value.trim();
    
    if (!name || !date || !desc) {
        warningMsg.classList.remove('hidden');
        return;
    }
    
    warningMsg.classList.add('hidden');
    
    const newEvent = {
        id: Date.now(),
        name: name,
        date: date,
        description: desc
    };
    
    events.push(newEvent);
    renderEvents(events);
    eventForm.reset();
});

// Function to delete an event
function deleteEvent(id) {
    events = events.filter(event => event.id !== id);
    renderEvents(events);
}

// Search functionality
searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredEvents = events.filter(event => 
        event.name.toLowerCase().includes(searchTerm) || 
        event.date.includes(searchTerm)
    );
    renderEvents(filteredEvents);
});

// Initial render
renderEvents(events);
