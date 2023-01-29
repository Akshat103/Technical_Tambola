import { useState, useEffect } from "react";
import axios from "axios";

function Ticket(props) {
    const [getTicket, setGetTicket] = useState([]);
    const user_id = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        async function fetchTicket() {
            const URL = 'https://tambola-backend.vercel.app/ticket';
            try {
                const res = await axios.post(URL, {
                    data: { id: user_id }
                });
                setGetTicket(res.data['answers']);
            } catch (error) {
                console.log(error);
            }
        }
        fetchTicket();
    }, []);


    const handleClick = event => {
        if (event.currentTarget.textContent) {
            event.currentTarget.classList.add('striked');
        }
    }
    if (getTicket === undefined) return <h3>Ticket not generated...</h3>
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