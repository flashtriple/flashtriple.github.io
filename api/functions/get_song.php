<?php
require '../conn.php';
function getSong($conn, $id){
    $statement = $conn->prepare("SELECT
    songs.id,
    songs.name,
    songs.artist as artistId,
    artists.name as artist,
    albums.name as album,
    IF(albums.year, albums.year, songs.year) as year,
    imgs.url as img
    FROM songs 
    LEFT JOIN artists ON songs.artist = artists.id
    LEFT JOIN albums ON songs.album = albums.id
    LEFT JOIN imgs ON IF(songs.album, albums.img, songs.img) = imgs.id
    WHERE songs.id = $id");
    $statement->execute();
    $song = $statement->get_result();
    $song = $song->fetch_assoc();

    return $song;
}
?>