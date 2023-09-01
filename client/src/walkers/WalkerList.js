import { useEffect, useState } from "react"
import { getCities, getWalkers, getWalkersByCity, removeWalker } from "../apiManager";
import { Walker } from "./Walker";

export const WalkerList = () => 
{
    const [walkers, setWalkers] = useState([]);
    const [cities, setCities] = useState([]);
    const [filteredWalkers, setFilteredWalkers] = useState([]);
    const [cityIsSelected, setIsCitySelected] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");

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
        getWalkersByCity(evt.target.value)
            .then((data) => {
                setFilteredWalkers(data)
            })
    };

    const handleRemoveButton = (evt, walkerId) => {
        evt.preventDefault()

        removeWalker(walkerId)
        .then(
            getWalkers()
            .then((data) => {
                setWalkers(data)
            })
        )
    }

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
        cityIsSelected ? filteredWalkers.map(walker =><>
        <Walker key={`walker--${walker.id}`}
            id = {walker.id}
            name = {walker.name}
            />
            <button onClick={(evt) => handleRemoveButton(evt, walker.id)}>Remove</button>
            </>)
        
        : walkers.map(walker => <>
            <Walker key={`walker--${walker.id}`}
            id = {walker.id}
            name = {walker.name}
            />
            <button onClick={(evt) => handleRemoveButton(evt, walker.id)}>Remove</button>
            </>)
        
    }
    </>
}