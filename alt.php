<?php
/**
 * Created by PhpStorm.
 * User: jibba_000
 * Date: 07-11-2017
 * Time: 10:58
 */
?>
<?php

header("Access-Control-Allow-Origin: *");

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD']; // request method kan håndtere put, get og post
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

// connect to the mysql database
$link = mysqli_connect('localhost', 'root', 'root', 'world');
mysqli_set_charset($link,'utf8');

// retrieve the table and key from the path
$table = preg_replace('/[^a-z0-9_]+/i','',array_shift($request));
$key = array_shift($request);
//$key = "'" . $key . "'";

// build the SET part of the SQL command
$set = '';
for ($i=0;$i<count($columns);$i++) {
    $set .= ($i > 0 ? ',' : '') . '`' . $columns[$i] . '`=';
    $set .= ($values[$i] === null ? 'NULL' : '"' . $values[$i] . '"');
}

// create SQL based on HTTP method
if ($method == 'GET') {
            $sql = "select * from `$table`" . ($key ? " WHERE id=$key" : '');

}

// excecute SQL statement
$result = mysqli_query($link,$sql);
// die if SQL statement failed
if (!$result) {
    http_response_code(404);
    die(mysqli_error());
}

// print results, insert id or affected row count
if ($method == 'GET') {
    if (!$key) echo '[';
    for ($i=0;$i<mysqli_num_rows($result);$i++) {
        echo ($i>0?',':'').json_encode(mysqli_fetch_object($result));
    }
    if (!$key) echo ']';

}
// close mysql connection
mysqli_close($link);
