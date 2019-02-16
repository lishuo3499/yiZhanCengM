<?php


use think\Route;
Route::rule('demo','demo/Demos/demo');
Route::rule('get_code','demo/Demos/get_code');
Route::rule('valid_token','demo/Demos/valid_token');
Route::rule('user_ranks','demo/Demos/user_rank');

Route::rule('index','demo/Index/index');

Route::rule('question','demo/Index/question');

Route::rule('results','demo/Index/results');
Route::rule('problem_data','demo/Index/problem_data');
Route::rule('data_sort','demo/Index/data_sort');
Route::rule('save_score','demo/Index/save_score');
Route::rule('updata_class_score','demo/Index/updata_class_score');
Route::rule('difficult_problem','demo/Index/difficult_problem');





