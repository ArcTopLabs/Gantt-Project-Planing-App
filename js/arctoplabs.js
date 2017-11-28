/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appName = "demo";
var url = 'https://api.masterdatanode.com/' + appName + '/gantt/';
var access_token = '######access_token###########';  //'######access_token###########'
var content_type = 'application/json';
var html5gantt = {};
html5gantt.dataResult = function () {

    var SendInfo = {"sort": {
            "name": "desc"
        }};
    $.ajax({
        url: url + 'find',
        type: 'post',
//                        data: {},
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
            var result = $.parseJSON(JSON.stringify(data.result));
//            console.info(JSON.stringify(data.result));

            $("#ganttChart").ganttView({
                data: data.result,
                slideWidth: 850,
                behavior: {
                    onClick: function (data) {
//                        console.log(data);
                        var msg = "You clicked on an event: { start: " + data.start.toString() + ", end: " + data.end.toString("M/d/yyyy") + " }";
                        $("#eventMessage").text(msg);
                    },
                    onResize: function (data) {

                        html5gantt.update(data.id, data.start, data.end, data.name);
                        var msg = "You resized an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
                        $("#eventMessage").text(msg);
                    },
                    onDrag: function (data) {
//                        console.log(data);
                        html5gantt.update(data.id, data.start, data.end, data.name);

                        var msg = "You dragged an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
                        $("#eventMessage").text(msg);
                    }
                }
            });
//            alert(resultArray);



        }

    });
};

html5gantt.plan = function (name) {

    var series = [];
    if (true) {
        series.push({name: "Planned", start: new Date(2010, 00, 05), end: new Date(2010, 00, 20)});
        series.push({name: "Actual", start: new Date(2010, 00, 06), end: new Date(2010, 00, 17), color: "#f0f0f0"});
        series.push({name: "Projected", start: new Date(2010, 00, 06), end: new Date(2010, 00, 17), color: "#e0e0e0"});
    }
    var d = new Date();
    var n = d.getTime();

    var SendInfo = {"Data": [{
                id: n, name: name, series:
                        series

            }]};
    console.log(JSON.stringify(SendInfo));

    $.ajax({
        url: url + 'save',
        type: 'post',
        data: JSON.stringify(SendInfo),
        headers: {
            "access_token": access_token,
            "Content-Type": content_type
        },
        dataType: 'json',
        success: function (data) {
//            $("#test_div").show();
            var result = $.parseJSON(JSON.stringify(data));
            console.info(JSON.stringify(result));
//            $("#test_div").html(JSON.stringify(result.description));
            html5gantt.showMessage('#9BED87', 'black', 'Plan added successfully.');
        },
        error: function (xhr, thrownError) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5gantt.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
//            alert(thrownError);
        }
    });
};

html5gantt.build = function (data) {
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
            html5gantt.showMessage('#9BED87', 'black', 'Random Plan added successfully');
        },
        error: function (xhr, thrownError) {
            alert("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            html5gantt.showMessage('#9BED87', 'black', 'Vote added successfully to ' + name + '.  <small>Click Vote Again to re-vote.</small>');
//            alert(thrownError);
        }
    });
};


html5gantt.update = function (identifier, start, end, datatype) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"Data": {"series.$.start": start, "series.$.end": end}, "filter": {"id": identifier, "series.name": datatype}, "type": "single"};
//    var SendInfo = {"Data": {"type": done}, "filter": {"identifier": identifier}, "type": "single"};
    console.log(JSON.stringify(SendInfo));
    $.ajax({
        url: url + 'update',
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
            html5gantt.showMessage('#9BED87', 'black', 'Plan updated successfully.');
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
//            alert(thrownError);
        }
    });
};

html5gantt.showMessage = function (bgcolor, color, msg) {
    if (!$('#smsg').is(':visible'))
    {
        $('html, body').animate({
            scrollTop: 0
        }, 500, function () {
            if (!$('#smsg').length)
            {
                $('<div id="smsg"><h1>' + msg + '</h1><br> <h3> data will be refreshed in 5 sec.</h3></div>').appendTo($('body')).css({
                    position: 'absolute',
                    top: 0,
                    left: 3,
                    width: '98%',
                    height: '200px',
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
                }, 3000);
                $(".btn-primary").addClass('disabled');
                $(".btn-warning").removeClass('disabled');
            }
        });
    }
};

html5gantt.remove = function (identifier) {

    ////alert(JSON.stringify(SendInfo)); 
//    var SendInfo = {"Data": [{"type": "completed", "todo": todo}]};
    var SendInfo = {"filter": {"id": identifier}, "type": "one"};
    $.ajax({
        url: url + 'delete',
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
            html5gantt.showMessage('#9BED87', 'black', 'Plan Item deleted successfully.');
//            var markup = '<li id="' + identifier + 'done">' + done + '<button class="btn btn-default btn-xs pull-right  remove-item"><span class="glyphicon glyphicon-remove"></span></button></li>';
//            $('#done-items').append(markup);
//            $('.remove').remove();

//                    done(doneItem);
//            countTodos();
        },
        error: function (xhr, thrownError) {
            console.info("readyState: " + xhr.readyState + "\nstatus: " + xhr.status + "\nresponseText: " + xhr.responseText);
            html5gantt.showMessage('#9BED87', 'black', 'Error while deleting the Item.');
//            alert(thrownError);
        }
    });
};


// jQuery Play
$(function () {


    html5gantt.dataResult();
//    $("#ganttChart").ganttView({
//        data: ganttData,
//        slideWidth: 600,
//        behavior: {
//            onClick: function (data) {
//                var msg = "You clicked on an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
//                $("#eventMessage").text(msg);
//            },
//            onResize: function (data) {
//                var msg = "You resized an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
//                $("#eventMessage").text(msg);
//            },
//            onDrag: function (data) {
//                var msg = "You dragged an event: { start: " + data.start.toString("M/d/yyyy") + ", end: " + data.end.toString("M/d/yyyy") + " }";
//                $("#eventMessage").text(msg);
//            }
//        }
//    });

    $('#again').click(function (e) {
//        e.preventDefault();
        html5gantt.build(ganttData);
        setTimeout(
                function ()
                {
                    $(".ganttview").remove();
                    html5gantt.dataResult();
                }, 3000);

        return false;
    });


    $('#plan').click(function (e) {
        e.preventDefault();
        var name = $('#planName').val();
        console.log(name);
        html5gantt.plan(name);
        setTimeout(
                function ()
                {
                    $(".btn").prop('value', 'Loading data Again ..');
                    $(".ganttview").remove();
                    html5gantt.dataResult();
                }, 3000);

        return false;
    });


//    $('.ganttview-vtheader-item-name').click(function () {
////        var usersid = $(this).attr("id");
//        console.log("-----------");
//        console.log($(this).text());
//        return true;
//        //post code
//    });
    $(".ganttview-vtheader-item").live('click', function (e) {
        e.preventDefault();
//        var contentId = "summary_" + $(this).attr('id');
        html5gantt.remove(parseInt($(this).attr('id')));
//        $(this).remove();
        setTimeout(
                function ()
                {
                    $(".ganttview").remove();
                    html5gantt.dataResult();
                }, 3000);
//        console.log("-----------" + contentId);
//        html5gantt.dataResult();

        return true;
    });

});

