var formatter = {
	timeFormat(timeStamp){
		if(timeStamp > 0){
			var date = new Date();  
			date.setTime(timeStamp );  
			var y = date.getFullYear();      
			var m = date.getMonth() + 1;      
			m = m < 10 ? ('0' + m) : m;      
			var d = date.getDate();      
			d = d < 10 ? ('0' + d) : d;      
			var h = date.getHours();    
			h = h < 10 ? ('0' + h) : h;    
			var minute = date.getMinutes();    
			var second = date.getSeconds();    
			minute = minute < 10 ? ('0' + minute) : minute;      
			second = second < 10 ? ('0' + second) : second;     
			return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;       
		}else{
			return "";
		}
	},
	auditStatusFormat(auditCode){
		var auditStatus = "";
		switch(auditCode){
			case 0:auditStatus="需要第一次审核";break;
			case 1:auditStatus="需要第二次审核";break;
			case 2:auditStatus="审核通过";break;
			default:auditStatus="状态错误";break;
		}
		return auditStatus;
	},
	auditOpinionFormat(opinionCode){
		var auditOpinion = "";
		switch(opinionCode){
			case 0:auditOpinion="审核通过";break;
			case 1:auditOpinion="审核未通过";break;
			default:auditOpinion="状态错误";break;
		}
		return auditOpinion;
	}
	,roleFormat(roleCode){
		var role = "";
		switch(roleCode){
			case 0:role="普通用户";break;
			case 1:role="院系管理员";break;
			case 2:role="系统管理员";break;
			default:role="";break;
		}
		return role;
	}
	,treatiseLevelFromat(levalCode){
		var res = "";
		switch(levalCode){
			case '1':res="EI";break;
			case '2':res="SCI";break;
			case '3':res="中文核心刊";break;
			case '5':res="普通期刊";break;
			case '4':res="其他";break;
			default:res="其他";break;
		}
		return res;
	},
	treatiseTypeFormat(typeCode){
		var res = "";
		switch(typeCode){
			case '1':res="期刊";break;
			case '2':res="会议";break;
			case '3':res="其他";break;
			case '0':res="学位";break;
			default:res="其他";break;
		}
		return res;
	},
	projectLevelFromat(levalCode){
		var res = "";
		switch(levalCode){
			case '1':res="国家级";break;
			case '2':res="省市级";break;
			case '3':res="校级";break;
			case '4':res="其他";break;
			default:res="其他";break;
		}
		return res;
	},
}
export default formatter;