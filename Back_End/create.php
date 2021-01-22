<?php
session_start();
include 'connect.php';

if($_POST['title']==null) {
	echo "<script>alert(\"제목 조작은 나빠요!\");</script>";
	echo "<script>window.history.back();</script>";
}
if($_POST['description']==null) {
	echo "<script>alert(\"내용 조작은 나빠요!\");</script>";
	echo "<script>window.history.back();</script>";
}

$sql="
INSERT INTO topic
(title, description, created, user_id, nickname, rand)
VALUES(
	'{$_POST['title']}',
	'{$_POST['description']}',
	NOW(),
	'{$_POST['id']}',
	'{$_POST['nickname']}',
	CAST(RAND() * 10000 AS UNSIGNED)
)
";
$result=mysqli_query($conn, $sql);

if($result==false){
	echo '다시 써여!';
	error_log(mysqli_error($conn));
}

echo "<script>location.href='community.html';</script>";
?>

