<?php
require 'conn.php';
require 'header_json.php';
require 'functions/get_votation_id.php';

if($conn->connect_errno){
    $response = [
        'error' => true
    ];
} else {
    $conn->set_charset('utf8mb4');
    $votationId = getVotationId($conn);
    $statement = $conn->
    prepare("SELECT
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
    WHERE songs.id IN (SELECT song FROM nominations WHERE votation IN (SELECT $votationId FROM votations))");
    $statement->execute();
    $results = $statement->get_result();
    $nominees = [];
    while($nomination = $results->fetch_assoc()){
        array_push($nominees, $nomination);
    };
    $response = [
        'votationId' => $votationId,
        'nominees' => $nominees
    ];
};

echo json_encode($response)

?>