import React, { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function Places(props) {
  const [address, setaddress] = useState(props.location ? props.Location : "");

  const handleChange = (address) => {
    setaddress(address);
  };

  const handleSelect = async (address) => {
    await setaddress(address);
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then(async (latLng) => {
        //console.log("Success", latLng);
        let data = await JSON.stringify({
          lat: latLng.lat,
          lng: latLng.lng,
          address: address,
        });
        await props.setLocation(data);
        //  await console.log(address)
        props.setaddress(address);
        // await console.log(props.location)
      })
      .catch((error) => console.error("Error", error));

    //props.setLocation(address);
  };
  useEffect(() => {
    setaddress(props.location ? props.location : "");
  }, [props.location]);
  return (
    <>
      <span className="label">Location</span>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: "Search Places ...",
                className: "location-search-input locationSearch",
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, index) => {
                if (index < 5) {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        className,
                        style,
                      })}
                    >
                      <span>{suggestion.description}</span>
                    </div>
                  );
                } else {
                  return <></>;
                }
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </>
  );
}
