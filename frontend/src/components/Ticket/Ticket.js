import { useState, useEffect } from "react";
import axios from "axios";
import './Ticket.css';

function Ticket(props) {
    const [getTicket, setGetTicket] = useState([]);             //get values for ticket 
    const user_id = JSON.parse(localStorage.getItem('user')).id;//get user id

    //get values inside ticket once render to route
    useEffect(() => {
        async function fetchTicket() {
            //get array of answers from db
            const URL = 'https://tambola-backend.vercel.app/ticket';
            try {
                const res = await axios.post(URL, {
                    data: { id: user_id }
                });
                // store answers in getTicket state
                setGetTicket(res.data['answers']);
            } catch (error) {
                console.log(error);
            }
        }
        //function calling
        fetchTicket();
    }, []);

    //change the background of block of ticket when clicked
    const handleClick = event => {
        if (event.currentTarget.textContent) {
            event.currentTarget.classList.add('striked');
        }
    }

    //response if ticket is not generated
    if (getTicket === undefined) return <h3>Ticket not generated...</h3>

    //response until ticket is fetched
    if (!getTicket.length) return <h3>Loading...</h3>;

    return (
        <div>
            <div className='board'>
                <div className='tambola-ticket'>
                    {/* display array of answers inside getTicket state */}
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