import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getDog, getWalker } from "../apiManager"

export const DogDetails = () => {
    const {dogId} = useParams()

    const [dog, setDog] = useState({})
    const [walker, setWalker] = useState({})

    useEffect(() => {
        getDog(dogId)
        .then((data) => {
            setDog(data)
        })
    }, [])

    useEffect(() => {
        if (dog.walkerId != null) {
            getWalker(dog.walkerId)
            .then((data) => {
                setWalker(data)
            })
        }
    }, [dog])

    return <section className="dog" key={`dog--${dog.id}`}>
    <div>
        <p>Dog: {dog.name}</p>
        <p>Walker: {walker.name}</p>
    </div>
</section>
}