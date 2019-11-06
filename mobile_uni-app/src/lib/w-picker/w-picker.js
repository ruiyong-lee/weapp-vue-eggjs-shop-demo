const forMatNum=(num)=>{
	return num<10?'0'+num:num+'';
}
const initPicker={
	initDays:(year,month)=>{
		let totalDays=new Date(year,month,0).getDate();
		let dates=[];
		for(let d=1;d<=totalDays;d++){
			dates.push(forMatNum(d));
		};
		return dates;
	},
	//日期初始化
	date:(start,end,mode="date",step,value,flag)=>{
		let aToday=new Date();
		let tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal=[];
		let initstartDate=new Date(start);
		let endDate=new Date(end);
		if(start>end){
			initstartDate=new Date(end);
			endDate=new Date(start);
		};
		let startYear=initstartDate.getFullYear();
		let startMonth=initstartDate.getMonth()+1;
		let endYear=endDate.getFullYear();
		let years=[],months=[],days=[],hours=[],minutes=[],seconds=[],returnArr=[];
		let curMonth=flag?value[1]*1:(value[1]+1);
		let totalDays=new Date(startYear,curMonth,0).getDate();
		for(let s=startYear;s<=endYear;s++){
			years.push(s+'');
		};
		for(let m=1;m<=12;m++){
			months.push(forMatNum(m));
		};
		for(let d=1;d<=totalDays;d++){
			days.push(forMatNum(d));
		}
		for(let h=0;h<24;h++){
			hours.push(forMatNum(h));
		}
		for(let m=0;m<60;m+=step*1){
			minutes.push(forMatNum(m));
		}
		for(let s=0;s<60;s++){
			seconds.push(forMatNum(s));
		}
		if(flag){
			returnArr=[
				years.indexOf(value[0]),
				months.indexOf(value[1]),
				days.indexOf(value[2]),
				hours.indexOf(value[3]),
				minutes.indexOf(value[4])==-1?0:minutes.indexOf(value[4]),
				seconds.indexOf(value[5])
			]
		};
		switch(mode){
			case "range":
				if(flag){
					defaultVal=[returnArr[0],returnArr[1],returnArr[2],0,returnArr[0],returnArr[1],returnArr[2]];
					return {years,months,days,defaultVal}
				}else{
					return {years,months,days}
				}
				break;
			case "date":
				if(flag){
					defaultVal=[returnArr[0],returnArr[1],returnArr[2]];
					return {years,months,days,defaultVal}
				}else{
					return {years,months,days}
				}
				break;
			case "yearMonth":
				if(flag){
					defaultVal=[returnArr[0],returnArr[1]];
					return {years,months,defaultVal}
				}else{
					return {years,months}
				}
				break;
			case "dateMinutes":
				if(flag){
					defaultVal=returnArr;
					return {years,months,days,hours,minutes,defaultVal}
				}else{
					return {years,months,days,hours,minutes}
				}
				break;
			case "dateTime":
				if(flag){
					defaultVal=returnArr;
					return {years,months,days,hours,minutes,seconds,defaultVal}
				}else{
					return {years,months,days,hours,minutes,seconds}
				}
				break;
			case "time":
				if(flag){
					defaultVal=[returnArr[3],returnArr[4],returnArr[5]];
					return {hours,minutes,seconds,defaultVal}
				}else{
					return {hours,minutes,seconds}
				}
				break;
		}
	},
	//短期时间初始化小时
	initLimitHours:(startHour,endHour)=>{
		let hours=[];
		for(let k=startHour*1;k<=endHour*1;k++){
			hours.push({
				label:forMatNum(k),
				value:forMatNum(k),
				flag:false
			})
		}
		return hours;
	},
	//短期时间初始化分钟
	initLimitMinutes:(minuteStep)=>{
		let minutes=[];
		for(let j=0;j<60;j+=minuteStep*1){
			minutes.push({
				label:forMatNum(j),
				value:forMatNum(j)
			})
		}
		return minutes;
	},
	//短期时间初始化
	limit:(dayStep=7,startHour=8,endHour=20,minuteStep=1,afterStep=30)=>{
		let startDate=new Date();
		let bsDate=new Date(new Date().getTime()+afterStep*60*1000);
		let date=[];
		let hours=[];
		let minutes=[];
		let hour=bsDate.getHours();
		let minute=Math.floor(bsDate.getMinutes()/minuteStep)*minuteStep;
		let weeks=["周日","周一","周二","周三","周四","周五","周六"];
		for(let i=0;i<dayStep;i++){
			let year,month,day,weekday;
			year=startDate.getFullYear();
			month=forMatNum(startDate.getMonth()+1);
			day=forMatNum(startDate.getDate());
			weekday=weeks[startDate.getDay()];
			let label="";
			switch(i){
				case 0:
					label="今天";
					break;
				case 1:
					label="明天"
					break;
				case 2:
					label="后天"
					break;
				default:
					label=month+"月"+day+"日"+" "+weekday;
					break;
			}
			date.push({
				label:label,
				value:year+"-"+month+"-"+day,
				flag:i==0?true:false
			})
			startDate.setDate(startDate.getDate()+1);
		}
		if(hour>endHour){
			hour=endHour;
		};
		for(let k=hour*1;k<=endHour*1;k++){
			hours.push({
				label:forMatNum(k),
				value:forMatNum(k),
				flag:k==hour?true:false
			})
		};
		for(let j=minute;j<60;j+=minuteStep*1){
			minutes.push({
				label:forMatNum(j),
				value:forMatNum(j)
			});
		}
		return {date,hours,minutes};
	},
	//选择区间初始化日期
	initRangeDays:(year,month)=>{
		let totalDays=new Date(year,month,0).getDate();
		let dates=[];
		for(let d=1;d<=totalDays;d++){
			dates.push(forMatNum(d));
		};
		return dates;
	},
	//选择区间初始化
	range:(start,end,value,flag)=>{
		let aToday=new Date();
		let tYear,tMonth,tDay,tHours,tMinutes,tSeconds,defaultVal=[];
		let initstartDate=new Date(start);
		let endDate=new Date(end);
		if(start>end){
			initstartDate=new Date(end);
			endDate=new Date(start);
		};
		let startYear=initstartDate.getFullYear();
		let startMonth=initstartDate.getMonth()+1;
		let endYear=endDate.getFullYear();
		let fyears=[],fmonths=[],fdays=[],tyears=[],tmonths=[],tdays=[],returnArr=[];
		let curMonth=flag?value[1]*1:(value[1]+1);
		let totalDays=new Date(startYear,curMonth,0).getDate();
		for(let s=startYear;s<=endYear;s++){
			fyears.push(s+'');
		};
		for(let m=1;m<=12;m++){
			fmonths.push(forMatNum(m));
		};
		for(let d=1;d<=totalDays;d++){
			fdays.push(forMatNum(d));
		};
		for(let s=startYear;s<=endYear;s++){
			tyears.push(s+'');
		};
		for(let m=1;m<=12;m++){
			tmonths.push(forMatNum(m));
		};
		for(let d=1;d<=totalDays;d++){
			tdays.push(forMatNum(d));
		};
		if(flag){
			defaultVal=[
				fyears.indexOf(value[0]),
				fmonths.indexOf(value[1]),
				fdays.indexOf(value[2]),
				0,
				tyears.indexOf(value[0]),
				tmonths.indexOf(value[1]),
				tdays.indexOf(value[2])
			];
			return {
				fyears,
				fmonths,
				fdays,
				tyears,
				tmonths,
				tdays,
				defaultVal
			}
		}else{
			return {
				fyears,
				fmonths,
				fdays,
				tyears,
				tmonths,
				tdays,
			}
		}
	}
}

export default initPicker
