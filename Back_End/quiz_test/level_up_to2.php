<?php
session_start();
include 'connect.php';
$id = $_SESSION['id'];
$score = $_POST['score'];

$query = "SELECT * FROM users WHERE id = '$id';";
$result = mysqli_query($conn, $query);
$users_data = mysqli_fetch_array($result);
if($users_data['level']>1){
include 'point_plus_600.php';     
	echo "<script>alert('회원님의 기존 레벨에는 변동이 없지만 600Point를 획득하셨습니다!');</script>";
    echo '<script>window.location.href="../home.html"</script>';
	die;
}
include 'point_plus_600.php';
$query = "UPDATE users SET level = 2 WHERE id = '$id';";

$result = mysqli_query($conn, $query);


$query = "INSERT INTO scorelog (id_score, score, level_score, created_score) VALUES('$id',$score, 2, NOW());";

$result = mysqli_query($conn, $query);
if($result == true){
echo "<script>alert('600Point를 획득하셨습니다!');</script>";
    echo '<script>window.location.href="../home.html"</script>';
}else{
    echo "<script>alert('Error');</script>";
    echo '<script>window.location.href="../home.html"</script>';
}
?>
