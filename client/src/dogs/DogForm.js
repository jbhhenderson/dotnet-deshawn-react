import { useEffect, useState } from "react"
import { addDog, getCities, getWalkers } from "../apiManager";
import { useNavigate } from "react-router-dom";

export const DogForm = () => {
    const [cities, setCities] = useState([]);
    const [walkers, setWalkers] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedWalker, setSelectedWalker] = useState({});
    const [dogName, setDogName] = useState("");

    useEffect(() => {
        getCities()
            .then((data) => {
                setCities(data);
            })
        getWalkers()
        .then((data) => {
            setWalkers(data);
        })
    }, []);

    const navigate = useNavigate();

    const handleCitySelect = (evt) => {
        setSelectedCity(parseInt(evt.target.value));
    };

    const handleWalkerSelect = (evt) => {
        setSelectedWalker(parseInt(evt.target.value));
    };

    const handleSubmitButton = (evt) => {
        evt.preventDefault();
        
        const dogToSendToAPI = {
            name: dogName,
            cityId: selectedCity,
            walkerId: selectedWalker,
        }

        addDog(dogToSendToAPI)
        navigate("/")
    }

    return <>
        <input
        placeholder="Enter the new dog's name"
        value={dogName}
        onChange={
            (evt) => {
                let copy = dogName
                copy = evt.target.value
                setDogName(copy)
            }
        } />

        <div>
            <label>
                Select a City:
                <select onChange={handleCitySelect} placeholder="Select a City">
                    <option value={"0"}>Select a City - Required</option>
                    {
                        cities.map((city) => <option value={city.id} key={city.id}>{city.name}</option>)
                    }
                </select>
            </label>
        </div>

        <div>
            <label>
                <select onChange={handleWalkerSelect} placeholder="Select a Walker (Optional)">
                    <option value={"0"}>Select a Walker - Optional</option>
                    {
                        walkers.map((walker) => <option value={walker.id} key={walker.id}>{walker.name}</option>)
                    }
                </select>
            </label>
        </div>

        <button onClick={handleSubmitButton}>Submit Dog</button>
    </>
}