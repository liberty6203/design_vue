import request from '../utils/request';

export const getList = param => {
    return request({
        url: '/ProjectAudit/list',
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

export const audit = param => {
    return request({
        url: '/ProjectAudit/audit',
        method: 'post',
        data: param
    });
};

export const remove = param => {
    return request({
        url: '/Project/remove',
        method: 'post',
        data:param
    });
};