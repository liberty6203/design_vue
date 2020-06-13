import request from '../utils/request';

export const add = param => {
    return request({
        url: '/Project/add',
        method: 'post',
        params: param
    });
};