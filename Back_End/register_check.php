
<?php
session_start();
include 'connect.php';

if($conn->connect_error) {
			  die('서버 비상비상비상!');
}
$input_id=$_POST['ID'];
$input_pw=$_POST['pw'];
$input_pw_check=$_POST['pw_check'];
$input_name=$_POST['name'];
$input_nickname=$_POST['nickName'];
$input_email=$_POST['Email'];
if($input_pw!=$input_pw_check){
	echo "<script>alert(\"비밀번호가 일치하지 않습니다!\");</script>";
	echo "<script>location.replace('join.html');</script>";
}
if($input_id==null) {
			  echo "<script>alert(\"ID 입력 부탁드려요!\");</script>";
			  echo "<script>window.history.back();</script>";
}
if($input_pw==null) {
			  echo "<script>alert(\"비밀번호 입력 부탁드려요!\");</script>";
			  echo "<script>location.replace('join.html');</script>";
}
if($input_name==null) {
			  echo "<script>alert(\"이름 입력 부탁드려요!\");</script>";
			  		  	    echo "<script>location.replace('join.html');</script>";
}
if($input_nickname==null) {
			  echo "<script>alert(\"별명 입력 부탁드려요!\");</script>";
			  		  	    echo "<script>location.replace('join.html');</script>";
}
if($input_email==null) {
			  echo "<script>alert(\"자기소개 입력 부탁드려요!\");</script>";
			  		  	    echo "<script>location.replace('join.html');</script>";
}


$result=mysqli_query($conn,"select id from users;");

while($row = mysqli_fetch_array($result)){
			if($row['id']==$input_id){
							echo "<script>alert(\"이미사용중인 아이디입니다ㅠㅡㅠ\")</script>";
										echo "<script>window.history.back();</script>";
										die;
																}
}
$sql="INSERT INTO users(id, name, nickname, pw, email) VALUES('{$input_id}', '{$input_name}', '{$input_nickname}', '{$input_pw}', '{$input_email}')";
$result=mysqli_query($conn, $sql);

echo "<script>alert(\"회원가입에 성공하셨어요~!~!~!\");</script>";
  echo "<script>location.href='join.html';</script>";


?>

