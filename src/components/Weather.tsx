import React, {Component} from 'react';
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
        if (!city) city = 'No city';
        if (!temp) temp = '0';
        if (!data) data = 'no data';
        this.state = {city, temp, data};
    }

    render() {
        const {city, temp, data} = this.state;
        return (<CityWeather mode='full' city={city} temp={temp} data={data}/>);
    }
}