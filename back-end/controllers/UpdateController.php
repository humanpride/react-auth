<?php

require_once "../models/User.php";
require_once "../vendor/autoload.php";

use Lcobucci\JWT\Parser;

$input = file_get_contents('php://input');

$value = explode("=", $input);

$value[3] = filter_var(trim($value[3]), FILTER_SANITIZE_STRING);

$accessToken = (new Parser())->parse((string) $value[1]);

$userId = $accessToken->getClaim('uid');

$user = new User();
$user->setId($userId);

$user->loadUserData();

if ($value[2] == 'confirm') {
    // обновляется пароль
    $cryptedPass = password_hash($value[3], PASSWORD_BCRYPT);
    $user->updateUser(['password' => $cryptedPass]);
} else {
    // обновляется другое поле
    $user->updateUser([$value[2] => $value[3]]);
}

echo "Данные успешно обновлены";
