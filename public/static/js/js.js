jQuery(document).ready(function($) {


    
    var jsondata;
    var number=0;

    $.ajax({ 
        type: "GET",     
        url: "http://127.0.0.1/yiZhanCengM/public/problem_data",
        dataType: "json",
        async:false,
        success: function(data) {
            jsondata=data;
            console.log(jsondata)
        },
        error: function(jqXHR){     
           alert("发生错误：" + jqXHR.status);  
        },     
    });


    window.onload=function(){
        console.log(jsondata.user.yb_realname);
        $('.user_name').html(jsondata.user.yb_realname);
    }
    
    console.log(jsondata.problem[0].right.charCodeAt()-65);   //大写字母转换为数字


    var chance = 3;        //剩余机会控制
    var a=0;               //分数显示
    var b=0;               //是否摇一摇判断
    var f=0;
    var i=0;
    var j;
    var c=parseInt(10*Math.random());
    console.log(c);
//倒计时





    var sec ;
    // var interval=setInterval(countDown,1000);  
        function countDown() {  //倒计时的方法  
                 
            if(sec > -1) {  
                $('.num').html(sec); 
                sec--;
            } else {  
                chance--;
                $('.chances').html(chance);
                if(chance>=0){
                    clearInterval(interval);
                    begin();
                }
                else{
                    
                    clearInterval(interval);
                    if(b==0){
                    sec=8;
                    alert1();      
                    b++;
                    $('#alertFram1').click(function(){
                        if(c>5){
                            setTimeout(function(){
                                doOk();
                                alert4();
                                chance=chance+1;
                                $('.chances').html(chance);
                                setTimeout(function(){
                                    doOk();
                                    begin();
                                },2000);
                            },0);   
                        }
                        else{
                            sec=8;
                            doOk();
                            alert2();
                            setTimeout(function(){
                                doOk();
                                sec=8;
                                alert3()
                                
        $('#alertFram3 ul li').eq(0).html(a);
        $('#alertFram3 ul li').eq(1).html($('.level').html());
                                setTimeout(function(){
                                    doOk();
                                    var level = $(".level").html(),
                                    score = $(".red").html()
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://127.0.0.1/yiZhanCengM/public/save_score?data='+jsondata.user.yb_userid+"&level="+level+"&score="+score,
                                    data: {  },
                                    success: function (data) {
                                        if (data.res == 1) {
                                            alert("新增成功");
                                            $("#hidenbkg").css({ "display": "none" });
                                            $("#createmallshow").css({ "display": "none" });
                                        } else if (data.res == 0) {
                                            alert("MallID为：" + mallid + "商户已经存在，当前最大商户编号为：" + data.Id);
                                        } else if (data.res == 2) {
                                            alert(data.msg);
                                        };
                                    },
                                    dataType: "json",
                                  });

                                    location="http://127.0.0.1/yiZhanCengM/public/results";},2000);
                            },2000);
    
                        }
                    });    
                }
                else{
                    sec=8;
                    alert3();
                    
        $('#alertFram3 ul li').eq(0).html(a);
        $('#alertFram3 ul li').eq(1).html($('.level').html());
                    setTimeout(function(){
                        doOk();
                        location="";
                    },2000);
    
                } 

                }
                console.log(chance);
                }
        } 


// 成绩表格变换
    $('.rank_top a').click(function() {

        $('.rank_top a').removeClass('active');
        $(this).addClass('active');

    });

    //班级变换
    $('.rank_left').click(function() {

        $('.theader .tmid').html('班级名称');

    });

    //个人变换
    $('.rank_middle').click(function() {

        $('.theader .tmid').html('用户名称');
        
        $('.tmid1').html('123');

    });
    $('.rank_right').click(function() {

        $('.theader .tmid').html('院系名称');

    });





//弹窗部分
    $(function () {
        //单次单选弹框
        $("#onlyChoseAlert").click(function () {
            var onlyChoseAlert = simpleAlert({
                "content":"",
                "buttons":{
                    "123":function () {
                        location = "http://127.0.0.1/yiZhanCengM/public/results"; 
                    }
                }
            })
        })
    });

//加载题目
    function begin(){
        sec=8;
        number++;
        console.log(number);
        if (number>40){
            $.ajax({ 
                type: "GET",     
                url: "http://127.0.0.1/yiZhanCengM/public/difficult_problem",
                dataType: "json",
                async:false,
                success: function(data) {
                    jsondata=data;
                    console.log(jsondata)
                },
                error: function(jqXHR){     
                   alert("发生错误：" + jqXHR.status);  
                },     
            });
        }
        
        
    $('.leibie').html(jsondata.problem[i].type)
        interval=setInterval(countDown,1000);
        $('button')[0].classList.add("wrong_answer");
        $('button')[1].classList.add("wrong_answer");
        $('button')[2].classList.add("wrong_answer");
        $('button')[3].classList.add("wrong_answer");
        $('button')[0].style.background="url(./static/imgs/btn_bg1.png)";
        $('button')[0].style.backgroundSize="100% 100%";
        $('button')[1].style.background="url(./static/imgs/btn_bg1.png)";
        $('button')[1].style.backgroundSize="100% 100%";
        $('button')[2].style.background="url(./static/imgs/btn_bg1.png)";
        $('button')[2].style.backgroundSize="100% 100%";
        $('button')[3].style.background="url(./static/imgs/btn_bg1.png)";
        $('button')[3].style.backgroundSize="100% 100%";
        $('.question_content').html(jsondata.problem[i].title);
        $('.answer1').html(jsondata.problem[i].A);
        $('.answer2').html(jsondata.problem[i].B);
        $('.answer3').html(jsondata.problem[i].C);
        $('.answer4').html(jsondata.problem[i].D);
        $('button')[jsondata.problem[i].right.charCodeAt()-65].classList.add("right_answer");
        $('button')[jsondata.problem[i].right.charCodeAt()-65].classList.remove("wrong_answer");
        $("button").removeAttr("disabled");
        console.log(jsondata.problem[i].right);
        i++;
        j=i-1;
        f=jsondata.problem[j].score;
        console.log(f);
        if(f==1){
            $('.nandu').html('低难度')
            console.log('低难度')
            
        }
        else if(f==2){
            $('.nandu').html('中难度')
            console.log('中难度')
        }
        else if(f==3){
            $('.nandu').html('高难度')
            console.log('高难度')
        }
    };

begin();
    

//判断题目

$(function () {
    $('button').removeAttr("disabled"); 
    //正确
    // $("#testdiv ul").on("click","li", function()
    $('.answer').on("click",".right_answer",function(){
        clearInterval(interval);
        console.log(jsondata.problem[j].score);
        a=a+jsondata.problem[j].score;
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


        $('.red').html(a);
        document.getElementsByClassName('right_answer')[0].style.background="url(./static/imgs/right_answer.png)";
        document.getElementsByClassName('right_answer')[0].style.backgroundSize="100% 100%";
        $('button')[jsondata.problem[j].right.charCodeAt()-65].classList.remove("right_answer");
        $('button').attr("disabled","true");
        setTimeout(begin,2000);
    });
    //错误



    $('.answer').on("click",".wrong_answer",function(){
        console.log('zzzzzz')
        console.log($('.wrong_answer').length)
        clearInterval(interval);
        $(this)[0].style.background="url(./static/imgs/wrong_answer.png)";
        $(this)[0].style.backgroundSize="100% 100%";
        $('.right_answer')[0].style.background="url(./static/imgs/right_answer.png)";
        $('.right_answer')[0].style.backgroundSize="100% 100%";
        $('button').attr("disabled","true");
        chance--;
        $('button')[jsondata.problem[j].right.charCodeAt()-65].classList.remove("right_answer");
        $('button')[jsondata.problem[j].right.charCodeAt()-65].classList.add("wrong_answer");
        if(chance>=0){
            
        $('.chances').html(chance);
            setTimeout(begin,2000); 

        }else{  
            if(b==0){
                sec=8;
                alert1();      
                b++;
                $('#alertFram1').click(function(){

                    if(c>0){

                        setTimeout(function(){
                            doOk();
                            alert4();
                            chance=chance+1;
                            $('.chances').html(chance);
                            setTimeout(function(){
                                doOk();
                                begin();
                            },2000);
                        },0);   
                    }
                    else{
                        sec=8;
                        doOk();
                        alert2();
                        setTimeout(function(){
                            doOk();
                            sec=8;
                            alert3()
                            
        $('#alertFram3 ul li').eq(0).html(a);
        $('#alertFram3 ul li').eq(1).html($('.level').html());
                            setTimeout(function(){

                                var level = $(".level").html(),
                                    score = $(".red").html()
                                    alert(jsondata.user.yb_userid)
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://127.0.0.1/yiZhanCengM/public/save_score?data='+jsondata.user.yb_userid+"&level="+level+"&score="+score,
                                    data: {  },
                                    success: function (data) {
                                        if (data.res == 1) {
                                            alert("新增成功");
                                            $("#hidenbkg").css({ "display": "none" });
                                            $("#createmallshow").css({ "display": "none" });
                                        } else if (data.res == 0) {
                                            alert("MallID为：" + mallid + "商户已经存在，当前最大商户编号为：" + data.Id);
                                        } else if (data.res == 2) {
                                            alert(data.msg);
                                        };
                                    },
                                    dataType: "json",
                                  });

                                doOk();
                                location = 'http://127.0.0.1/yiZhanCengM/public/results'},2000);
                        },2000);

                    }
                });    
            }
            else{
                sec=8;
                alert3();
                
        $('#alertFram3 ul li').eq(0).html(a);   
        $('#alertFram3 ul li').eq(1).html($('.level').html());
        //答题完成跳转
                setTimeout(function(){
                    doOk();

                    var level = $(".level").html(),
                        score = $(".red").html()
       
                                $.ajax({
                                    type: 'GET',
                                    url: 'http://127.0.0.1/yiZhanCengM/public/save_score?data='+jsondata.user.yb_userid+"&level="+level+"&score="+score,
                                    data: {  },
                                    success: function (data) {
                                        if (data.res == 1) {
                                            alert("新增成功");
                                            $("#hidenbkg").css({ "display": "none" });
                                            $("#createmallshow").css({ "display": "none" });
                                        } else if (data.res == 0) {
                                            alert("MallID为：" + mallid + "商户已经存在，当前最大商户编号为：" + data.Id);
                                        } else if (data.res == 2) {
                                            alert(data.msg);
                                        };
                                    },
                                    dataType: "json",
                                  });

                    location="http://127.0.0.1/yiZhanCengM/public/results";
                },2000);

            } 

        

        }
        
    });})
});

      
// setTimeout(function(){

//     doOk();
//     alert2();

//     setTimeout(function(){

//         doOk();
//         alert3();

//         setTimeout(function(){

//             doOk();
//             location="result.html";

//         },2000)

//     },2000)

// },2000);   

//判断是否摇一摇
// if(chance<0){
//     var a=0;
//     if(a=0){alert(123);a++;
//     }else{
//         location="result.html";
//     }
    
// }



//自定义弹窗1
window.alert1 = function(str)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "50%";
    shield.style.top = "50%";
    shield.style.width = "280px";
    shield.style.height = "150px";
    shield.style.marginLeft = "-140px";
    shield.style.marginTop = "-110px";
    shield.style.zIndex = "25";
    var alertFram1 = document.createElement("DIV");
    alertFram1.id="alertFram1";
    alertFram1.style.position = "absolute";
    alertFram1.style.width = "280px";
    alertFram1.style.height = "150px";
    alertFram1.style.left = "50%";
    alertFram1.style.top = "50%";
    alertFram1.style.marginLeft = "-140px";
    alertFram1.style.marginTop = "-110px";
    alertFram1.style.textAlign = "center";
    alertFram1.style.lineHeight = "150px";
    alertFram1.style.zIndex = "300";

    document.body.appendChild(alertFram1);
    document.body.appendChild(shield);
    this.doOk = function(){
        alertFram1.style.display = "none";
        shield.style.display = "none";
    }
    alertFram1.focus();
    document.body.onselectstart = function(){return false;};
}
//自定义弹窗2
window.alert2 = function(str)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "50%";
    shield.style.top = "50%";
    shield.style.width = "280px";
    shield.style.height = "150px";
    shield.style.marginLeft = "-140px";
    shield.style.marginTop = "-110px";
    shield.style.zIndex = "25";
    var alertFram2 = document.createElement("DIV");
    alertFram2.id="alertFram2";
    alertFram2.style.position = "absolute";
    alertFram2.style.width = "280px";
    alertFram2.style.height = "150px";
    alertFram2.style.left = "50%";
    alertFram2.style.top = "50%";
    alertFram2.style.marginLeft = "-140px";
    alertFram2.style.marginTop = "-110px";
    alertFram2.style.textAlign = "center";
    alertFram2.style.lineHeight = "150px";
    alertFram2.style.zIndex = "300";
    document.body.appendChild(alertFram2);
    document.body.appendChild(shield);
    this.doOk = function(){
        alertFram2.style.display = "none";
        shield.style.display = "none";
    }
    alertFram2.focus();
    document.body.onselectstart = function(){return false;};
}
//自定义弹窗3
window.alert3 = function(str)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "50%";
    shield.style.top = "50%";
    shield.style.width = "280px";
    shield.style.height = "150px";
    shield.style.marginLeft = "-140px";
    shield.style.marginTop = "-110px";
    shield.style.zIndex = "25";
    var alertFram3 = document.createElement("DIV");
    alertFram3.id="alertFram3";
    alertFram3.style.position = "absolute";
    alertFram3.style.width = "280px";
    alertFram3.style.height = "150px";
    alertFram3.style.left = "50%";
    alertFram3.style.top = "50%";
    alertFram3.style.marginLeft = "-140px";
    alertFram3.style.marginTop = "-110px";
    alertFram3.style.textAlign = "center";
    alertFram3.style.lineHeight = "150px";
    alertFram3.style.zIndex = "300";
    strHtml = "<ul style=\"list-style:none;margin:0px;padding:0px;width:100%\">\n";
    strHtml += " <li style=\"background:none;\" class=\"alert_score;\"></li>\n";
    strHtml += " <li style=\"background:none;\" class=\"alert_level;\"></li>\n";
    strHtml += "</ul>\n";
    alertFram3.innerHTML = strHtml;
    document.body.appendChild(alertFram3);
    document.body.appendChild(shield);
    this.doOk = function(){
        alertFram3.style.display = "none";
        shield.style.display = "none";
    }
    alertFram3.focus();
    document.body.onselectstart = function(){return false;};
}

//自定义弹窗4
window.alert4 = function(str)
{
    var shield = document.createElement("DIV");
    shield.id = "shield";
    shield.style.position = "absolute";
    shield.style.left = "50%";
    shield.style.top = "50%";
    shield.style.width = "280px";
    shield.style.height = "150px";
    shield.style.marginLeft = "-140px";
    shield.style.marginTop = "-110px";
    shield.style.zIndex = "25";
    var alertFram4 = document.createElement("DIV");
    alertFram4.id="alertFram4";
    alertFram4.style.position = "absolute";
    alertFram4.style.width = "280px";
    alertFram4.style.height = "150px";
    alertFram4.style.left = "50%";
    alertFram4.style.top = "50%";
    alertFram4.style.marginLeft = "-140px";
    alertFram4.style.marginTop = "-110px";
    alertFram4.style.textAlign = "center";
    alertFram4.style.lineHeight = "150px";
    alertFram4.style.zIndex = "300";
    document.body.appendChild(alertFram4);
    document.body.appendChild(shield);
    this.doOk = function(){
        alertFram4.style.display = "none";
        shield.style.display = "none";
    }
    alertFram4.focus();
    document.body.onselectstart = function(){return false;};
    
}
