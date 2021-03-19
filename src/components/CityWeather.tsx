import React, {Component} from 'react';
import {API_ICON_URL} from '../config';

interface IProps {
    mode: string
    city: string,
    temp: number,
    data: string
}

interface IState {
    setCity: boolean
}

export class CityWeather extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {setCity: false};
        this.setCity = this.setCity.bind(this);
        this.dataTable = this.dataTable.bind(this);
        this.weatherImage = this.weatherImage.bind(this);
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        const {setCity} = this.state;
        return setCity !== nextState.setCity;
    }

    componentDidUpdate(prevProps: IProps, prevState: IState) {
        const {setCity} = this.state;
        if (setCity !== prevState.setCity) {
            this.setState({setCity});
        }
    }

    /**
     * Set city to LocalStorage
     */
    async setCity() {
        localStorage.setItem('cityName', this.props.city);
        localStorage.setItem('cityTemp', this.props.temp.toString());
        localStorage.setItem('cityData', this.props.data);
        this.setState({setCity: true});
    }

    /**
     * Show data in table
     * @param name
     * @param titles
     * @param values
     * @param colClass
     */
    dataTable(name: string, titles: Array<string>, values: Array<string>, colClass: string = 'col') {
        return <>
            {name.length ? <h4>{name}</h4> : ''}
            <table className="table table-hover">
                <thead className="thead-dark">
                <tr>{titles.map((item: any) => <th scope={colClass}>{item}</th>)}</tr>
                </thead>
                <tbody>
                <tr>{values.map((item: any) => <td>{item}</td>)}</tr>
                </tbody>
            </table>
        </>
    }

    /**
     * Weather image
     * @param icon
     * @param desc
     */
    weatherImage(icon: string, desc: string){
        return <img src={API_ICON_URL+icon+'@2x.png'} alt={desc} />
    }

    render() {
        const {setCity} = this.state;
        const localCity = localStorage.getItem('cityName');
        let setButton: JSX.Element = <></>;
        let data: JSX.Element = <></>;

        if (this.props.mode == 'card') {
            if (!setCity && localCity != this.props.city) {
                setButton = <button type="button" className="btn btn-primary" onClick={this.setCity}>SET</button>;
            } else {
                setButton = <button type="button" className="btn btn-sm btn-secondary" disabled>CURRENT</button>;
            }
            data = <h4>{this.props.temp} &deg;</h4>;

        } else {
            if (this.props.data) {
                const jsonData = JSON.parse(this.props.data);
                data = <>
                    <div className="row align-items-baseline">
                        <div className="col-4">
                            <h3>{this.props.temp} &deg;</h3>
                        </div>
                        <div className="col-4 text-center">
                            {this.weatherImage(jsonData.weather[0].icon, jsonData.weather[0].description)}
                        </div>
                        <div className="col-4 text-right">
                            <h3>{jsonData.weather[0].description}</h3>
                        </div>
                    </div>
                    {this.dataTable(
                        '',
                        ['temp (C)', 'temp (K)', 'feels_like', 'pressure', 'humidity'],
                        [this.props.temp, jsonData.main.temp, jsonData.main.feels_like, jsonData.main.pressure, jsonData.main.humidity],
                    )}
                    {this.dataTable(
                        'Wind',
                        ['speed', 'deg'],
                        [jsonData.wind.speed, jsonData.wind.deg],
                        'col-6'
                    )}
                    {this.dataTable(
                        'Coordinates',
                        ['lon', 'lat'],
                        [jsonData.coord.lon, jsonData.coord.lat],
                        'col-6'
                    )}
                </>;
            }
        }

        return (<div className="card my-3">
            <div className="card-header">
                <div className="d-flex justify-content-between">
                    <h3>{this.props.city}</h3>
                    {setButton}
                </div>
            </div>
            <div className="card-body">
                {data}
            </div>
        </div>);
    }
}