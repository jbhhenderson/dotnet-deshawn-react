import { useEffect, useState } from "react"
import { getCity, getWalker } from "../apiManager"

export const Dog = ({id, name, walkerId, cityId}) => 
{
    const [city, setCity] = useState({})
    const [walker, setWalker] = useState({})

    useEffect(() => {
        getCity(cityId)
        .then((data) => {
            setCity(data)
        })
        getWalker(walkerId)
        .then((data) => {
            setWalker(data)
        })
    }, []);

    return <section className="dog" key={`dog--${id}`}>
        <div>
            <p>Dog: {name}</p>
            <p>Walker: {walker.name}</p>
            <p>City Name: {city.name}</p>
        </div>
    </section>
}