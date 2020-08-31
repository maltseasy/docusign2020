import React, { useState, useEffect } from 'react';
import cpiData from '../data/cpi2019.json';
import countryData from '../data/countries.json';
import { getCompanySites } from '../data/dynamics';
import { getCountry } from '../logic/geocoding';
import Typography from "@material-ui/core/Typography";

const AutoFlags = (props) => {

    const [flags, setFlags] = useState(["test"]);

    useEffect(() => {
        getCompanySites(props.id).then((data) => {
            data.value.forEach(dataValue => {
                console.log(dataValue);
                getCountry(dataValue.fsc_longitude, dataValue.fsc_latitude).then(data => {
                    // get country name
                    var countryName = countryData.find(country => country['alpha-3'] === data).name;
                    console.log(countryName);
                    // check country name
                    var index = cpiData["Country_List"].indexOf(countryName);
                    console.log(cpiData["CPI_Score"][index]);
                    if (cpiData["CPI_Score"][index] < 50) {
                        let tempFlags = flags;
                        tempFlags.push("CPI Score of country is less than 50!");
                        setFlags(tempFlags);
                    }
                });
            })
        });
    }, [props]);

    return (
        flags.map(flag => <li style={{ color: "red" }}><Typography style={{ fontSize: "1.2rem", marginBottom: 5,color:"red" }}>Automatic flag: {flag}</Typography></li>)
    )
}

export default AutoFlags;