import axios from 'axios'

export default {
    namespaced: true,
    actions: {
        // async request ({ dispatch, rootState } => dispatch, rootStateはcontextのプロパティ
        async request ({ rootState }, { method, url, data }) {
            let headers ={};
            headers['Content-Type'] = 'application/json';
            if(rootState.auth.accessToken) headers = Object.assign(headers, setTokenToHeader(rootState));
            const options = {
                method,
                url: `${process.env.VUE_APP_API_URL}${url}`,
                headers,
                data,
                timeout: 15000
            }
            return await axios(options)
                .then(res => res)
                .catch(err => {
                    console.log(err);
                    return false;
                    /*
                    dispatch(
                        'message/create',
                        { error: error, err },
                        { root: true }
                    )
                    */
                })
        },
        // http通信する際はcomponentからpost,deleteのいずれかをdispatchする
        get ({ dispatch }, requests) {
            requests.method = 'get';
            return dispatch('request', requests);
        },
        post ({ dispatch }, requests) {
            requests.method = 'post';
            return dispatch('request', requests);
        },
        delete ({ dispatch }, requests) {
            requests.method = 'delete';
            return dispatch('request', requests);
        }
    }
}

function setTokenToHeader(v_rootState) {
    let v_headers = {};
    v_headers['access-token'] = v_rootState.auth.accessToken;
    v_headers['client']       = v_rootState.auth.client;
    v_headers['expiry']       = v_rootState.auth.expiry;
    v_headers['uid']          = v_rootState.auth.uid;
    return v_headers;
}