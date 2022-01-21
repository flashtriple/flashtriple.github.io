<?php
function getArtist($conn, $id){
    $statement = $conn->prepare("SELECT name FROM artists WHERE id = $id");
    $statement->execute();
    $artist = $statement->get_result();
    $artist = $artist->fetch_assoc();
    $artist = $artist['name'];
    return $artist;
}
?>