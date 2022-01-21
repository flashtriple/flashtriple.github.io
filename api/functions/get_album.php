<?php
function getAlbum($conn, $id){
    $statement = $conn->prepare("SELECT name FROM albums WHERE id = $id");
    $statement->execute();
    $album = $statement->get_result();
    $album = $album->fetch_assoc();
    $album = $album['name'];
    return $album;
}
?>