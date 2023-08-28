export const City = ({id, name}) => 
{
    return <section className="city" key={`city--${id}`}>
        <div>
            <p>Name: {name}</p>
        </div>
    </section>
}