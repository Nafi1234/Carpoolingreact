const mapboxToken =
  "pk.eyJ1IjoibmFmaTc4OSIsImEiOiJjbG81ZTJ5M2cwN3RpMmtuenQ2ZHRkdWkyIn0.uLkKyNbf5FxAYBoAGi3eRg";

export async function fectchCorrdinate(query) {
  try {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${mapboxToken}&country=IN`
    );
    const data = await response.json();

    if (data.features.length > 0) {
      const firstFeature = data.features[0];
      const coordinates = firstFeature.geometry.coordinates;

      return coordinates;
    } else {
      console.error("No features found for the given address");
      return null;
    }
  } catch (error) {
    console.error("Error fetching address suggestions", error);
    return null;
  }
}
