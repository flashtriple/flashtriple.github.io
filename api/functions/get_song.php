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
    if($song['album']){
        $albumId = $song['album'];
        $album = getAlbum($conn, $albumId);
        $statement = $conn->prepare("SELECT img FROM albums WHERE id = $albumId");
        $statement->execute();
        $imgId = $statement->get_result();
        $imgId = $imgId->fetch_assoc();
        $imgId = $imgId['img'];
        $year = getYear($conn, $song['album']);
    } else {
        $imgId = $song['img'];
        $year = $song['year'];
        $album = 'Sin álbum';
    }
    $img = getImg($conn, $imgId);
    
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