/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/gantt/';
var access_token = 'Zs0nTQB-ujOSV0KmEoPhBx2E6-Ab_GKO';  //'######access_token###########'
var content_type = 'application/json';
var html5sticky = {};
html5sticky.voteResult = function () {

    var SendInfo = {"aggregate": {
            "groupby": "name",
            "agg": [
                {
                    "type": "sum",
                    "column": "count"
                }
            ]
        }};
    $.ajax({
        url: url + 'aggregate',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var count = 0;
            console.info(JSON.stringify(data));
            //$("#test_div").html(JSON.stringify(data));
//            $("#test_div").show();
            var obj = JSON.parse(JSON.stringify(data));
            /* for(var i = 0; i < obj.result.length; i++) {
             var obj1 = data[i];
             
             console.log(obj1.id);
             } */
            //var mytable =  $('#example').DataTable();
            var result = $.parseJSON(JSON.stringify(obj.result));
            console.info(JSON.stringify(obj.result));
            var resultArray = [];
            var color = [];
            var name = [];
            $.each(result, function (k, jsonObject) {
                resultArray.push(jsonObject.sum_count);
                color.push(jsonObject.color);
                name.push(jsonObject._id);
//                count++;

            });
//            alert(resultArray);
            var ctx = document.getElementById("myChart");
            var chartarea = document.getElementById("chart-area");
            var myChart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: name, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
                            label: '# of Votes',
                            data: resultArray, // [12, 19, 3, 5, 2, 3],
//                            backgroundColor: 
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1
                        }]
                },
                options: {
                    scales: {
                        yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                    }
                }
            });


            // Chart Area for Pie
            var mychartarea = new Chart(chartarea, {
                type: 'pie',
                data: {
                    labels: name, //["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                    datasets: [{
//                            label: '# of Votes',
                            data: resultArray, // [12, 19, 3, 5, 2, 3],
//                            backgroundColor: 
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255,99,132,1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)'
                            ],
                            borderWidth: 1,
                            label: 'Dataset 1'
                        }]
                },
                options: {
                    responsive: true
                }
            });


        }

    });
};

html5sticky.vote = function (name, color) {
    var SendInfo = {"Data": [{"name": name, "color": color, "count": 1}]};
    ////alert(JSON.stringify(SendInfo)); 

    $.ajax({
        url: url + 'save',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5sticky.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
        },
        error: function (xhr, thrownError) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5sticky.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
//            alert(thrownError);
        }
    });
};

html5sticky.build = function (data) {
    var SendInfo = {"Data": data};
    console.log(JSON.stringify(SendInfo));

    $.ajax({
        url: url + 'save',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type,
            "origin": 'app'
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5sticky.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
        },
        error: function (xhr, thrownError) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5sticky.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
//            alert(thrownError);
        }
    });
};

html5sticky.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg">' + msg + '</div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '50px',
                    lineHeight: '30px',
                    background: bgcolor,
                    color: color,
                    zIndex: 1000,
                    padding: '10px',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    opacity: 0.9,
                    margin: 'auto',
                    display: 'none'
                }).slideDown('show');
                setTimeout(function () {
                    $('#smsg').animate({'width': 'hide'}, function () {
                        $('#smsg').remove();
                    });
                }, 4000);
                $(".btn-primary").addClass('disabled');
                $(".btn-warning").removeClass('disabled');
            }
        });
    }
};


html5sticky.voteAgain = function () {
    $(".btn-warning").addClass('disabled');
    $(".btn-primary").removeClass('disabled');

};


// jQuery Play
$(function () {


    $("#ganttChart").ganttView({
        data: ganttData,
        slideWidth: 900,
        behavior: {
            onClick: function (data) {
                var msg = "You clicked on an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
                $("#eventMessage").text(msg);
            },
            onResize: function (data) {
                var msg = "You resized an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
                $("#eventMessage").text(msg);
            },
            onDrag: function (data) {
                var msg = "You dragged an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
                $("#eventMessage").text(msg);
            }
        }
    });

    $('#again').click(function () {
        html5sticky.build([{"name" : "hello"}]);
        return false;
    });


});

