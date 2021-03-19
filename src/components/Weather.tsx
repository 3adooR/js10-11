import React, {Component} from 'react';
import {NavLink} from "react-router-dom";
import {CityWeather} from './CityWeather';

interface IProps {
}

interface IState {
    city: string,
    temp: any,
    data: string
}

export class Weather extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        let city = localStorage.getItem('cityName');
        let temp = localStorage.getItem('cityTemp');
        let data = localStorage.getItem('cityData');
        if (!city) city = '';
        if (!temp) temp = '';
        if (!data) data = '';
        this.state = {city, temp, data};
    }

    render() {
        const {city, temp, data} = this.state;
        return (<>
            {city.length
                ? <CityWeather mode='full' city={city} temp={temp} data={data}/>
                : <div>
                    <p className="mb-3">Please set the city.</p>
                    <NavLink to="/cities" className="btn btn-primary">Find city</NavLink>
                </div>}
        </>);
    }

}