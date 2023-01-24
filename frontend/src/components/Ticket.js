import { useState, useEffect } from "react";
import axios from "axios";

function Ticket(props) {
    const [getTicket, setGetTicket] = useState([]);

    useEffect(() => {
        async function fetchTicket() {
            const URL = 'http://127.0.0.1:5000/';
            try {
                const res = await axios.get(URL);
                // console.log(res.data['answers']);
                setGetTicket(res.data['answers']);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTicket();
    }, []);

    const handleClick = event => {
        // console.log(event.currentTarget.textContent);
        if(event.currentTarget.textContent){
            event.currentTarget.classList.add('striked');
        }
    }

    if (!getTicket.length) return <h3>Loading...</h3>;

    return (
        <div>
            <div className='board'>
                <div className='tambola-ticket'>
                    {getTicket.map((ticket, number) => (
                        <div className={'tambola-ticket-cell '} onClick={handleClick}>
                            <h5>{ticket}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ticket;