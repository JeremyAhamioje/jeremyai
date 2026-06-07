/**
 * Ticketmaster API wrapper for event discovery.
 * Queries events by venue name or coordinates.
 */

const API_KEY = process.env.TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

if (!API_KEY) {
  throw new Error('TICKETMASTER_API_KEY must be set in .env');
}

/**
 * Search for events at a venue by name or coordinates.
 * Returns array of event objects: { name, date, onSaleDate, venueId, url }
 */
export async function searchEventsByVenue(venueName, lat, lon) {
  try {
    // Try by venue name first
    const response = await fetch(
      `${BASE_URL}/events.json?keyword=${encodeURIComponent(venueName)}&apikey=${API_KEY}&size=200&sort=date,asc`,
      { headers: { Accept: 'application/json' } }
    );

    if (!response.ok) {
      console.error(`Ticketmaster API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const events = (data._embedded?.events || []).map(e => {
      const rawDate = e.dates?.start?.dateTime || e.dates?.start?.localDate;
      // Normalize to YYYY-MM-DD format (strip time/timezone)
      const date = rawDate ? rawDate.split('T')[0] : null;
      return {
        name: e.name,
        date,
        onSaleDate: e.dates?.start?.onSaleStartDateTime || null,
        venueId: e._embedded?.venues?.[0]?.id,
        venueName: e._embedded?.venues?.[0]?.name,
        url: e.url,
        id: e.id,
      };
    });

    return events;
  } catch (error) {
    console.error(`searchEventsByVenue error for "${venueName}":`, error.message);
    return [];
  }
}

/**
 * Search for events by coordinates (lat/lon) within a radius.
 * Returns array of events.
 */
export async function searchEventsByCoordinates(lat, lon, radiusMiles = 50) {
  try {
    const response = await fetch(
      `${BASE_URL}/events.json?latlong=${lat},${lon}&radius=${radiusMiles}&apikey=${API_KEY}&size=200&sort=date,asc`,
      { headers: { Accept: 'application/json' } }
    );

    if (!response.ok) {
      console.error(`Ticketmaster API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    const events = (data._embedded?.events || []).map(e => {
      const rawDate = e.dates?.start?.dateTime || e.dates?.start?.localDate;
      // Normalize to YYYY-MM-DD format (strip time/timezone)
      const date = rawDate ? rawDate.split('T')[0] : null;
      return {
        name: e.name,
        date,
        onSaleDate: e.dates?.start?.onSaleStartDateTime || null,
        venueId: e._embedded?.venues?.[0]?.id,
        venueName: e._embedded?.venues?.[0]?.name,
        url: e.url,
        id: e.id,
      };
    });

    return events;
  } catch (error) {
    console.error(`searchEventsByCoordinates error (${lat}, ${lon}):`, error.message);
    return [];
  }
}

/**
 * Batch search for events across multiple venues.
 */
export async function searchEventsByVenues(venues) {
  const allEvents = [];

  for (const venue of venues) {
    const events = await searchEventsByVenue(venue.name, venue.lat, venue.lon);
    allEvents.push(...events.map(e => ({ ...e, sourceName: venue.name })));

    // Rate limit: Ticketmaster allows 5000 requests/day, so space them out
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return allEvents;
}
