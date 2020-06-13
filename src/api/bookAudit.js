import request from '../utils/request';

export const getList = param => {
    return request({
        url: '/BookAudit/list',
        method: 'get',
        params: param
    });
};

export const detail = param => {
    return request({
        url: '/BookAudit/detail',
        method: 'get',
        params: param
    });
};

export const audit = param => {
    return request({
        url: '/BookAudit/audit',
        method: 'post',
        data: param
    });
};

export const remove = param => {
    return request({
        url: '/Book/remove',
        method: 'post',
        data:param
    });
};