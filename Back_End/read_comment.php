<?php
ob_start();
session_start();
include "connect.php";
$idx=$_POST['idx'];
$no=$_POST['no'];
$rand=$_POST['check'];
$user_id=$_SESSION['id'];
$result=mysqli_query($conn, "select * from users where id='{$user_id}';");
$row=mysqli_fetch_array($result);
$name=$row['nickname'];
$comment=$_POST['comment'];
$write_time=date("Y-m-d H:i:s");
$sql="
  INSERT INTO comment (cmt_id, cmt_name, cmt_description, cmt_created, read_num) VALUES('{$user_id}','{$name}','{$comment}','{$write_time}','{$idx}');";
$result=mysqli_query($conn, $sql);
$result=mysqli_query($conn, "select * from comment where read_num='{$idx}';");
$row=mysqli_fetch_array($result);

if($result!=false){
echo "<script>location.href='community_reading.html?idx=$idx&check=$rand&no=$no';</script>";
}
?>
