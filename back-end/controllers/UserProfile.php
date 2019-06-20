<?php

require_once "../models/User.php";
require_once "../vendor/autoload.php";

use Lcobucci\JWT\Signer\Key;
use Lcobucci\JWT\Signer\Hmac\Sha256;
use Lcobucci\JWT\Parser;
use Lcobucci\JWT\ValidationData;

$config = parse_ini_file('../../config.ini');

$signer = new Sha256();

$accessKey = new Key($config['ACCESS_KEY']);
$refreshKey = new Key($config['REFRESH_KEY']);

function returnXmlData($userId)
{
    $user = new User();
    $user->setId($userId);
    $user->loadUserData();

    $xml = new SimpleXMLElement("<?xml version='1.0' standalone='yes' ?><user></user>");

    $xml->addChild('name', $user->getName());
    $xml->addChild('login', $user->getLogin());
    $xml->addChild('email', $user->getEmail());
    $xml->addChild('phone', $user->getPhone());
    $xml->addChild('address', $user->getAddress());
    $xml->addChild('city', $user->getCity());

    $xmlString = $xml->asXML();

    echo $xmlString;
}

if (isset($_POST['accessToken'])) {
    $accessToken = (new Parser())->parse((string) $_POST['accessToken']);
    if ($accessToken->verify($signer, $accessKey)) {
        $data = new ValidationData(); // It will use the current time to validate (iat, nbf and exp)

        if ($accessToken->validate($data)) {
            // время жизни не истекло
            returnXmlData($accessToken->getClaim('uid'));

        } else {
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
