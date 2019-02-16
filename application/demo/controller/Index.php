<?php
/**
 * Created by PhpStorm.
 * User: 78548_000
 * Date: 2018/4/8
 * Time: 10:42
 */

namespace app\demo\controller;

use think\Cache;
use  app\demo\model\Difficult;
use  app\demo\model\Easy;
use  app\demo\model\Question;
use  app\demo\model\Middle;
use app\demo\model\Score;
use  app\demo\model\User;
use \think\View;
use think\Request;
use think\Db;

class Index extends \think\Controller
{
    public function save_score()
    {
          dump($_GET);
          $user_name_id = $_GET['data'];
          $user_user_level =  $_GET['level'];
        $user_user_score =  $_GET['score'];
        dump($user_name_id);

             $user_score = Db::table('user')->where('yb_userid', $user_name_id)->find();
            dump(count($user_score));
            if ($user_score['score'] == -1){
                     Db::table('user')->where('yb_userid', $user_name_id)->update(['score' =>$user_user_score,'level'=>$user_user_level]);
                        // $this->redirect('http://127.0.0.1/yiZhanCengM/public/results');
           
            }else{
                $this->redirect('http://127.0.0.1/yiZhanCengM/public/results');
                dump('已经存在,跳转');
            }

     
//          Cache::set('data',var_dump($_GET));
//          dump(Cache::get('data'));
//        存分数，返回等级
//        $user_id = input('param.yb_userid');
//        $user_score = input('param.score');
//        $user_level = '皇帝';
//        $user_table_id = Db::table('user')->where('yb_userid', $user_id)->select()[0]['id'];
//        Db::table('score')->data(['user_id' => $user_table_id, 'score' => $user_score, 'level' => $user_level])->insert();
//        return $user_level;
    }


    public function problem_data()
    {
        // 题目数据
        $arr = [];
        for ($i = 0; $i < 10; $i++) {
            $data = Easy::get(rand(677, 1221));
            array_push($arr, $data);
            $unique_arr = array_unique($arr);
            if (count($unique_arr) >= 10) {
                break;
            }
        }
        for ($i = 0; $i < 10; $i++) {
            $data = Middle::get(rand(504, 854));
            array_push($arr, $data);
            $unique_arr = array_unique($arr);
            if (count($unique_arr) >= 20) {
                break;
            }
        }
        for ($i = 0; $i < 20; $i++) {
            $data = Difficult::get(rand(526, 961));
            array_push($arr, $data);
            $unique_arr = array_unique($arr);
            if (count($unique_arr) >= 40) {
                break;
            }
        }
        $user_cache_datas = Cache::get('user');
//        第一次加载的数据
        $first_data = array(
            'problem' => $arr
        , 'user' => $user_cache_datas);
        return json($first_data);
    }


 public function difficult_problem(){
     $arr = [];
     for ($i = 0; $i < 40; $i++) {
         $data = Difficult::get(rand(526, 961));
         array_push($arr, $data);
         $unique_arr = array_unique($arr);
         if (count($unique_arr) >= 40) {
             break;
         }
     }
     $user_cache_datas = Cache::get('user');
//        第一次加载的数据
     $first_data = array(
         'problem' => $arr
     , 'user' => $user_cache_datas);
     return json($first_data);
 }





//排序数据
    public function data_sort()
    {
        $user_data = Cache::get('user');
        $user_id = $user_data["yb_userid"];
        $user_college = $user_data["yb_collegename"];
        $user_class = $user_data["yb_classname"];
        $user_name = $user_data["yb_realname"];
//        所有班级
        $user = Db::table('user')->where('yb_classname', $user_class)->order('score desc')->select();
        $user_all_college = Db::table('user')->where('yb_collegename', $user_college)->order('score desc')->select();
        $user_all = Db::table('user')->order('score desc')->select();
        $this_user_score = Db::table('user')->where('yb_userid', $user_id)->select();
        $this_class_score = Db::table('rsnum')->where('bj', $user_class)->select();
//班级所有数据
        $user_all_rsnum = Db::table('rsnum')->order('score desc')->select();
        $user_all_college = Db::table('college')->order('score desc')->select();


        for ($w = 0; $w < count($user_all_rsnum); $w++) {
            if ($user_all_rsnum[$w]["bj"] == $user_class) {
                $class_in_all_sort = $w + 1;  //当前班级在全校的排名
            }
        }
        $class_first = $user_all_rsnum[0];
        $class_second = $user_all_rsnum[1];
        $class_third = $user_all_rsnum[2];
        $class_four = $user_all_rsnum[3];
        $class_five = $user_all_rsnum[4];
        $first_data_class = array(
            'first' => $class_first,
            'second' => $class_second,
            'third' => $class_third,
            'four' => $class_four,
            'five' => $class_five,
            'myclass_sort' => $class_in_all_sort,  //班级排名
            'my_class_score' => $this_class_score[0]['score'],  //班级分数
            'my_class_name' => $user_class
        );


//个人前五名和当前用户排名
        for ($z = 0; $z < count($user_all); $z++) {
            if ($user_all[$z]["yb_userid"] == (int)($user_id)) {
                $user_in_all_sort = $z + 1;  //当前用户在全校的排名
            }
        }
        $first = $user_all[0];
        $second = $user_all[1];
        $third = $user_all[2];
        $four = $user_all[3];
        $five = $user_all[4];
        $first_data_user = array(
            'first' => $first,
            'second' => $second,
            'third' => $third,
            'four' => $four,
            'five' => $five,
            'me' => $user_in_all_sort,
            'my_score' => $this_user_score[0]['score'],
            'my_name' => $user_name
        );

        //院系成绩
        for ($e = 0; $e < count($user_all_college); $e++) {
            if ($user_all_college[$e]["college"] == $user_college) {
                $college_in_all_sort = $e + 1;  //当前用户在全校的排名
            }
        }
        $my_college_score_data = Db::table('college')->where('college', $user_college)->select();
        // dump($my_college_score_data[0]['score']);
        $first_college = $user_all_college[0];
        $second_college = $user_all_college[1];
        $third_college = $user_all_college[2];
        $four_college = $user_all_college[3];
        $five_college = $user_all_college[4];
        $first_data_college = array(
            'first' => $first_college,
            'second' => $second_college,
            'third' => $third_college,
            'four' => $four_college,
            'five' => $five_college,
            'my_college_scort' => $college_in_all_sort,
            'my_college_score' => $my_college_score_data[0]['score'],
            'my_college_name' => $my_college_score_data[0]['college']
        );

        $return_all_data = array(
            'this_user_data' => $first_data_user,
            'this_class_data' => $first_data_class,
            'this_college_data' => $first_data_college
        );
        return json($return_all_data);
    }





    public function updata_class_score()
    {
//        更新班级数据
        $user_all = Db::table('rsnum')->select();
        for ($z = 0; $z < count($user_all); $z++) {
            $user_class = Db::table('user')->where('yb_classname', $user_all[$z]["bj"])->select();
            $all_score_class = 0;
            for ($x = 0; $x < count($user_class); $x++) {
                $all_score_class = $all_score_class + $user_class[$x]["score"];
            }
            Db::table('rsnum')->where('bj', $user_all[$z]["bj"])->update(['score' => $all_score_class]);
        }
//更新院系分数
        $college_all = Db::table('rsnum')->select();
        $college_data_result = 0;
        for ($c = 0; $c < count($college_all); $c++) {
//           dump($college_all[$c]['score']);
            $college_num = Db::table('college')->where('college', $college_all[$c]['yx'])->select();
            if (count($college_num) == 0) {
                Db::table('college')->data(['college' => $college_all[$c]['yx']])->insert();
            } else {
                $college_data = Db::table('rsnum')->where('yx', $college_all[$c]['yx'])->select();  #这个
//               $college_data_result =$college_data_result + $college_all[$c]['score'];
                // dump(count($college_data));
                $data_num = 0;
                for ($u = 0; $u < count($college_data); $u++) {
                    $data_num = $data_num + $college_data[$u]['score'];
                }
                $college_num_len = Db::table('rsnum')->where('yx', $college_all[$c]['yx'])->select();  //获取长度
                Db::table('college')->where('college', $college_all[$c]['yx'])->update(['score' => $data_num, 'len' => count($college_num_len)]);
            }


        }
        return 'zzz';
    }


//     页面函数
    public function index()
    {
        return $this->fetch('index');
    }

    public function question()
    {
        return $this->fetch('question');
    }

    public function results()
    {
        return $this->fetch('result');
    }
}


