import request from '../utils/request';

export const login = param => {
    return request({
        url: '/login',
        method: 'post',
        data: param
    });
};
