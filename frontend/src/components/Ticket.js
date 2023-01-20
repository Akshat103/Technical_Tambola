import React, { useEffect, useState } from 'react';
import { shuffle } from 'lodash';

const Ticket = () => {
    const [ticket, setTicket] = useState('');

    useEffect(() => {
        getTicket();
    }, []);

    const getTicket = async () => {
        let result = await fetch('http://127.0.0.1:5000/');
        result = await result.json();
        setTicket(result);
        if (result) {
            localStorage.setItem('ticket', JSON.stringify(result));
            // console.log(result);
        }
    }
    if (ticket) {
        const user_ticket = localStorage.getItem('ticket');
        // console.log(user_ticket);
        var answers = shuffle(JSON.parse(user_ticket).answers);
        // console.log(JSON.parse(user_ticket).answers);
        if (answers) {
            var row1 = [answers[0], answers[1], answers[2], answers[3], answers[4]];
            var row2 = [answers[5], answers[6], answers[7], answers[8], answers[9]];
            var row3 = [answers[10], answers[11], answers[12], answers[13], answers[14]];
            console.log(row1);
        }
    }
    // console.log(row1);
    const [row_1, setRow1] = useState(shuffle((new Array(4)).fill(null).concat(row1)));
    const [row_2, setRow2] = useState(shuffle((new Array(4)).fill(null).concat(row2)));
    const [row_3, setRow3] = useState(shuffle((new Array(4)).fill(null).concat(row3)));
    console.log(row_1);

    const handleClick = event => {
        event.currentTarget.classList.add('striked');
    }

    return (
        <div>
            <div className='board'>
                <div className='tambola-ticket'>
                    {row_1.map((row_1, number) => (
                        <div className={'tambola-ticket-cell '} onClick={handleClick}>
                            <h4>{row_1}</h4>
                        </div>
                    ))}
                    {row_2.map((row_2, number) => (
                        <div className='tambola-ticket-cell' onClick={handleClick}>
                            <h4>{row_2}</h4>
                        </div>
                    ))}
                    {row_3.map((row_3, number) => (
                        <div className='tambola-ticket-cell' onClick={handleClick}>
                            <h4>{row_3}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Ticket;