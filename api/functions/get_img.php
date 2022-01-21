<?php
function getImg($conn, $id){
    $statement = $conn->prepare("SELECT img FROM songs WHERE id = $id");
    $statement->execute();
    $img = $statement->get_result();
    $img = $img->fetch_assoc();
    $img = $img['img'];
    return $img;
}
?>