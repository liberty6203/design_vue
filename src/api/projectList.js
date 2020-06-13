import request from '../utils/request';

export const getList = param => {
    return request({
        url: '/Project/list',
        method: 'get',
        params: param
    });
};

export const detail = param => {
    return request({
        url: '/ProjectAudit/detail',
        method: 'get',
        params: param
    });
};

export const update = param => {
    return request({
        url: '/Project/update',
        method: 'post',
        data:param
    });
};

export const remove = param => {
    return request({
        url: '/Project/remove',
        method: 'post',
        data:param
    });
};