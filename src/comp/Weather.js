import React, { useState, useEffect, useRef } from 'react'

const Weather = () => {
    let [weatherupdate, setWeatherupdate] = useState([]);
    const cityRef = useRef(null);

    useEffect(()=>{
        cityRef.current.focus();
    })

    function getForcast() {
        let city = cityRef.current.value;
        if(!city) {alert('Please enter city name'); return}    //return if city name not entered


        fetch("http://api.openweathermap.org/geo/1.0/direct?q="+city+"&appid=b877f6fcea0db04dc842dd950162d493") // Fetch coordinates of City
        .then((getCity) => {
            getCity.json().then((cityRes) => {
                if(city.length===0){alert("Please enter a valid city name"); return;}     //return if city name not valid

                let lat = cityRes[0].lat;
                let lon = cityRes[0].lon;
                
                // Fetch weather
                fetch("https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=b877f6fcea0db04dc842dd950162d493") 
                .then((result) => {
                    result.json().then((res) => {
                        let report = JSON.parse(JSON.stringify(res));
                        setWeatherupdate(city+' Weather : ' + report.weather[0].description + ' with Temp ' + report.main.temp);
                    })
                })
            })
        })
    }

    return (
        <>
           <div className="m-5 form-inline">
                <input className='form-control m-5 col-sm' type="text" placeholder="City" ref={cityRef} />
                <button className='form-control btn btn-primary' onClick={getForcast}>See Weather</button>
            </div>
            <div>
                {weatherupdate}
            </div>
        </>
    )
}

export default Weather
