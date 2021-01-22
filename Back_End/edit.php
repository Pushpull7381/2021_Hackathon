
<?php
session_start();
include 'connect.php';

$idx=$_POST['idx'];
$no=$_POST['no'];
$rand=$_POST['check'];
$user_id=$_POST['user_id'];
$id_idx=$_POST['id_idx'];
$title=$_POST['title'];
$description=$_POST['description'];

$query = "UPDATE topic SET title='$title',description='$description', created=now() WHERE (num=$idx and rand=$rand)";
$result=mysqli_query($conn, $query);

echo "<script>location.href='community_reading.html?idx=$idx&check=$rand&no=$no';</script>";
 ?>

