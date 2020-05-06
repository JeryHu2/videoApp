/*
此文件为页面捕获键值
用法:initWindow(window);
//今朝花落悲颜色 wangsheng
*/

function initWindow(f) {
	
	//定义一个空的eventHandler函数，
	//解决页面没有定义eventHandler而出现的eventHandler找不到的情况
	if(typeof(f.eventHandler) == "undefined"){
		f.eventHandler = function(){};
	}
	
	//茁壮、其它中间键值拦截
    //f.document.onkeypress = function () {return (f.eventHandler(Event.mapping(f.event)));};
   // f.document.onirkeypress = function () {return (f.eventHandler(Event.mapping(f.event)));};
  	//f.document.onsystemevent = function () {return (f.eventHandler(Event.mapping(f.event)));};



	//同洲中间件、网页测试键值拦截
	f.document.onkeydown = function (e) {return (f.eventHandler(Event.mapping(e)));};
}


/**
 * 按键键值和系统消息值的映射
 */
var Event = {
	mapping: function(event){

		var keycode=event.which || event.keyCode;
		var args = {};
		var code = "";
	//	alert(keycode);
		if(keycode < 58 && keycode > 47){//数字键
			args = {value: (keycode - 48)};
			code = "KEY_NUM";
		} else {
			switch(keycode){//__event.keyCode

				case 13://enter
				case 65293:
					code = "KEY_SELECT";
					break;
				case 38:
				case 28:
				case 1:
				case 65362:
					code = "KEY_UP";
					break;	
				case 40:
				case 29:
				case 2:
				case 65364:
					code = "KEY_DOWN";
					break;
				case 37:
				case 30:
				case 3:
				case 65361:
					code = "KEY_LEFT";
					break;	
				case 39:
				case 31:
				case 4:
				case 65363:
					code = "KEY_RIGHT";
					break;
				case 121:
				case 594:
				case 375:
				case 34:
				case 25:
					code = "KET_NEXT";	
					break;
				case 120:
				case 7:
				case 593:
				case 374:
				case 33:
				case 26:
					code = "KET_PRE";
					break;
				case 340:
				case 65367:
				case 399:
				case 8:
					event.preventDefault();
					code = "KET_BACK";
					break;
				case 339:
				case 514:
				case 283:
				case 27:
					code = "KEY_QUIT";
					break;
			}
		}
		return {code: code, args: args};	
	}
};
