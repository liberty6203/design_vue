import request from '../utils/request';

export const add = param => {
    return request({
        url: '/Book/add',
        method: 'post',
        params: param
    });
};