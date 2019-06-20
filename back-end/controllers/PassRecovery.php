<?php

require_once "../models/User.php";

if (isset($_POST['login'])) {
    $login = filter_var(trim($_POST['login']), FILTER_SANITIZE_STRING);
    $loginType = preg_match("/@/", $login) ? 'Email' : 'Login';
    $user = new User();
    $set = "set$loginType";
    $user->$set($login);

    if ($user->loadUserData()) {
        echo 'ok';
    } else {
        echo 'user does not exist';
    }
}
