import { Link } from "react-router-dom"

export const Walker = ({id, name}) => {
    return <section className="walker" key={`walker--${id}`}> 
        <div>
        Walker: <Link to={`/walker/${id}`}>{name}</Link> <button><Link to={`/walkers/${id}`}>Add Dog</Link></button>
        </div>
    </section>
}