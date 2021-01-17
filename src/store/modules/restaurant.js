export default {
    namespaced: true,
    actions: {
        search({ dispatch }, url) {
                return dispatch(
                    'http/get',
                    { url: url, error: 'message.unauthorized' },
                    { root: true })
        },
        favorite({ dispatch }, restaurantId) {
            const url = '/restaurant_favorite/';
            const data = { id: restaurantId }
            return dispatch(
                'http/post',
                { url: url, data, error: 'message.unauthorized' },
                { root: true })
        },
        unfavorite({ dispatch }, restaurantId) {
            const url = '/restaurant_favorite/';
            const data = { id: restaurantId }
            return dispatch(
                'http/delete',
                { url: url, data, error: 'message.unauthorized' },
                { root: true })
        },
        favorites({ dispatch }) {
            const url = '/favorite_restaurants/';
            return dispatch(
                'http/get',
                { url: url, error: 'message.unauthorized' },
                { root: true })
        }
    }
}