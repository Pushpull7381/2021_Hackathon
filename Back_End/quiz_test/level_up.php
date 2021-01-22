<?php
session_start();
include 'connect.php';
$id = $_SESSION['id'];
$query = "UPDATE users SET level = 2 WHERE id = '$id';";

$result = mysqli_query($conn, $query);
if($result == true){
    echo '<script>window.location.href="../home.html"</script>';
}else{
    echo "<script>alert('Error');</script>";
    echo '<script>window.location.href="../home.html"</script>';
}
?>
