import request from '../utils/request';

export const modifyPassword = param => {
    return request({
        url: '/modifyPassword',
        method: 'post',
        data: param
    });
};