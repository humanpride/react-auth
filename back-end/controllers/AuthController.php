<?php

require_once "../models/User.php";
require_once "../vendor/autoload.php";

use Lcobucci\JWT\Builder;
use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

$config = parse_ini_file('../../config.ini');

$signer = new Sha256();

$accessKey = new Key($config['ACCESS_KEY']);
$refreshKey = new Key($config['REFRESH_KEY']);

$data = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)

function createTokens($signer, $accessKey, $refreshKey, $userId)
{
    $time = time();
    $accessToken = (new Builder())->issuedBy('localhost') // Configures the issuer (iss claim)
                            ->issuedAt($time) // Configures the time that the token was issue (iat claim)
                            ->expiresAt($time + 60*60*24) // Configures the expiration time of the token (exp claim)
                            ->withClaim('uid', $userId) // Configures a new claim, called "uid"
                            ->getToken($signer, $accessKey); // Retrieves the generated token
    
    $result = $accessToken;
    
    $refreshToken = (new Builder())->issuedBy('localhost')
                            ->issuedAt($time)
                            ->expiresAt($time + 60*60*24*30*6)
                            ->getToken($signer, $refreshKey);

    //setcookie('refreshToken', $refreshToken, 0, '/');
    $result .= ' && '.$refreshToken;

    return $result;
}

if (isset($_POST['signedIn'])) {
    if (isset($_POST['accessToken'])) {
        $accessToken = (new Parser())->parse((string) $_POST['accessToken']);
        if ($accessToken->verify($signer, $accessKey)) {
            // проверка, истекло ли время жизни accessToken
            if ($accessToken->validate($data)) {
                echo "token is valid";
            } else {
                // если истекло, запрос refreshToken
                echo "token expired";
            }
        } else {
            echo "guest";
        }
    } else if (isset($_POST['refreshToken'])) {
        $refreshToken = (new Parser())->parse((string) $_POST['refreshToken']);
        if ($refreshToken->verify($signer, $refreshKey)) {
            if ($refreshToken->validate($data)) {
                // если refreshToken подписан и не истекло время жизни, создать новую пару токенов
                echo createTokens($signer, $accessKey, $refreshKey, $accessToken->getClaim('uid'));
            } else {
                echo "guest";
            }
        } else {
            echo "guest";
        }
    } else {
        echo "guest";
    }
} else {
    $login = filter_var(trim($_POST["login"]), FILTER_SANITIZE_STRING);
    $password = filter_var(trim($_POST["password"]), FILTER_SANITIZE_STRING);

    $loginType = preg_match("/@/", $login) ? 'Email' : 'Login';

    $user = new User();

    $set = "set$loginType";

    $user->$set($login); 

    if ($user->loadUserData()) {
        if (password_verify($password, $user->getPassword())) {
            echo createTokens($signer, $accessKey, $refreshKey, $user->getId());
        } else {
            echo "denied";
        }
    } else {
        echo "denied";
    }
}
