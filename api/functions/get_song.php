<?php
require 'get_album.php';
require 'get_year.php';
require 'get_artist.php';
require 'get_img.php';
function getSong($conn, $id){
    $statement = $conn->prepare("SELECT * FROM songs WHERE id = $id");
    $statement->execute();
    $song = $statement->get_result();
    $song = $song->fetch_assoc();
    $songName = $song['name'];
    $artist = getArtist($conn, $song['artist']);
    $album = getAlbum($conn, $song['album']);
    if($album != null){
        $img = $song['album'];
        $year = getYear($conn, $song['album']);
    } else {
        $img = $song['img'];
        $year = $song['year'];
    }
    $response = [
        'id' => $id,
        'name' => $songName,
        'artist' => $artist,
        'album' => $album,
        'year' => $year,
        'img' => $img,
    ];
    return $response;
}
?>