var timetime;
jQuery.ajaxSettings.traditional = true;

window.onload=function(){
	item_add_first();	// txt저장
	make_text_array();	// 배열로 파싱
	first_add_div();
	time_get();
};

var clicked_index_modify;
var mon_string;
var monarray = new Array();
var tue_string;
var tuearray = new Array();
var wed_string;
var wedarray = new Array();
var thur_string;
var thurarray = new Array();
var fri_string;
var friarray = new Array();
var added_box = new Array();
// 시간 변수
var week = new Array('SUN', 'MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT'); 
var month;
var day;
var year;
var day_index;
var hour;
var min;

var del_mon_index = ["100"];
var del_tue_index =["100"];
var del_wed_index = ["100"];
var del_thur_index = ["100"];
var del_fri_index = ["100"];

var drag_from;
var drop_to;
var from_list;
var to_list;

function item_add_first(){
    $.ajax({
        type:"POST",
        url:"./Item_Add.jsp",
        async:false,
        data : {
        	"ToDo_day" : document.getElementById("addtodo_window_day_dropdown").value,
        	"ToDo_title" : document.getElementById("addtodo_window_todo_title").value,
        	"ToDo_content" : document.getElementById("addtodo_window_todo_article").value
        	},
        success: function(xml){
           
        	console.log(xml);
            $.ajax({
    	        url: "data_dir/Monday.txt",
    	        dataType: "text",
    	        timeout:30000,
    	        async:false,
    	        success: function(data,status, xhr){
    	        	mon_string = data;
    	        	
    	        },
    	        error: function(xhr, message, errorThrown){
    	            var msg = xhr.status + " / " + message + " / " + errorThrown;
    	             alert(msg);
    	        }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
    		});
            $.ajax({
                url: "data_dir/Tuesday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	tue_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Wednesday.txt",
                dataType: "text",
                timeout:30000,        
                async:false,
                success: function(data){
                	wed_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Thursday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	thur_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Friday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	fri_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        },
        error: function(xhr, status, error) {
            alert(error);
        }  
    });
}


function time_get(){
	$.ajax({
	    url: "data_dir/modi_time.txt",
	    dataType: "text",
	    timeout:30000,        
	    async:false,
	    success: function(data){
	    	timetime = data;
        	$('#resp_time').html(timetime);

	    },
	    error: function(xhr, message, errorThrown){
	        var msg = xhr.status + " / " + message + " / " + errorThrown;
	         alert(msg);
	    }, cache: false, headers: {
	    	'Cache-Control' : 'no-cache, no-store, must-revalidate',
	    	'Pragma' : 'no-cache',
	    	'Expires' : '0'
	    }
	});
}

function time_set(){
	$.ajax({
	    type:"POST",
	    url:"./modify_time.jsp",
	    async:false,
	    data : {
	    	"month" : month,
	    	"day" : day,
	    	"year" : year,
	    	"day_index" : day_index,
	    	"hour":hour,
	    	"min":min
	    	},
	    success: function(xml){
	        console.log(xml);
	    },
	    error: function(xhr, status, error) {
	        alert(error);
	    }  
	});
}

$(document).ready(function() {
  $(function() {
    $(".day_lists").sortable({
      opacity: 0.5,
      connectWith: ".day_lists",
      start: function(event, ui) {
    	  drag_from = ui.item.index();
    	  from_list = ((ui.item.parent()[0]).id);
    	  
    	  
      },
      stop: function(event, ui) {
    	  drop_to =  ui.item.index();
    	  to_list = ((ui.item.parent()[0]).id);
      
    	  $.ajax({
    	        type:"POST",
    	        url:"./drag.jsp",
    	        async:false,
    	        data : {
    	        	"from_list" : from_list,
    	        	"to_list" : to_list,
    	        	"drag_from" : drag_from,
    	        	"drop_to" : drop_to
    	        	},
    	        success: function(xml){
    	            console.log(xml);
    	            var dt = new Date();
    	        	
    	        	month = dt.getMonth()+1;
    	        	day = dt.getDate();
    	        	year = dt.getFullYear();
    	        	day_index = week[dt.getDay()];
    	        	hour = dt.getHours();
    	        	min = dt.getMinutes();
    	        	
    	        	$('#resp_time').html(year + '-' + month + '-' + day+" "+day_index + " " + hour + " : "+min);
    	        	time_set();
    	        },
    	        error: function(xhr, status, error) {
    	            alert(error);
    	        }  
    	    });
    	    
      }
      
    });
   
  });
});




function item_add(){
    $.ajax({
        type:"POST",
        url:"./Item_Add.jsp",
        async:false,
        data : {
        	"ToDo_day" : document.getElementById("addtodo_window_day_dropdown").value,
        	"ToDo_title" : document.getElementById("addtodo_window_todo_title").value,
        	"ToDo_content" : document.getElementById("addtodo_window_todo_article").value
        	},
        success: function(xml){
        	var dt = new Date();
        	
        	month = dt.getMonth()+1;
        	day = dt.getDate();
        	year = dt.getFullYear();
        	day_index = week[dt.getDay()];
        	hour = dt.getHours();
        	min = dt.getMinutes();
        	
        	$('#resp_time').html(year + '-' + month + '-' + day+" "+day_index + " " + hour + " : "+min);
        	time_set();
           
        	console.log(xml);
            $.ajax({
    	        url: "data_dir/Monday.txt",
    	        dataType: "text",
    	        timeout:30000,
    	        async:false,
    	        success: function(data,status, xhr){
    	        	mon_string = data;
    	        	
    	        },
    	        error: function(xhr, message, errorThrown){
    	            var msg = xhr.status + " / " + message + " / " + errorThrown;
    	             alert(msg);
    	        }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
    		});
            $.ajax({
                url: "data_dir/Tuesday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	tue_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Wednesday.txt",
                dataType: "text",
                timeout:30000,        
                async:false,
                success: function(data){
                	wed_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Thursday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	thur_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        	$.ajax({
                url: "data_dir/Friday.txt",
                dataType: "text",
                timeout:30000,
                async:false,
                success: function(data){
                	fri_string = data;
                },
                error: function(xhr, message, errorThrown){
                    var msg = xhr.status + " / " + message + " / " + errorThrown;
                     alert(msg);
                }, cache: false, headers: {
    	        	'Cache-Control' : 'no-cache, no-store, must-revalidate',
    	        	'Pragma' : 'no-cache',
    	        	'Expires' : '0'
    	        }
            });
        },
        error: function(xhr, status, error) {
            alert(error);
        }  
    });
}

function item_modify(){
    $.ajax({
        type:"POST",
        url:"./Item_modify.jsp",
        async:false,
        data : {
        	"modify_ToDo_day" : document.getElementById("changetodo_window_day_dropdown").value,
        	"modify_ToDo_title" : document.getElementById("changetodo_window_todo_title").value,
        	"modify_ToDo_content" : document.getElementById("changetodo_window_todo_article").value,
        	"modify_index":clicked_index_modify
        	},
        success: function(xml){
            console.log(xml);
            var dt = new Date();
        	
        	month = dt.getMonth()+1;
        	day = dt.getDate();
        	year = dt.getFullYear();
        	day_index = week[dt.getDay()];
        	hour = dt.getHours();
        	min = dt.getMinutes();
        	
        	$('#resp_time').html(year + '-' + month + '-' + day+" "+day_index + " " + hour + " : "+min);
        	time_set();

        },
        error: function(xhr, status, error) {
            alert(error);
        }  
    });
}


function item_delete(){

    $.ajax({
        type:"POST",
        url:"./Item_delete.jsp",
        async:false,
        data : {
        	"mon_del" : del_mon_index,
        	"tue_del" : del_tue_index,
        	"wed_del" : del_wed_index,
        	"thur_del" : del_thur_index,
        	"fri_del" : del_fri_index
        	},
        success: function(xml){
            console.log(xml);
            var dt = new Date();
        	
        	month = dt.getMonth()+1;
        	day = dt.getDate();
        	year = dt.getFullYear();
        	day_index = week[dt.getDay()];
        	hour = dt.getHours();
        	min = dt.getMinutes();
        	
        	$('#resp_time').html(year + '-' + month + '-' + day+" "+day_index + " " + hour + " : "+min);
        	time_set();
        },
        error: function(xhr, status, error) {
            console.log(error);
        }  
    });
}

	
	



function todobutton_click() {
  document.getElementById("AddToDo_div").style.display = "block";
}

/* AddToDo javascript */
function cancel() { // 추가 창에서 취소 버튼 누르는 경우 호출 되는 함수
  document.getElementById("addtodo_window_day_dropdown").selectedIndex = 0;
  document.getElementById("addtodo_window_todo_title").value = null;
  document.getElementById("addtodo_window_todo_article").value = "";
  document.getElementById("AddToDo_div").style.display = "none";
}

function add_to_text(){
	  $('ul').html("");
	  item_add();	// txt저장
	  cancel();	// 창끄기
	  make_text_array();	// 배열로 파싱
	  first_add_div();
}

function make_text_array(){
	monarray=[];
	tuearray=[];
	wedarray=[];
	thurarray=[];
	friarray=[];
	
	mon_string = String(mon_string);
	var lines = mon_string.split("\n");
	for(var i =0 ;i<lines.length-1;i+=2){
		monarray.push([lines[i],lines[i+1]]);
	}
	
	tue_string = String(tue_string);
	var lines = tue_string.split("\n");
	for(var i =0 ;i<lines.length-1;i+=2){
		tuearray.push([lines[i],lines[i+1]]);
	}
	
	wed_string = String(wed_string);
	var lines = wed_string.split("\n");
	for(var i =0 ;i<lines.length-1;i+=2){
		wedarray.push([lines[i],lines[i+1]]);
	}
	
	thur_string = String(thur_string);
	var lines = thur_string.split("\n");
	for(var i =0 ;i<lines.length-1;i+=2){
		thurarray.push([lines[i],lines[i+1]]);
	}
	
	fri_string = String(fri_string);
	var lines = fri_string.split("\n");
	for(var i =0 ;i<lines.length-1;i+=2){
		friarray.push([lines[i],lines[i+1]]);
	}
}

function first_add_div(){
	for(var i = 0; i<monarray.length;i++){
		  added_box[i] = document.createElement("div");
		  var added_box_text = document.createElement("div");
		  var del_checkbox = document.createElement("input");
		  var para = document.createElement("div");
		  var day_li = document.createElement("li");
		  para.innerHTML = monarray[i][1];
		  para.style.display = "none";
		  del_checkbox.type = "checkbox";
		  added_box_text.innerHTML = monarray[i][0];
		  added_box[i].style.margin = "10px auto";
		  added_box[i].style.border = "0.5px solid black";
		  added_box[i].style.borderRadius = "5px";
		  added_box[i].style.width = "120px";
		  added_box[i].style.height = "80px";
		  added_box[i].style.backgroundColor = "#9fdf9f";
		  added_box_text.style.paddingTop = "25px";
		  del_checkbox.style.width = "20px";
		  del_checkbox.style.height = "20px";
		  added_box[i].appendChild(del_checkbox);
		  added_box[i].appendChild(added_box_text);
		  added_box[i].appendChild(para);
		  added_box[i].style.cursor = "pointer";

		  del_checkbox.style.paddingTop = "3px";
		  del_checkbox.style.paddingLeft = "3px";
		  del_checkbox.style.float = "left";
		  del_checkbox.className = "checkbox_todel";
		  
		  $( ".checkbox_todel" ).click(function( event ) {
			  event.stopPropagation();
			});
		  
		  var added_todo_title = monarray[i][0];
		  var added_todo_detail = monarray[i][1];

		  
		    added_box[i].className = "monday";
		    added_box[i].style.backgroundColor = "#9fdf9f";
		    cur_day_list = document.getElementById("monday_list");
		 
		  day_li.appendChild(added_box[i]);
		  cur_day_list.appendChild(day_li);
		  /*
			 * del_checkbox.onclick = function(e) { e.stopPropagation(); }
			 */

		  (function(){
			  var idx = i;
			  added_box[idx].onclick = function(event) { // 박스 눌렸을 경우
		    document.getElementById("ChangeToDo_div").style.display = "block";
		    var clicked_box_num = $(added_box[idx]).parent().index();
		    document.getElementById("changetodo_window_todo_title").value = this.childNodes[1].innerText;
		    document.getElementById("changetodo_window_todo_article").value = this.childNodes[2].innerText;

// var day_class = added_box[i].className;
//
// if (day_class == "monday") {
// document.getElementById("changetodo_window_day_dropdown").value = "Monday";
// }
		    
		    document.getElementById("changetodo_window_submit_button").onclick = function() { // 변경
																								// 버튼
																								// 누른경우

		      var clicked_box_num =  $(added_box[idx]).parent().index(); // 누른
																			// 박스의
																			// 번호
		      clicked_index_modify = $(added_box[idx]).parent().index();

		      added_todo_title = document.getElementById("changetodo_window_todo_title").value;
		      added_todo_detail = document.getElementById("changetodo_window_todo_article").value;
		      var changed_day = document.getElementById("changetodo_window_day_dropdown").value;
		      var k = document.getElementById("monday_list").childNodes[clicked_box_num];
		      k.childNodes[0].childNodes[1].innerHTML = added_todo_title;
		      k.childNodes[0].childNodes[2].innerHTML = added_todo_detail;
		      var day_class = added_box[idx].className;

		      item_modify();
		      
		      change_window_close();

		    }
		  }
		  })();
	}
	
	
	for(var i = 0; i<tuearray.length;i++){
		  added_box[i] = document.createElement("div");
		  var added_box_text = document.createElement("div");
		  var del_checkbox = document.createElement("input");
		  var para = document.createElement("div");
		  var day_li = document.createElement("li");
		  para.innerHTML = tuearray[i][1];
		  para.style.display = "none";
		  del_checkbox.type = "checkbox";
		  added_box_text.innerHTML = tuearray[i][0];
		  added_box[i].style.margin = "10px auto";
		  added_box[i].style.border = "0.5px solid black";
		  added_box[i].style.borderRadius = "5px";
		  added_box[i].style.width = "120px";
		  added_box[i].style.height = "80px";
		  added_box[i].style.backgroundColor = "#9fdf9f";
		  added_box_text.style.paddingTop = "25px";
		  del_checkbox.style.width = "20px";
		  del_checkbox.style.height = "20px";
		  added_box[i].appendChild(del_checkbox);
		  added_box[i].appendChild(added_box_text);
		  added_box[i].appendChild(para);
		  added_box[i].style.cursor = "pointer";

		  del_checkbox.style.paddingTop = "3px";
		  del_checkbox.style.paddingLeft = "3px";
		  del_checkbox.style.float = "left";
		  del_checkbox.className = "checkbox_todel";
		  
		  $( ".checkbox_todel" ).click(function( event ) {
			  event.stopPropagation();
			});
		  
		  var added_todo_title = tuearray[i][0];
		  var added_todo_detail = tuearray[i][1];

		  
		  added_box[i].className = "tuesday";
		    added_box[i].style.backgroundColor = "#9fdf9f";
		    cur_day_list = document.getElementById("tuesday_list");
		 
		  day_li.appendChild(added_box[i]);
		  cur_day_list.appendChild(day_li);
		  /*
			 * del_checkbox.onclick = function(e) { e.stopPropagation(); }
			 */

		  (function(){
			  var idx = i;
			  added_box[idx].onclick = function(event) { // 박스 눌렸을 경우
				  console.log(this);
		    document.getElementById("ChangeToDo_div").style.display = "block";
		    var clicked_box_num = $(added_box[idx]).parent().index();
		    document.getElementById("changetodo_window_todo_title").value = this.childNodes[1].innerText;
		    document.getElementById("changetodo_window_todo_article").value = this.childNodes[2].innerText;

// var day_class = added_box[i].className;
//
// if (day_class == "monday") {
// document.getElementById("changetodo_window_day_dropdown").value = "Monday";
// }
		    
		    document.getElementById("changetodo_window_submit_button").onclick = function() { // 변경
																								// 버튼
																								// 누른경우

		      var clicked_box_num =  $(added_box[idx]).parent().index(); // 누른
																			// 박스의
																			// 번호
		      clicked_index_modify = $(added_box[idx]).parent().index();

		      added_todo_title = document.getElementById("changetodo_window_todo_title").value;
		      added_todo_detail = document.getElementById("changetodo_window_todo_article").value;
		      document.getElementById("changetodo_window_day_dropdown").value = "Tuesday";
		      var changed_day = document.getElementById("changetodo_window_day_dropdown").value;
		      var k = document.getElementById("tuesday_list").childNodes[clicked_box_num];
		      k.childNodes[0].childNodes[1].innerHTML = added_todo_title;
		      k.childNodes[0].childNodes[2].innerHTML = added_todo_detail;
		      var day_class = added_box[idx].className;

		      item_modify();
		      
		      change_window_close();

		    }
		  }
		  })();
	}
	
	
	
	
	for(var i = 0; i<wedarray.length;i++){
		  added_box[i] = document.createElement("div");
		  var added_box_text = document.createElement("div");
		  var del_checkbox = document.createElement("input");
		  var para = document.createElement("div");
		  var day_li = document.createElement("li");
		  para.innerHTML = wedarray[i][1];
		  para.style.display = "none";
		  del_checkbox.type = "checkbox";
		  added_box_text.innerHTML = wedarray[i][0];
		  added_box[i].style.margin = "10px auto";
		  added_box[i].style.border = "0.5px solid black";
		  added_box[i].style.borderRadius = "5px";
		  added_box[i].style.width = "120px";
		  added_box[i].style.height = "80px";
		  added_box[i].style.backgroundColor = "#9fdf9f";
		  added_box_text.style.paddingTop = "25px";
		  del_checkbox.style.width = "20px";
		  del_checkbox.style.height = "20px";
		  added_box[i].appendChild(del_checkbox);
		  added_box[i].appendChild(added_box_text);
		  added_box[i].appendChild(para);
		  added_box[i].style.cursor = "pointer";

		  del_checkbox.style.paddingTop = "3px";
		  del_checkbox.style.paddingLeft = "3px";
		  del_checkbox.style.float = "left";
		  del_checkbox.className = "checkbox_todel";
		  
		  $( ".checkbox_todel" ).click(function( event ) {
			  event.stopPropagation();
			});
		  
		  var added_todo_title = wedarray[i][0];
		  var added_todo_detail = wedarray[i][1];

		  
		  added_box[i].className = "wednesday";
		    added_box[i].style.backgroundColor = "#9fdf9f";
		    cur_day_list = document.getElementById("wednesday_list");
		    
		  day_li.appendChild(added_box[i]);
		  cur_day_list.appendChild(day_li);
		  /*
			 * del_checkbox.onclick = function(e) { e.stopPropagation(); }
			 */

		  (function(){
			  var idx = i;
			  added_box[idx].onclick = function(event) { // 박스 눌렸을 경우
				  console.log(this);
		    document.getElementById("ChangeToDo_div").style.display = "block";
		    var clicked_box_num = $(added_box[idx]).parent().index();
		    document.getElementById("changetodo_window_todo_title").value = this.childNodes[1].innerText;
		    document.getElementById("changetodo_window_todo_article").value = this.childNodes[2].innerText;

// var day_class = added_box[i].className;
//
// if (day_class == "monday") {
// document.getElementById("changetodo_window_day_dropdown").value = "Monday";
// }
		    
		    document.getElementById("changetodo_window_submit_button").onclick = function() { // 변경
																								// 버튼
																								// 누른경우

		      var clicked_box_num =  $(added_box[idx]).parent().index(); // 누른
																			// 박스의
																			// 번호
		      clicked_index_modify = $(added_box[idx]).parent().index();

		      added_todo_title = document.getElementById("changetodo_window_todo_title").value;
		      added_todo_detail = document.getElementById("changetodo_window_todo_article").value;
		      document.getElementById("changetodo_window_day_dropdown").value = "Wednesday";
		      var changed_day = document.getElementById("changetodo_window_day_dropdown").value;
		      var k = document.getElementById("wednesday_list").childNodes[clicked_box_num];
		      k.childNodes[0].childNodes[1].innerHTML = added_todo_title;
		      k.childNodes[0].childNodes[2].innerHTML = added_todo_detail;
		      var day_class = added_box[idx].className;

		      item_modify();
		      
		      change_window_close();

		    }
		  }
		  })();
	}
	
	
	for(var i = 0; i<thurarray.length;i++){
		  added_box[i] = document.createElement("div");
		  var added_box_text = document.createElement("div");
		  var del_checkbox = document.createElement("input");
		  var para = document.createElement("div");
		  var day_li = document.createElement("li");
		  para.innerHTML = thurarray[i][1];
		  para.style.display = "none";
		  del_checkbox.type = "checkbox";
		  added_box_text.innerHTML = thurarray[i][0];
		  added_box[i].style.margin = "10px auto";
		  added_box[i].style.border = "0.5px solid black";
		  added_box[i].style.borderRadius = "5px";
		  added_box[i].style.width = "120px";
		  added_box[i].style.height = "80px";
		  added_box[i].style.backgroundColor = "#9fdf9f";
		  added_box_text.style.paddingTop = "25px";
		  del_checkbox.style.width = "20px";
		  del_checkbox.style.height = "20px";
		  added_box[i].appendChild(del_checkbox);
		  added_box[i].appendChild(added_box_text);
		  added_box[i].appendChild(para);
		  added_box[i].style.cursor = "pointer";

		  del_checkbox.style.paddingTop = "3px";
		  del_checkbox.style.paddingLeft = "3px";
		  del_checkbox.style.float = "left";
		  del_checkbox.className = "checkbox_todel";
		  
		  $( ".checkbox_todel" ).click(function( event ) {
			  event.stopPropagation();
			});
		  
		  var added_todo_title = thurarray[i][0];
		  var added_todo_detail = thurarray[i][1];

		  
		  added_box[i].className = "thursday";
		    added_box[i].style.backgroundColor = "#9fdf9f";
		    cur_day_list = document.getElementById("thursday_list");
		    
		  day_li.appendChild(added_box[i]);
		  cur_day_list.appendChild(day_li);
		  /*
			 * del_checkbox.onclick = function(e) { e.stopPropagation(); }
			 */

		  (function(){
			  var idx = i;
			  added_box[idx].onclick = function(event) { // 박스 눌렸을 경우
				  console.log(this);
		    document.getElementById("ChangeToDo_div").style.display = "block";
		    var clicked_box_num = $(added_box[idx]).parent().index();
		    document.getElementById("changetodo_window_todo_title").value = this.childNodes[1].innerText;
		    document.getElementById("changetodo_window_todo_article").value = this.childNodes[2].innerText;

// var day_class = added_box[i].className;
//
// if (day_class == "monday") {
// document.getElementById("changetodo_window_day_dropdown").value = "Monday";
// }
		    
		    document.getElementById("changetodo_window_submit_button").onclick = function() { // 변경
																								// 버튼
																								// 누른경우

		      var clicked_box_num =  $(added_box[idx]).parent().index(); // 누른
																			// 박스의
																			// 번호
		      clicked_index_modify = $(added_box[idx]).parent().index();

		      added_todo_title = document.getElementById("changetodo_window_todo_title").value;
		      added_todo_detail = document.getElementById("changetodo_window_todo_article").value;
		      document.getElementById("changetodo_window_day_dropdown").value = "Thursday";
		      var changed_day = document.getElementById("changetodo_window_day_dropdown").value;
		      var k = document.getElementById("thursday_list").childNodes[clicked_box_num];
		      k.childNodes[0].childNodes[1].innerHTML = added_todo_title;
		      k.childNodes[0].childNodes[2].innerHTML = added_todo_detail;
		      var day_class = added_box[idx].className;

		      item_modify();
		      
		      change_window_close();

		    }
		  }
		  })();
	}
	
	for(var i = 0; i<friarray.length;i++){
		  added_box[i] = document.createElement("div");
		  var added_box_text = document.createElement("div");
		  var del_checkbox = document.createElement("input");
		  var para = document.createElement("div");
		  var day_li = document.createElement("li");
		  para.innerHTML = friarray[i][1];
		  para.style.display = "none";
		  del_checkbox.type = "checkbox";
		  added_box_text.innerHTML = friarray[i][0];
		  added_box[i].style.margin = "10px auto";
		  added_box[i].style.border = "0.5px solid black";
		  added_box[i].style.borderRadius = "5px";
		  added_box[i].style.width = "120px";
		  added_box[i].style.height = "80px";
		  added_box[i].style.backgroundColor = "#9fdf9f";
		  added_box_text.style.paddingTop = "25px";
		  del_checkbox.style.width = "20px";
		  del_checkbox.style.height = "20px";
		  added_box[i].appendChild(del_checkbox);
		  added_box[i].appendChild(added_box_text);
		  added_box[i].appendChild(para);
		  added_box[i].style.cursor = "pointer";

		  del_checkbox.style.paddingTop = "3px";
		  del_checkbox.style.paddingLeft = "3px";
		  del_checkbox.style.float = "left";
		  del_checkbox.className = "checkbox_todel";
		  
		  del_checkbox.onclick = function(e){
			  e.stopPropagation();
		  }
		  
		  $( ".checkbox_todel" ).click(function( event ) {
			  event.stopPropagation();
			});
		  
		  var added_todo_title = friarray[i][0];
		  var added_todo_detail = friarray[i][1];

		  
		  added_box[i].className = "friday";
		    added_box[i].style.backgroundColor = "#9fdf9f";
		    cur_day_list = document.getElementById("friday_list");
		    
		  day_li.appendChild(added_box[i]);
		  cur_day_list.appendChild(day_li);
		  /*
			 * del_checkbox.onclick = function(e) { e.stopPropagation(); }
			 */

		  (function(){
			  var idx = i;
			  added_box[idx].onclick = function(event) { // 박스 눌렸을 경우
				  console.log(this);
		    document.getElementById("ChangeToDo_div").style.display = "block";
		    var clicked_box_num = $(added_box[idx]).parent().index();
		    document.getElementById("changetodo_window_todo_title").value = this.childNodes[1].innerText;
		    document.getElementById("changetodo_window_todo_article").value = this.childNodes[2].innerText;

// var day_class = added_box[i].className;
//
// if (day_class == "monday") {
// document.getElementById("changetodo_window_day_dropdown").value = "Monday";
// }
		    
		    document.getElementById("changetodo_window_submit_button").onclick = function() { // 변경
																								// 버튼
																								// 누른경우

		      var clicked_box_num =  $(added_box[idx]).parent().index(); // 누른
																			// 박스의
																			// 번호
		      clicked_index_modify = $(added_box[idx]).parent().index();

		      added_todo_title = document.getElementById("changetodo_window_todo_title").value;
		      added_todo_detail = document.getElementById("changetodo_window_todo_article").value;
		      document.getElementById("changetodo_window_day_dropdown").value = "Friday";
		      var changed_day = document.getElementById("changetodo_window_day_dropdown").value;
		      var k = document.getElementById("friday_list").childNodes[clicked_box_num];
		      k.childNodes[0].childNodes[1].innerHTML = added_todo_title;
		      k.childNodes[0].childNodes[2].innerHTML = added_todo_detail;
		      var day_class = added_box[idx].className;

		      item_modify();
		      
		      change_window_close();

		    }
		  }
		  })();
	}
}


function del_item_click() {
	del_mon_index = ["100"];
	del_tue_index = ["100"];
	del_wed_index = ["100"];
	del_thur_index = ["100"];
	del_fri_index = ["100"];
	
  var ml = document.getElementById("monday_list");
  var tl = document.getElementById("tuesday_list");
  var wl = document.getElementById("wednesday_list");
  var thl = document.getElementById("thursday_list");
  var fl = document.getElementById("friday_list");

  var ms = ml.childNodes.length;
  var ts = tl.childNodes.length;
  var ws = wl.childNodes.length;
  var ths = thl.childNodes.length;
  var fs = fl.childNodes.length;

  var mlf, tlf, wlf, thlf, flf;


  for (var i = ms - 1; i >= 0; i--) {
    mlf = ml.childNodes[i];
    var temp_check = mlf.firstChild.firstChild;
    if (temp_check.checked) {
      ml.removeChild(ml.childNodes[i]);
      del_mon_index.push(i);
    }
  }
  console.log(del_mon_index);

  for (var i = ts - 1; i >= 0; i--) {
    tlf = tl.childNodes[i];
    var temp_check = tlf.firstChild.firstChild;
    if (temp_check.checked) {
      tl.removeChild(tl.childNodes[i]);
      del_tue_index.push(i);

    }
  }

  for (var i = ws - 1; i >= 0; i--) {
    wlf = wl.childNodes[i];
    var temp_check = wlf.firstChild.firstChild;
    if (temp_check.checked) {
      wl.removeChild(wl.childNodes[i]);
      del_wed_index.push(i);

    }
  }
  for (var i = ths - 1; i >= 0; i--) {
    thlf = thl.childNodes[i];
    var temp_check = thlf.firstChild.firstChild;
    if (temp_check.checked) {
      thl.removeChild(thl.childNodes[i]);
      del_thur_index.push(i);

    }
  }
  for (var i = fs - 1; i >= 0; i--) {
    flf = fl.childNodes[i];
    var temp_check = flf.firstChild.firstChild;
    if (temp_check.checked) {
      fl.removeChild(fl.childNodes[i]);
      del_fri_index.push(i);

    }
  }

  item_delete();
}

function change_window_close() {
  document.getElementById("ChangeToDo_div").style.display = "none";
}

function getChildNumber(node) { // 위치 가져오기
  return Array.prototype.indexOf.call(node.parentNode.childNodes, node);
}



function search() {
  var ml = document.getElementById("monday_list");
  var tl = document.getElementById("tuesday_list");
  var wl = document.getElementById("wednesday_list");
  var thl = document.getElementById("thursday_list");
  var fl = document.getElementById("friday_list");

  var ms = ml.childNodes.length;
  var ts = tl.childNodes.length;
  var ws = wl.childNodes.length;
  var ths = thl.childNodes.length;
  var fs = fl.childNodes.length;

  var selected_day = document.getElementById("day_dropdown").value;
  var searched_text = document.getElementById("Enter_keyword_id").value;

  showall();

  if (searched_text != "" && selected_day == "day") { // 검색어 있이 day
    showall();
    var day_list = document.getElementById("monday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {
        for (var i = 0; i < ms; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("tuesday_list");
    if (day_list.firstChild != null) {

    var first_child_div = day_list.firstChild;

      if (first_child_div != null) {

        for (var i = 0; i < ts; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("wednesday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < ws; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("thursday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < ths; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("friday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < fs; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }
  } else if (searched_text == "" && selected_day == "day") { // 검색어 없이 day
    showall();

  } else if (searched_text != "" && selected_day != "day") { // 검색어 있이 day선택된
																// 경우
    showall();
    if (selected_day == "Monday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;

        if (first_child_div != null) {

          for (var i = 0; i < ms; i++) {
            var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
            if (temp_text.indexOf(searched_text) == -1) {
              first_child_div.style.display = "none";
            }
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

    } else if (selected_day == "Tuesday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;

        if (first_child_div != null) {

          for (var i = 0; i < ts; i++) {
            var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
            if (temp_text.indexOf(searched_text) == -1) {
              first_child_div.style.display = "none";
            }
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

    } else if (selected_day == "Wednesday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;

        if (first_child_div != null) {

          for (var i = 0; i < ws; i++) {
            var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
            if (temp_text.indexOf(searched_text) == -1) {
              first_child_div.style.display = "none";
            }
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

    } else if (selected_day == "Thursday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;

        if (first_child_div != null) {

          for (var i = 0; i < ths; i++) {
            var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
            if (temp_text.indexOf(searched_text) == -1) {
              first_child_div.style.display = "none";
            }
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

    } else if (selected_day == "Friday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;

        if (first_child_div != null) {

          for (var i = 0; i < fs; i++) {
            var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
            if (temp_text.indexOf(searched_text) == -1) {
              first_child_div.style.display = "none";
            }
            first_child_div = first_child_div.nextSibling;
          }
        }
      }
    }
    var day_list = document.getElementById("monday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;

      if (first_child_div != null) {

        for (var i = 0; i < ms; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("tuesday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;

      if (first_child_div != null) {

        for (var i = 0; i < ts; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("wednesday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < ws; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("thursday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < ths; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

    day_list = document.getElementById("friday_list");
    if (day_list.firstChild != null) {

      var first_child_div = day_list.firstChild;
      if (first_child_div != null) {

        for (var i = 0; i < fs; i++) {
          var temp_text = first_child_div.firstChild.firstChild.nextSibling.innerHTML;
          if (temp_text.indexOf(searched_text) == -1) {
            first_child_div.style.display = "none";
          }
          first_child_div = first_child_div.nextSibling;
        }
      }
    }

  } else if (searched_text == "" && selected_day != "day") { // 검색어 없이 특정day

    showall();

    if (selected_day == "Monday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      // 화요일
    } else if (selected_day == "Tuesday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }
      // 수요일
    } else if (selected_day == "Wednesday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }
      // 목요일
    } else if (selected_day == "Thursday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }
      // 금요일
    } else if (selected_day == "Friday") {
      var day_list = document.getElementById("monday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ms; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("tuesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ts; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("wednesday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ws; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("thursday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < ths; i++) {
            first_child_div.style.display = "none";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }

      var day_list = document.getElementById("friday_list");
      if (day_list.firstChild != null) {

        var first_child_div = day_list.firstChild;
        if (first_child_div != null) {
          for (var i = 0; i < fs; i++) {
            first_child_div.style.display = "inline";
            first_child_div = first_child_div.nextSibling;
          }
        }
      }
    }
  }
}

function showall() {
  var ml = document.getElementById("monday_list");
  var tl = document.getElementById("tuesday_list");
  var wl = document.getElementById("wednesday_list");
  var thl = document.getElementById("thursday_list");
  var fl = document.getElementById("friday_list");

  var ms = ml.childNodes.length;
  var ts = tl.childNodes.length;
  var ws = wl.childNodes.length;
  var ths = thl.childNodes.length;
  var fs = fl.childNodes.length;

  var day_list = document.getElementById("monday_list");
  if (day_list.firstChild != null) {
    var first_child_div = day_list.firstChild;	// 박스 li
    if (first_child_div != null) {
      for (var i = 0; i < ms; i++) {
        first_child_div.style.display = "inline";
        first_child_div = first_child_div.nextSibling;
      }
    }
  }

  var day_list = document.getElementById("tuesday_list");
  if (day_list.firstChild != null) {

	  var first_child_div = day_list.firstChild;	// 박스 li
	    if (first_child_div != null) {
	      for (var i = 0; i < ts; i++) {
	        first_child_div.style.display = "inline";
	        first_child_div = first_child_div.nextSibling;
	      }
	    }
  }

  var day_list = document.getElementById("wednesday_list");
  if (day_list.firstChild != null) {

	  var first_child_div = day_list.firstChild;	// 박스 li
	    if (first_child_div != null) {
	      for (var i = 0; i < ws; i++) {
	        first_child_div.style.display = "inline";
	        first_child_div = first_child_div.nextSibling;
	      }
	    }
  }

  var day_list = document.getElementById("thursday_list");
  if (day_list.firstChild != null) {

	  var first_child_div = day_list.firstChild;	// 박스 li
	    if (first_child_div != null) {
	      for (var i = 0; i < ths; i++) {
	        first_child_div.style.display = "inline";
	        first_child_div = first_child_div.nextSibling;
	      }
	    }
  }

  var day_list = document.getElementById("friday_list");
  if (day_list.firstChild != null) {

	  var first_child_div = day_list.firstChild;	// 박스 li
	    if (first_child_div != null) {
	      for (var i = 0; i < fs; i++) {
	        first_child_div.style.display = "inline";
	        first_child_div = first_child_div.nextSibling;
	      }
	    }
}
  }

