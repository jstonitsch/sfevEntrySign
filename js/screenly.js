/*function currentDate() {
	var d = new Date();
	var t = new Time();
	var curr_time = t.getTime();
	var curr_date = d.getDate();
	var curr_month = d.getMonth() + 1;
	var curr_year = d.getFullYear();
	$("#date").append(curr_time + " " + curr_date + "-" + curr_month + "-" + curr_year);
};

currentDate();
*/

var now = moment().format('MMM Do YYYY, h:mm a');
$("#date").append( now );