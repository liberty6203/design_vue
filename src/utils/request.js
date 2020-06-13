import axios from 'axios';
import Qs from 'qs'
import router from '../router/index.js'
import { Message } from 'element-ui'

const service = axios.create({
    // baseURL: 'http://localhost:3000/mock/11',
    // baseURL: 'http://49.233.81.70:8080/design',
    baseURL: 'http://localhost:8888/',
    // baseURL: 'http://49.233.81.70:8888/',
    timeout: 5000,
	headers:{
		'Content-Type':'application/x-www-form-urlencoded'
	},
	transformRequest:[function(data){
		return Qs.stringify(data)
	}],
	withCredentials:true
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
			
			switch(response.data.status){
				case 200: return response.data;
				case 401: Message.error("请先登录"); router.replace({path:'/login'});return;
				case 403: router.replace({path:'/403'});return;
			}
			
			
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
