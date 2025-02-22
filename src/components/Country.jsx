import "./Country.css"
import PropTypes from "prop-types"
import { useEffect, useState } from "react"


function InfoItem({label, data}) {
    return (
        <div className="infoItem">
            <span>{label}</span>
            <div className="lineH"></div>
            <span>{data}</span>
        </div>
    )
}
function OhterInfo({ label, data }) {
    if (!data || (typeof data === "object" && Object.keys(data).length === 0)) {
        return null; // Si data está vacío, no renderiza nada
    }

    let displayData;

    if (Array.isArray(data)) {
        // Si data es un array (ej. capital), unir los valores con comas
        displayData = data.length > 0 ? data.join(", ") : "No data available";
    } else if (typeof data === "object") {
        // Si data es un objeto
        const firstKey = Object.keys(data)[0];

        if (firstKey) {
            if (label === "Languages") {
                // Mostrar los valores del objeto (ej. { nor: "Norwegian" } → "Norwegian")
                displayData = Object.values(data).join(", ");
            } else if (label === "Currencies") {
                // Extraer y mostrar solo el nombre de la primera moneda
                displayData = data[firstKey]?.name || "No data available";
            } else {
                displayData = "No data available"; // Si es otro objeto sin manejo específico
            }
        } else {
            displayData = "No data available"; // Si el objeto está vacío
        }
    } else {
        // Si es un string o número, mostrarlo directamente
        displayData = data;
    }

    return (
        <div className="otherInfoFlex">
            <span>{label}</span>
            <span>{displayData}</span>
        </div>
    );
}



export default function Country({ dataCountry }){

    useEffect(() => {
        console.log(dataCountry)
    },[dataCountry]);

    return (
        <div className="countryContainer">
            <div className="imgCountry"
                style={{ backgroundImage: dataCountry[0].flags.svg ? `url(${dataCountry[0].flags.svg})` : "" }}/>


            <h1>{dataCountry[0].name.common}</h1>
            <span>{dataCountry[0].name.official}</span>
            <div className="containerInfoItem">
                <InfoItem label={"Population"} data={dataCountry[0].population}/>
                <InfoItem label={"Area"} data={dataCountry[0].area}/>
            </div>
            <div className="otherInfo">
                <div className="lineot"></div>
                <OhterInfo label={"Capital"} data={dataCountry[0].capital}/>
                <div className="lineot"></div>
                    <OhterInfo label={"Subregion"} data={dataCountry[0].subregion}/>
                <div className="lineot"></div>
                <OhterInfo label={"Language"} data={dataCountry[0].languages}/>
                <div className="lineot"></div>
                <OhterInfo label={"Currencies"} data={dataCountry[0].currencies}/>
                <div className="lineot"></div>
                <OhterInfo label={"Continents"} data={dataCountry[0].continents}/>
                <div className="lineot"></div>
            </div>
            <span className="otherInfoFlex">Neighbouring Countries</span>            
        </div>
    )
}

Country.propTypes = {
    dataCountry: PropTypes.object
}

OhterInfo.propTypes = {
    label: PropTypes.string.isRequired, // Siempre debe ser un string
    data: PropTypes.oneOfType([
        PropTypes.string,            // Si data es un string
        PropTypes.number,            // Si data es un número
        PropTypes.arrayOf(PropTypes.string), // Si data es un array de strings
        PropTypes.object             // Si data es un objeto (como currencies)
    ])
};