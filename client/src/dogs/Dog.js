export const Dog = ({id, name, walkerId, cityId}) => 
{
    return <section className="dog" key={`dog--${id}`}>
        <div>
            <p>Name: {name}</p>
            <p>WalkerId: {walkerId}</p>
            <p>CityId: {cityId}</p>
        </div>
    </section>
}