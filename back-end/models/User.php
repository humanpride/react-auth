<?php

require_once "DbConnect.php";

class User
{
    private $id = '';
    private $email;
    private $login = '';
    private $password;
    private $name;
    private $phone;
    private $address;
    private $city;
    private $created;
    private $updated;
    private $table = 'db_mdd_users';

    function __construct(
      string $email = '',
      string $password = '',
      string $name = '',
      string $phone = '',
      string $address = '',
      string $city = ''
      )
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->phone = $phone;
        $this->address = $address;
        $this->city = $city;
        $this->created = date('Y-m-d H:i:s');
        $this->updated = $this->created;

        // автоматическое добавление полей в БД на основе свойств класса
        $dbConnect = new DbConnect();
        $table = $this->table;
        $existedCol = $dbConnect->query("DESCRIBE $table");
        $columns = [];
        for ($i = 0; $i < $existedCol->num_rows; $i++) {
            $row = $existedCol->fetch_assoc();
            $columns[] = $row['Field'];
        }
        foreach ($this as $key => $value) {
            if ($key != 'table' && !in_array($key, $columns)) {
                $dbConnect->query("ALTER TABLE $table ADD $key VARCHAR(255)");
            }
        }
    }

    // Сеттеры  -----------------------------------------

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function setPassword(string $password)
    {
        $this->password = $password;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function setPhone(string $phone)
    {
        $this->phone = $phone;
    }

    public function setAddress(string $address)
    {
        $this->address = $address;
    }

    public function setCity(string $city)
    {
        $this->city = $city;
    }

    public function setUpdated(string $date)
    {
        $this->updated = $date;
    }

    public function setLogin(string $login)
    {
        $this->login = $login;
    }

    //---------------------------------------------------

    // Геттеры  -----------------------------------------

    public function getId()
    {
        return $this->id;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getPhone()
    {
        return $this->phone;
    }

    public function getAddress()
    {
        return $this->address;
    }

    public function getCity()
    {
        return $this->city;
    }

    public function getUpdated()
    {
        return $this->updated;
    }

    public function getLogin()
    {
        return $this->login;
    }

    //---------------------------------------------------

    public function createUser()
    {
        $dbConnect = new DbConnect();

        if ($this->exists()) {
            return "Дубликат";
        }

        $fieldNames = '';
        $values = '';
        foreach ($this as $key => $value) {
            if ($key == 'id' || $key == 'table') {
                continue;
            }
            $fieldNames .= $key.",";
            $values .= "'$value',";
        }
        $fieldNames = trim($fieldNames, ',');
        $values = trim($values, ',');

        $dbConnect->query("INSERT INTO {$this->table} ($fieldNames) VALUES ($values)");

        $dbConnect->close();

        return 'Успешная регистрация';
    }

    public function loadUserData()
    {
        $dbConnect = new DbConnect();

        if ($this->id != '') {
            $column = "id='{$this->id}'";
        } else if ($this->email != '') {
            $column = "email='{$this->email}'";
        } else if ($this->login != '') {
            $column = "login='{$this->login}'";
        } else {
            return false;
        }
        
        $userRow = $dbConnect->query("SELECT * FROM {$this->table} WHERE $column");

        if ($userRow->num_rows == 0) {
            return false;
        }

        $userData = $userRow->fetch_assoc();

        foreach ($userData as $key => $value) {
            $this->$key = $value;
        }

        $dbConnect->close();

        return true;
    }

    public function updateUser(array $updating)
    // updating - ассоциативный массив, где ключ - поле в БД
    {
        $dbConnect = new DbConnect();

        $values = '';
        foreach ($updating as $key => $value) {
            if ($key != 'id' && property_exists($this, $key)) {
                $values .= "$key='$value',";
            }
        }
        $values = trim($values, ',');

        $dbConnect->query("UPDATE {$this->table} SET $values WHERE email='{$this->email}'");

        $dbConnect->close();
    }

    public function deleteUser()
    {
        $dbConnect = new DbConnect();

        $dbConnect->query("DELETE FROM {$this->table} WHERE email='{$this->email}'");
        
        $this->clear();

        $dbConnect->close();
    }

    public function clear()
    {
        foreach ($this as $key => $value) {
          if ($key != 'table') {
            $this->$key = '';
          }
        }
    }

    public function exportXML()
    // метод для экспорта всех данных юзера из БД
    {
        $xml = new SimpleXMLElement("<?xml version='1.0' standalone='yes' ?><user></user>");
        foreach ($this as $key => $value) {
            $xml->addChild($key, $value);
        }
        $xmlString = $xml->asXML();

        return $xmlString;
    }

    public function exists()
    {
        $dbConnect = new DbConnect();
        $result = $dbConnect->query("SELECT * FROM {$this->table} WHERE email='{$this->email}'");
        if ($result->num_rows == 0) {
            return false;
        }
        return true;
    }
}