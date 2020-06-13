import request from '../utils/request';

export const getList = param => {
    return request({
        url: '/Treatise/list',
        method: 'get',
        params: param
    });
};

export const detail = param => {
    return request({
        url: '/TreatiseAudit/detail',
        method: 'get',
        params: {
			tId:param.tId
		}
    });
};

export const update = param => {
    return request({
        url: '/Treatise/update',
        method: 'post',
        data:param
    });
};

export const remove = param => {
    return request({
        url: '/Treatise/remove',
        method: 'post',
        data:param
    });
};