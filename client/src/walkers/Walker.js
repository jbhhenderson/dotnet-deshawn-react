export const Walker = ({id, name}) => {
    return <section className="walker" key={`walker--${id}`}> 
        <div>
            <p>Walker: {name}</p>
        </div>
    </section>
}