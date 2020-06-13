import request from '../utils/request';

export const getTreatiseScore = param => {
    return request({
        url: '/Score/totalTreatiseScore',
        method: 'get',
        params: param
    });
};

export const getProjectScore = param => {
    return request({
        url: '/Score/totalProjectScore',
        method: 'get',
        params: param
    });
};


export const getBookScore = param => {
    return request({
        url: '/Score/totalBookScore',
        method: 'get',
        params: param
    });
};