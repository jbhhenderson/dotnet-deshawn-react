import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getAvailableDogs, getCitiesByWalkerId, getDog, getDogs, getWalker, updateDog } from "../apiManager";

export const WalkerDog = () => {
    //create button in Walker that passes walkerId to this function
    //get walker ID with useParams
    //get cities from walkercities in API that match walkerId, add them to new array
    //get dogs by city in API that match city IDs, add them to new array
    //display found dogs in selector
    //when dog selected, add walkerId to dog object and go to that dog's details page

    const {walkerId} = useParams();
    const [walker, setWalker] = useState({})
    const [dogs, setDogs] = useState([])
    const [availableDogs, setAvailableDogs] = useState([]);
    const [availableCities, setAvailableCities] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getWalker(walkerId)
        .then((data) => {
            setWalker(data)
        })
        getCitiesByWalkerId(walkerId)
        .then((data) => {
            setAvailableCities(data)
        })
        getDogs()
        .then((data) => {
            setDogs(data)
        })
    }, [])

    useEffect(() => {
        setAvailableDogs(filterDogs())
        
    }, [availableCities, dogs, walker])

    const filterDogs = () => {
        let foundDogs = [];

        availableCities.map(city => {
            dogs.map(dog => {
                if (dog.cityId == city.id && dog.walkerId != walker.id) {
                    foundDogs.push(dog)
                }
            })
        })

        return foundDogs
    }

    const handleDogButton = (evt, dog) => {
        evt.preventDefault();

        dog.walkerId = walker.id

        updateDog(dog)

        navigate(`/dogs/${dog.id}`)
    };

    return <>
        <div>
            {
                availableDogs.map(d => {
                    return <button onClick={evt => handleDogButton(evt, d)} key={d.id}>{d.name}</button>
                })
            }
        </div>
    </>
}