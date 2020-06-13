import request from '../utils/request';

export const getTreatiseScore = param => {
    return request({
        url: '/Score/personalTreatiseScore',
        method: 'get',
        params: param
    });
};

export const getProjectScore = param => {
    return request({
        url: '/Score/personalProjectScore',
        method: 'get',
        params: param
    });
};


export const getBookScore = param => {
    return request({
        url: '/Score/personalBookScore',
        method: 'get',
        params: param
    });
};