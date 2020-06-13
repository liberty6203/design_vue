import request from '../utils/request';

export const getPersonList = param => {
    return request({
        url: '/getPersonList',
        method: 'get',
        params: param
    });
};

export const removePerson = param => {
    return request({
        url: '/removePerson',
        method: 'post',
        params: param
    });
};


export const updatePerson = param => {
    return request({
        url: '/updatePerson',
        method: 'post',
        params: param
    });
};

export const addPerson = param => {
    return request({
        url: '/addPerson',
        method: 'post',
        params: param
    });
};