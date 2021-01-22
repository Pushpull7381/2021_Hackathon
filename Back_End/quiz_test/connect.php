<?php
$db_host="localhost";
$db_user="root";
$db_password="Tak_0930!";
$db_name="meow";

$conn = mysqli_connect('localhost','root','Tak_0930!','meow');
$con = new mysqli($db_host, $db_user, $db_password, $db_name);
if ($con->connect_errno) { die('Connection Error : '.$con->connect_error);}
?>
