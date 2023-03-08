
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useDispatch, useSelector } from 'react-redux';
import {useHttp} from '../../hooks/http.hook';
import { filtersFetch, changeActiveFilter } from '../../actions';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Spinner from '../spinner/Spinner';

const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, filterActive} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();
    const classNamesFilters = 
        {
            "all": "btn-outline-dark",
            "fire": "btn-danger",
            "water": "btn-primary",
            "wind": "btn-success",
            "earth": "btn-secondary",
        }

    useEffect(() => {
        dispatch(filtersFetch(request));
        // eslint-disable-next-line
    }, []);

/*     useEffect(() => {
        dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

        // eslint-disable-next-line
    }, []); */

    if (filtersLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const getBtnFilters = () => {
        if(filters.length === 0){
            return <h5>Фильтры отсуствуют</h5>
        }

        const getClass = (className) => {
            return (
                `btn ${classNamesFilters[className]} 
                ${className === filterActive ? ' active' : ''}`
            )
        }
        
        return (filters.map(filter => {
            return(
                <button 
                className={`btn ${getClass(filter.eng)}`}
                key={uuidv4()}
                onClick={() => dispatch(changeActiveFilter(filter.eng))}
                >
                    {filter.rus}
                </button>
            )
        })
        )
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {getBtnFilters()}
                </div>
            </div>
        </div>
    )
}


export default HeroesFilters;