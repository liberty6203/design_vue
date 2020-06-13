import request from '../utils/request';

export const add = param => {
    return request({
        url: '/Treatise/add',
        method: 'post',
        params: param
    });
};