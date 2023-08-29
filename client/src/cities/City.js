export const City = ({id, name}) => 
{
    return <section className="city" key={`city--${id}`}>
        <div>
            <p>City: {name}</p>
        </div>
    </section>
}