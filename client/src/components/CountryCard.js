import React from 'react'

const CountryCard = ({city, continent, weather}) => {

    return (
        <div className="col-4">
           <h3>{city}</h3>
           <p>{continent}</p>
           <p>{weather}</p>
           <div className={weather}></div>
       </div>
       
    )

}

export default CountryCard
