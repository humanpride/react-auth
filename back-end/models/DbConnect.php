<?php

class DbConnect
{
    private $mysql;

    function __construct()
    {
        $config = parse_ini_file('../../config.ini');
        
        $this->mysql = new mysqli($config['DB_HOST'], $config['DB_USER'], $config['DB_PASS'], $config['DB_NAME']);
        $this->mysql->set_charset($config['CHARSET']);

        if ($this->mysql->connect_errno) {
            printf("При подключении к БД возникла ошибка: %s", $this->mysql->connect_error);
            exit();
        }
    }

    public function query(string $query)
    {
        return $this->mysql->query($query);
    }

    public function close()
    {
        $this->mysql->close();
    }
}
