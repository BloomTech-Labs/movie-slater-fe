import React, { useState } from 'react';
import './tickets.scss'
import { ticketsNum } from '../actions/index';
import { connect } from 'react-redux'

const Ticket = props =>{

    const [ticket, setTicket] = useState(1)

    function seatPage() {
        props.ticketsNum(ticket)
        props.history.push("/seats");
      }


    return (
        <div className='ticket'>
            <h2 className='title'>How many tickets do you need?</h2>

                {
                    ticket <= 0 ?
                    <div className='ticket-select'>
                        <h3 className='ticket-num no-sub'>{ticket}</h3>
                        <button className='math' onClick={() => setTicket(ticket + 1)} >+</button>
                    </div>
                    :
                    <div className='ticket-select'>
                        <button className='math' onClick={() => setTicket(ticket - 1)}>-</button>
                        <h3 className='ticket-num'>{ticket}</h3>
                        <button className='math' onClick={() => setTicket(ticket + 1)} >+</button>
                    </div>   
                }

            <h3 className='sub-title'>Would you like the seats to be next to each other?</h3>

            <div className='yes-no-option'>
                <button className='no button'>No</button>
                <button className='yes button'>Yes</button>
            </div>
            {
                ticket <= 0 ?
                null
                :
                 <button className='next button' onClick={seatPage}>Next</button>
            }

        </div>
    )
}

const mapStateToProps = state => {
    return {
        MovieSelects: state.MovieSelects,
        daySelect: state.daySelect
    };
};

export default connect(mapStateToProps, { ticketsNum })(Ticket);