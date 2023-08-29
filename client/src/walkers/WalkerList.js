import { useEffect, useState } from "react"
import { getCities, getWalkers, getWalkersByCity } from "../apiManager";
import { Walker } from "./Walker";

export const WalkerList = () => 
{
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredWalkers, setFilteredWalkers] = useState([]);
    const [cityIsSelected, setIsCitySelected] = useState(false);
    const [selectedCity, setSelectedCity] = useState("")

    //api and api manager have fetches set up for filtering
    //need to create drop down and apply logic to determine if a city has been selected or not
    //if a city is selected use filtered list instead

    useEffect(() => {
        getWalkers()
            .then((data) => {
                setWalkers(data)
            })
        getCities()
            .then((data) => {
                setCities(data)
            })
    }, []);

    const selectChange = (evt) => {
        setSelectedCity(evt.target.value);
        setIsCitySelected(true);
        // if (evt.target.value) {
            getWalkersByCity(evt.target.value)
                .then((data) => {
                    setFilteredWalkers(data)
                })
        // }
    };

    return <>
        <div>
            <label>
                Select a City:
                <select value={selectedCity} onChange={selectChange}>
                    <option value={"0"}>-All Walkers-</option>
                    {
                        cities.map((city) => <option value={city.name} key={city.id}>{city.name}</option>)
                    }
                </select>
            </label>
        </div>
    {
        cityIsSelected ? filteredWalkers.map(walker => <Walker key={`walker--${walker.id}`}
            id = {walker.id}
            name = {walker.name}
            />)
        
        : walkers.map(walker => <Walker key={`walker--${walker.id}`}
            id = {walker.id}
            name = {walker.name}
            />)
        
    }
    </>
}