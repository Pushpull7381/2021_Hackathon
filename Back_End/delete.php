
<?php
session_start();
include "connect.php";
$idx=$_POST['idx'];
$rand=$_POST['check'];
$result=mysqli_query($conn,"SELECT * FROM topic WHERE num ='{$idx}' and rand='{$rand}';");

$row=mysqli_fetch_array($result);

if($row['user_id']==$_SESSION['id'])
{
	$result=mysqli_query($conn,"DELETE FROM topic WHERE num='{$idx}';");
	echo "<script>alert(\"삭제되었습니다!\");</script>";
	echo "<script>location.href='community.html';</script>";
}
else {
	echo "<script>alert(\"삭제는 글쓴이만 가능합니다!\");</script>";
	echo "<script>window.history.back();</script>";

}
?>
