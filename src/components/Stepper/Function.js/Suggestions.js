const mapboxToken =
  "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg";

export async function fectchAdressSuggestions(query) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&country=IN`
    );
    const data = await response.json();
    const suggestions = data.features.map((feature) => feature.place_name);
    return suggestions;
  } catch (error) {
    console.error("Error fetching address suggestions", error);
    return [];
  }
}
