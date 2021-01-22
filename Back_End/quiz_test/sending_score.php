<?php
    session_start();
    include 'connect.php';
    $id = $_SESSION['id'];
    $score = (int)$_POST['score2'];
    $level = (int)$_POST['level'];
    $back_or_pass = (int)$_POST['retry_fin'];




    $query = "INSERT INTO scorelog (id_score, score, level_score, created_score) VALUES('$id', $score, $level, NOW());";

    $result = mysqli_query($conn, $query);
    if($result == true){
        if($back_or_pass == 1){
            //echo "<script>alert('Finish');</script>";
            echo '<script>window.location.href="../home.html"</script>';
        }elseif($back_or_pass == 0){
            //echo "<script>alert('Retry');</script>";
            if($level==1){
                echo '<script>window.location.href="level1_test.html"</script>';
            }elseif($level==2){
                echo '<script>window.location.href="level2_test.html"</script>';
            }else{
                echo '<script>window.location.href="level3_test.html"</script>';
            }
        }
    }else{
        echo "<script>alert('Error');</script>";
        echo '<script>window.location.href="../home.html"</script>';
    }
?>
