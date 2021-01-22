<?php
session_start();
include 'connect.php';
$cmt_idx=$_GET['cmt_idx'];
$read_num=$_GET['idx'];
$cmt_id=$_GET['cmt_id'];
if($_SESSION['id']==$cmt_id) {
	  $result=mysqli_query($conn, "delete from comment where cmt_num='{$cmt_idx}' and read_num='{$read_num}';");
	echo "<script>window.history.back();</script>";
}
else {
	  echo "<script>alert(\"삭제는 글쓴이만 가능합니다!\");</script>";
	    echo "<script>window.history.back();</script>";
}
 ?>
