<?php
include 'connect.php';

$sql="UPDATE users SET point = point + 10 WHERE id = '{$_SESSION['id']}';";
        $result=mysqli_query($conn, $sql);
if($result==false){
                  echo '점수오류!';
                  error_log(mysqli_error($conn));
}
                   ?>
