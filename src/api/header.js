import request from '../utils/request';

export const logout = () => {
    return request({
        url: '/logout',
        method: 'get',
    });
};