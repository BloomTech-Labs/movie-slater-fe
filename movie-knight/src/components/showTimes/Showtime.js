import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './showtime.scss'
import axio from 'axios'
import { getShowTimesRsults } from '../../actions/index.js'
import Loading from '../Loading.js'
import TheatresCard from './TheatresCard.js'
import TimesCard from './TimesCard.js'
import { act } from 'react-dom/test-utils'


let address = []
const Showtime = props => {
    const [active, setActive] = useState(false);
    let movies = props.MovieSelects.map(movie => movie.tmsId)
    useEffect(() => {
        props.getShowTimesRsults({ movies: movies, days: props.daySelects, times: props.timeSelects, seats: props.seatsSelects, tickets: props.ticketsNumber })
    }, [])
    // props.results.map(movies => {
    //     movies.showtimes.map(theatre => {
    //       const theaterAddress =   address.filter(ids => ids.theatreId == theatre.id)
    // if (theaterAddress.length > 0 )
    // })
    // })
    console.log(props.results)
    if (props.fetchingData) return <Loading />
    return (
        <div className='showtime-card'>
            {active ? <button className="next-button" id="tickets-btn" onClick={() => props.history.push("/signup")}>Get tickets</button> : null}
            <h3 className='text'>Your matches</h3>
            {props.results.map((movieslist, index) => {
                let movie = props.MovieSelects.filter(mo => mo.tmsId == movieslist.id)
                if (movie.length > 0)
                    return <div key={movieslist.id}>

                        <div className='movie-info'>
                            <img className='poster' src={movie[0].image} alt={movie[0].title} />
                            <div className='movie-text'>
                                <h2 className='title'>{movie[0].title}</h2>
                                <h4 className='runtime'>{runTime(movie[0].runTime)}</h4>
                                <h4 className='rated'>Rated {movie[0].ratings[0].code}</h4>
                            </div>
                        </div>
                        {movieslist.showtimes.map((show, ind) => {
                            return <div key={show.id + movieslist.id}>
                                {ind == 1 ? <p className="options">Other Options</p> : null}
                                <TheatresCard show={show} ind={ind} key={ind + 1000} />
                                <div className={ind > 0 ? "black-bg whiteBo theatre-showtime" : 'theatre-showtime'}>
                                    <h5 className='sub-text'>Standard format</h5>
                                    {show.showtime.length == 0 ? <p>no matches</p> : <>
                                        {show.showtime[0].times.length == 0 ? null :
                                            <>  {show.showtime.map((times, i) => {
                                                if (times.times.length == 0) return
                                                return <div className="day-time" key={times.date[0] + show.id + movieslist.id}>
                                                    <div className="day-div">
                                                        <h4 className={ind > 0 ? 'white-text days-text' : 'days-text'}>{`${times.date[1]} ${times.date[0].split("-")[1]}/${times.date[0].split("-")[2]}`}</h4></div>
                                                    <div className="times-div">
                                                        {times.times.map((time, num) => <TimesCard key={i + ind + show.id + movieslist.id + time} num={num} time={time} setActive={setActive} active={active} />)}
                                                    </div>
                                                </div>
                                            })}
                                            </>
                                        }
                                    </>
                                    }
                                </div>
                                {index === 0 ? ind == 0 ? <p className="back-home"><span>Want to see different movie?</span></p> : null : null}
                            </div>

                        })
                        }

                    </div>
            }
            )}

        </div>
    )
}


function getaddress(id) {
    return (axio.get(`http://data.tmsapi.com/v1.1/theatres/${id}?api_key=4df23285pa5abfjm6yapd2nh`))
        .then(data => data.data)
}




function runTime(str) {
    let num = str.replace(/\D+/g, "")
    let hours = num.substring(1, 2)
    let min = num.substring(2, 4)
    return `${hours}h ${min}m`
}






const mapStateToProps = state => {
    return {
        fetchingData: state.fetchingData,
        MovieSelects: state.MovieSelects,
        daySelects: state.daySelects,
        ticketsNumber: state.ticketsNumber,
        seatsSelects: state.seatsSelects,
        timeSelects: state.timeSelects,
        results: state.results
    };
};


export default connect(mapStateToProps, { getShowTimesRsults })(Showtime);