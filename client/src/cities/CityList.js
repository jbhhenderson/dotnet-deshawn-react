import { useEffect, useState } from "react"
import { addCity, getCities } from "../apiManager";
import { City } from "./City";

export const CityList = () => 
{
    const [cities, setCities] = useState([]);
    const [newCity, updateNewCity] = useState({
        name: ""
    });

    useEffect(() => {
        getCities()
            .then((data) => {
                setCities(data)
            })
    }, []);

    const handleAddButtonClick = (event) => {
        event.preventDefault()
        const cityToSendToAPI = {
            name: newCity.name
        }

        addCity(cityToSendToAPI)
            .then(() => {
                // getCities((data) => {
                //     setCities(data)
                // })
                getAllCities()
            })
    };

    const getAllCities = async () => {
        const fetchedCities = await getCities()
        setCities(fetchedCities)
    }

    return <>
    <input
        placeholder="Enter the new city's name"
        value={newCity.name}
        onChange={
            (evt) => {
                const copy = {...newCity}
                copy.name = evt.target.value
                updateNewCity(copy)
            }
        } />
    <button 
        onClick={(clickEvent) => handleAddButtonClick(clickEvent)}
        className="btn btn-primary">
        Add City
    </button>
    {
        cities.map(city => <City key={`city--${city.id}`}
            id = {city.id}
            name = {city.name}
        />)
    }
    </>
}