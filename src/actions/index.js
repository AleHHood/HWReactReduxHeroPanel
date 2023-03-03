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