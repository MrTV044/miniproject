async function fetchEvents() {
  try {
    const response = await fetch(
      "http://localhost:8000/api/v1/organizer-events"
    );
    const data = await response.json();
    setEvents(data.data);
    console.log(data.data);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}
