import request from '../utils/request';

export const getExcel = () => {
    return request({
        url: '/Data/TreatiseExcelDownload',
        method: 'get',
		responseType:'blob'
    });
};

export const postExcel = () => {
    return request({
        url: '/Data/TreatiseExcelDownload',
        method: 'get',
    });
};
