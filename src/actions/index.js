export const heroesFetch = (request) => (dispatch) => {
    request("http://localhost:3001/heroes")
    .then(data => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()))
}

export const filtersFetch = (request) => (dispatch) => {
    request("http://localhost:3001/filters")
    .then(data => dispatch(filtersFetched(data)))
    .catch(() => dispatch(filtersFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (hero) => {
    return {
        type: 'HEROES_DELETE',
        payload: hero
    }
}

export const heroesDeleteError = () => {
    return {
        type: 'HEROES_DELETING_ERROR'
    }
}

export const heroesAdd = (hero) => {
    return {
        type: 'HEROES_ADD',
        payload: hero
    }
}

export const heroesAddError = () => {
    return {
        type: 'HEROES_ADD_ERROR'
    }
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const changeActiveFilter = (filterActive) => {
    return {
        type: 'CHANGE_ACTIVE_FILTER',
        payload: filterActive
    }
}