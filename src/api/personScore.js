import request from '../utils/request';

export const getPersonScore = param => {
    return request({
        url: '/Score/personScore',
        method: 'get',
        params: param
    });
};


export const getPersonScoreByPid = param => {
    return request({
        url: '/Score/personScoreByPid',
        method: 'get',
        params: param
    });
};