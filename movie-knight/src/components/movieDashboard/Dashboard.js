import React from 'react'
import MovieList from "./MovieList"

const Dashboard = props => {
    return (
        <div>
            <h1>See a movie</h1>
            
            <MovieList />
            <button>Next</button>
        </div>
    )
}

export default Dashboard;