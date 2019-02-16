jQuery(document).ready(function($) {
    var a;

    var resultdata;
    
    $.ajax({ 
        type: "GET",     
        url: "http://127.0.0.1/yiZhanCengM/public/data_sort",
        dataType: "json",
        async:false,
        success: function(data) {
            resultdata=data;
        },
        error: function(jqXHR){    
            alert('错误') 
        //    alert("发生zzzz：" + jqXHR.status);  
        },     
    });
    
    console.log(resultdata);

    window.onload=function(){
        a=resultdata.this_user_data.my_score;
        console.log(a);
        if(a<=3){
            $('.level').html('白丁')
        }
        else if(a>=a&&a<=6){
            $('.level').html('童生')
        }
        else if(a>=7&&a<=9){
            $('.level').html('秀才')
        }
        else if(a>=10&&a<=13){
            $('.level').html('举人')
        }
        else if(a>=14&&a<=22){
            $('.level').html('贡士')
        }
        else if(a>=23&&a<=33){
            $('.level').html('进士')
        }
        else if(a>=34&&a<=44){
            $('.level').html('榜眼')
        }
        else if(a>=45&&a<=61){
            $('.level').html('探花')
        }
        else if(a>=62){
            $('.level').html('状元')
        }
        $('.user_name').html(resultdata.this_user_data.my_name);
        $('.user_1').html(resultdata.this_user_data.first.yb_realname);
        $('.user_2').html(resultdata.this_user_data.second.yb_realname);
        $('.user_3').html(resultdata.this_user_data.third.yb_realname);
        $('.user_4').html(resultdata.this_user_data.four.yb_realname);
        $('.user_5').html(resultdata.this_user_data.five.yb_realname);
        $('.user_6').html(resultdata.this_user_data.my_name);
        $('.score_1').html(resultdata.this_user_data.first.score);
        $('.score_2').html(resultdata.this_user_data.second.score);
        $('.score_3').html(resultdata.this_user_data.third.score);
        $('.score_4').html(resultdata.this_user_data.four.score);
        $('.score_5').html(resultdata.this_user_data.five.score);
        $('.score_6').html(resultdata.this_user_data.my_score);
        $('.end .tleft p').html(resultdata.this_user_data.me);
        
    };

// 成绩表格变换
    $('.rank_top a').click(function() {

        $('.rank_top a').removeClass('active');
        $(this).addClass('active');

    });
    $('.rank_left').click(function() {

        $('.theader .tmid').html('班级名称');
        $('.user_1').html(resultdata.this_class_data.first.bj);
        $('.user_2').html(resultdata.this_class_data.second.bj);
        $('.user_3').html(resultdata.this_class_data.third.bj);
        $('.user_4').html(resultdata.this_class_data.four.bj);
        $('.user_5').html(resultdata.this_class_data.five.bj);
        $('.user_6').html(resultdata.this_class_data.my_class_name);
        $('.score_1').html(resultdata.this_class_data.first.score);
        $('.score_2').html(resultdata.this_class_data.second.score);
        $('.score_3').html(resultdata.this_class_data.third.score);
        $('.score_4').html(resultdata.this_class_data.four.score);
        $('.score_5').html(resultdata.this_class_data.five.score);
        $('.score_6').html(resultdata.this_class_data.my_class_score);
        $('.end .tleft p').html(resultdata.this_class_data.myclass_sort);

    });
    $('.rank_middle').click(function() {

        $('.theader .tmid').html('用户名称');
        $('.user_1').html(resultdata.this_user_data.first.yb_realname);
        $('.user_2').html(resultdata.this_user_data.second.yb_realname);
        $('.user_3').html(resultdata.this_user_data.third.yb_realname);
        $('.user_4').html(resultdata.this_user_data.four.yb_realname);
        $('.user_5').html(resultdata.this_user_data.five.yb_realname);
        $('.user_6').html(resultdata.this_user_data.my_name);
        $('.score_1').html(resultdata.this_user_data.first.score);
        $('.score_2').html(resultdata.this_user_data.second.score);
        $('.score_3').html(resultdata.this_user_data.third.score);
        $('.score_4').html(resultdata.this_user_data.four.score);
        $('.score_5').html(resultdata.this_user_data.five.score);
        $('.score_6').html(resultdata.this_user_data.my_score);
        $('.end .tleft p').html(resultdata.this_user_data.me);

    });
    $('.rank_right').click(function() {

        $('.theader .tmid').html('院系名称');
        $('.user_1').html(resultdata.this_college_data.first.college);
        $('.user_2').html(resultdata.this_college_data.second.college);
        $('.user_3').html(resultdata.this_college_data.third.college);
        $('.user_4').html(resultdata.this_college_data.four.college);
        $('.user_5').html(resultdata.this_college_data.five.college);
        $('.user_6').html(resultdata.this_college_data.my_college_name);
        $('.score_1').html(resultdata.this_college_data.first.score);
        $('.score_2').html(resultdata.this_college_data.second.score);
        $('.score_3').html(resultdata.this_college_data.third.score);
        $('.score_4').html(resultdata.this_college_data.four.score);
        $('.score_5').html(resultdata.this_college_data.five.score);
        $('.score_6').html(resultdata.this_college_data.my_college_score);
        $('.end .tleft p').html(resultdata.this_college_data.my_college_scort);

    });



});
