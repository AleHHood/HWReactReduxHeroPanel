import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

import { heroesFetch } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroesSelector = createSelector(
        (state) => state.filters.filterActive,
        (state) => state.heroes.heroes,
        (filter, heroes) => {
            if(filter === "all"){
                return heroes
            }else {
                return heroes.filter(hero => hero.element === filter)
            }
        }
    )



    const heroes = useSelector(filteredHeroesSelector)
    const {heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(heroesFetch(request));
    }, []);

    
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {

        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return(
                <HeroesListItem key={id} {...props} id={id}/>
            )
                      
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;