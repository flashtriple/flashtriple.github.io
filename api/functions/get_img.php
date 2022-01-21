<?php
function getImg($conn, $id){
    $statement = $conn->prepare("SELECT url FROM imgs WHERE id = $id");
    $statement->execute();
    $img = $statement->get_result();
    $img = $img->fetch_assoc();
    $img = $img['url'];
    return $img;
}
?>