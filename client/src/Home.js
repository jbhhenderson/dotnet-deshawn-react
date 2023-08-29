import { getDogs, getGreeting } from "./apiManager";
import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import { Dog } from "./dogs/Dog";

export default function Home() {
  const [greeting, setGreeting] = useState({
    message: "Not Connected to the API",
  });
  const [dogs, setDogs] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    getGreeting()
      .then(setGreeting)
      .catch(() => {
        console.log("API not connected");
      });
    getDogs().then(
      (dogArray) => {
          setDogs(dogArray)
      }
    )
  }, []);

  const handleAddButton = (evt) => {
    evt.preventDefault()
    navigate("/addDog")
  }

  return <>
    <p>{greeting.message}</p>
    <button onClick={handleAddButton}>Add Dog</button>
    <section className="dogs">
        {
            dogs.map(dog => <Dog key={`dog--${dog.id}`}
                id = {dog.id}
                name = {dog.name}
                walkerId = {dog.walkerId}
                cityId = {dog.cityId}
                 />)
        }
    </section>
  </>
}
