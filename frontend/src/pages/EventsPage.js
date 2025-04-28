import { Link } from "react-router-dom";

const EVENTS=[
    {key : 'E1' ,name : 'Event 1'},
    {key : 'E2' ,name : 'Event 2'},
    {key : 'E3' ,name : 'Event 3'},
]
function EventsPage() {
    return ( 
        <>
        <h1>Events</h1>
        <ul>
            {EVENTS.map((event)=>(
                <li key={event.key}>
                    <Link to ={event.key}>{event.name}</Link>
                </li>)
            )}
        </ul>
        </>
    );
}

export default EventsPage;