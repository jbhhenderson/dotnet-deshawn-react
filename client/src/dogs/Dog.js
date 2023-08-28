import { useEffect, useState } from "react"
import { getCity } from "../apiManager"

export const Dog = ({id, name, walkerId, cityId}) => 
{
    const [city, setCity] = useState({})

    useEffect(() => {
        getCity(cityId)
        .then((data) => {
            setCity(data)
        })
    }, []);

    return <section className="dog" key={`dog--${id}`}>
        <div>
            <p>Name: {name}</p>
            <p>WalkerId: {walkerId}</p>
            <p>City Name: {city.name}</p>
        </div>
    </section>
}