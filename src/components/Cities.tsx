import React, {Component} from 'react'
import {API_KEY, API_URL} from '../config';
import {CityWeather} from './CityWeather';

interface IProps {
}

interface CityWeatherType {
    name: string,
    temp: any,
    data: string
}

interface IState {
    searchCity: string,
    foundCity: CityWeatherType
}

export class Cities extends Component<IProps, IState> {
    private readonly searchInput: any;

    constructor(props: IProps) {
        super(props);
        this.state = {
            searchCity: '',
            foundCity: {name: '', temp: 0, data: ''}
        };
        this.searchInput = React.createRef();
        this.search = this.search.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.changeCityByBtn = this.changeCityByBtn.bind(this);
    }

    shouldComponentUpdate(nextProps: IProps, nextState: IState) {
        const {searchCity, foundCity} = this.state;
        return searchCity !== nextState.searchCity || foundCity !== nextState.foundCity;
    }

    componentDidMount() {
        this.setState({
            searchCity: '',
            foundCity: {name: '', temp: 0, data: ''}
        });
        this.searchInput.current.focus();
    }

    async componentDidUpdate(prevProps: IProps, prevState: IState) {
        const {searchCity} = this.state;
        if (searchCity !== prevState.searchCity && searchCity.length > 3) {
            const result = await this.search(searchCity);
            const {name, main} = result;
            if (name && main && name.length > 0 && main.temp > 0) {
                let temp = (main.temp - 273.15).toFixed(2);
                this.setState({foundCity: {name, temp, data: JSON.stringify(result)}});
            } else {
                this.setState({foundCity: {name: '', temp: 0, data: ''}});
            }
        }
    }

    /**
     * Запрос на API на поиск города
     * @param searchTerm
     */
    async search(searchTerm: string) {
        const url = `${API_URL}?q=${searchTerm}&APPID=${API_KEY}`;
        const response = await fetch(url);
        return await response.json();
    }

    /**
     * Поиск города по изменению поля ввода
     * @param event
     */
    async changeCity(event: React.FormEvent<HTMLInputElement>) {
        const {foundCity} = this.state;
        const searchCity = event.currentTarget.value;
        this.setState({searchCity, foundCity});
    }

    /**
     * Поиск города по клику на кнопку
     */
    async changeCityByBtn() {
        const {foundCity} = this.state;
        const searchCity = this.searchInput.current.value;
        this.setState({searchCity, foundCity});
    }

    render() {
        const {searchCity, foundCity} = this.state;
        let found = (foundCity.name) ?
            <CityWeather mode='card' city={foundCity.name} temp={foundCity.temp} data={foundCity.data}/> : '';
        return (<>
            <div className="d-flex align-items-baseline">
                <label>Search&nbsp;city:</label>
                <input ref={this.searchInput}
                       type="text"
                       className="form-control mx-2"
                       value={searchCity}
                       onChange={this.changeCity}/>
                <button type="button" className="btn btn-primary" onClick={this.changeCityByBtn}>
                    FIND
                </button>
            </div>
            {found}
        </>);
    }
}