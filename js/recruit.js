function $(selector, element) {
	element = element || document;
	return element.querySelector(selector) || {};
}
function $$(selector, element) {
	element = element || document;
	return element.querySelectorAll(selector) || [];
}
$.post = function(url, argulist, success, fail) {
	var obj=new XMLHttpRequest();
	obj.open('POST', url);
	obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	obj.onreadystatechange=function() {
		if(obj.readyState == 4) {
			if(obj.status == 200 || obj.status == 304) {
				if (success)
					success(obj.responseText);
			}
			else {
				if (fail)
					fail(obj.responseText);
			}
		}
	}
	var s = new String;
	for (var x in argulist)
		s += x+"="+argulist[x].toString().replace("&", "%26")+"&";
	if(s.length == 0)
		obj.send("");
	else
		obj.send(s.substr(0, s.length-1));
}
document.querySelectorAll("select").forEach(function(e) {
	e.addEventListener('change', function() {
		if (e.value)
			e.style.color = "#737373";
		else
			e.style.color = "#969696";
	});
});
var pattern = {
	name : {
		selector : "input[name=name]",
		require : true,
		msg : "阁下大名是( ˘•ω•˘ )"
	},
	gender : {
		selector : "input[name=gender]:checked",
		frame : ".sex",
		require : true,
		msg : "性别不详？( ˘•ω•˘ )"
	},
	grade : {
		selector : "input[name=grade]:checked",
		frame : ".grade",
		require : true,
		msg : "年级( ˘•ω•˘ )"
	},
	college : {
		selector : "select[name=college]",
		require : true,
		msg : "学院学院( ˘•ω•˘ )"
	},
	dorm : {
		selector : "input[name=dorm]",
		reg : /^ *(C|c)([1-9]|1[0-9]) *(东|西)? *-? *[1-9][0-9]{2} *$/,
		msg : "格式不对哦( ˘•ω•˘ )"
	},
	tel : {
		selector : "input[name=tel]",
		reg : /^1[0-9]{10}$/,
		msg : "十一位手机号呢( ˘•ω•˘ )"
	},
	department1 : {
		selector : "select[name=department1]",
		require : true,
		msg : "请选择第一意向( ˘•ω•˘ )"
	},
	department2 : {
		selector : "select[name=department2]",
	},
	adjust : {
		selector : "input[name=adjust]:checked",
		frame : ".tiaoji",
		require : true,
		msg : "调剂吗？( ˘•ω•˘ )"
	},
	intro : {
		selector : "textarea[name=intro]",
	}
}
Object.keys(pattern).forEach(function(key) {
	var target = $(pattern[key].selector);
	var frame = pattern[key].frame ? $(pattern[key].frame) : target.parentNode;
	var clear = function() {
		$("span", frame).className = "";
		var p = $(".error-tip", frame);
		if (p.attributes)
			frame.removeChild(p);
	}
	frame.addEventListener('click', clear);
	frame.addEventListener('input', clear);
});
$("form").addEventListener('submit', function(e) {
	var send = {};
	var valid = true;
	Object.keys(pattern).forEach(function(key) {
		var target = $(pattern[key].selector);
		var frame = pattern[key].frame ? $(pattern[key].frame) : target.parentNode;
		$("span", frame).className = "";
		var p = $(".error-tip", frame);
		if (p.attributes)
			frame.removeChild(p);
	});
	Object.keys(pattern).forEach(function(key) {
		var target = $(pattern[key].selector);
		if ((pattern[key].require && !target.value) ||
				pattern[key].reg && !pattern[key].reg.test(target.value)) {
			var p = document.createElement("p");
			p.className = "error-tip";
			p.innerHTML = pattern[key].msg;
			var frame = pattern[key].frame ? $(pattern[key].frame) : target.parentNode;
			frame.appendChild(p);
			$("span", frame).className = "error-title";
			if (valid) {
				$("[name]", frame).focus();
				valid = false;
			}
		}
		send[key] = target.value;
	});
	if (valid) {
		var bn = $("button");
		bn.disabled = true;
		bn.innerText = "提交中...";
		$.post("./api/register.php", send, function(data) {
			var obj = JSON.parse(data);
			if (obj.code)
				alert(obj.errMsg);
			else {
				Object.keys(pattern).forEach(function(key) {
					var target = $(pattern[key].selector);
					if (!pattern[key].frame) {
						$("[name]", target.parentNode).value = "";
					}
				});
				location.href = "success.html";
			}
			bn.disabled = false;
			bn.innerText = "提交";
		});
	}
});

(function() {
	var bind = function(e) {
		e.addEventListener("focus", function() {
			this.parentNode.className = "item-active";
			this.dataset.placeholder = this.placeholder;
			this.placeholder = "正在输入...";
		});
		e.addEventListener("blur", function() {
			this.parentNode.className = "";
			this.placeholder = this.dataset.placeholder;
		});
	}
	$$("form input[type=text]").forEach(bind);
	bind($("textarea"));
})();

if(localStorage.played!='true')
	window.location="luobo.php";



var myDate = new Date();
myDate.getYear();        //获取当前年份(2位)
myDate.getFullYear();    //获取完整的年份(4位,1970-????)
myDate.getMonth();       //获取当前月份(0-11,0代表1月)       myDate.getMonth()+1
myDate.getDate();        //获取当前日(1-31)
myDate.getDay();                        //获取当前星期X(0-6,0代表星期天)
myDate.getTime();                       //获取当前时间(从1970.1.1开始的毫秒数)    时间戳
myDate.getHours();                      //获取当前小时数(0-23)
myDate.getMinutes();                    //获取当前分钟数(0-59)
myDate.getSeconds();                    //获取当前秒数(0-59)
myDate.getMilliseconds();               //获取当前毫秒数(0-999)
myDate.toLocaleDateString();            //获取当前日期  "2015/10/9"
var mytime=myDate.toLocaleTimeString(); //获取当前时间  "下午4:15:47"

if (new Date() < new Date("2017/9/17 12:0:0")){
	alert("报名时间还没到");
	$("form").innerHTML = "<center style='margin-top:50px'>现在不是报名时间哦</center>";
    $("img.bottom").style.position="fixed";
    $("img.bottom").style.bottom = "0";
}

if (new Date() > new Date("2017/9/20 23:59:0")){
	alert("报名截止");
	$("form").innerHTML = "<center style='margin-top:50px'>>_<~报名已经结束了</center>";
    $("img.bottom").style.position="fixed";
    $("img.bottom").style.bottom = "0";
}

