import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getCities, getCitiesByWalkerId, getWalker, updateWalker } from "../apiManager"

export const WalkerDetails = () => {
    const {walkerId} = useParams()
    const [walker, setWalker] = useState({})
    const [currentCities, setCurrentCities] = useState([])
    const [cityIds, setCityIds] = useState([])
    const [cities, setCities] = useState([])
    const [walkerName, setWalkerName] = useState("")

    const navigate = useNavigate()

    useEffect(() => {
        getWalker(walkerId)
        .then((data) => {
            setWalker(data)
        })
        getCitiesByWalkerId(walkerId)
        .then((data) => {
            let currentCityArray = []
            for(const city of data) {
                currentCityArray.push(city.id)
            }
            setCityIds(currentCityArray)
            setCurrentCities(data)
        })
        getCities()
        .then((data) => {
            setCities(data)
        })
    }, [])

    //create text input with original name placeholder
    //create list of checkboxes for all cities
    //have cities be checked automatically if they are in currentCities
    //follow instructions in ticket for API handling of old and new WalkerCities
    //create update button to send all API requests upon finishing editing and navigate to WalkerList

    const checkCurrentCity = (city) => {
        if(cityIds.includes(city.id)) {
            setCurrentCities(currentCities.filter(c => c.id != city.id))
            setCityIds(cityIds.filter(ci => ci != city.id))
        } else {
            setCurrentCities([...currentCities, city])
            setCityIds([...cityIds, city.id])
        }
    }

    const findCity = (id) => {
        const result = cityIds.includes(id)
        return result
    }

    const handleUpdateButton = (evt) => {
        evt.preventDefault();
        
        const walkerToSendToAPI = {
            name: walkerName ? walkerName : walker.name,
            id: walker.id,
            cities: currentCities
        }

        updateWalker(walkerToSendToAPI)
        navigate("/walkers")
    }

    return <>
        <input 
        placeholder={walker.name}
        value={walkerName}
        onChange={
            (evt) => {
                let copy = walkerName
                copy = evt.target.value
                setWalkerName(copy)
            }
        }
        />
        <div>
            {
                cities.map(city => {
                    return <>
                    <div>{city.name}</div>
                        <input
                            type="checkbox"
                            key={city.id}
                            value={city.id}
                            checked={findCity(city.id)}
                            onChange={() => checkCurrentCity(city)}
                        />
                    </>
                })
            }
        </div>
        <button onClick={handleUpdateButton}>Update</button>
    </>
}