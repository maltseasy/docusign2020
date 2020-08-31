export const getCountry = (x, y) => {
    var response = fetch(`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?f=pjson&featureTypes=&location=${x}%2C${y}`,
        {
            method: 'GET',
        }).then(response => {
            return response.json();
        }).then(data => {
            return data.address.CountryCode
        })
    return response;
}