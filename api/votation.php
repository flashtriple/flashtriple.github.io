<?php
require 'conn.php';
require 'header_json.php';
require 'functions/get_votation_id.php';
require 'functions/get_song.php';

if($conn->connect_errno){
    $response = [
        'error' => true
    ];
} else {
    $conn->set_charset('utf8mb4');
    $votationId = getVotationId($conn);
    $statement = $conn->prepare("SELECT * FROM nominations WHERE votation = $votationId");
    $statement->execute();
    $results = $statement->get_result();
    
    $nominees = [];
    while($row = $results->fetch_assoc()){
        $nomination = getSong($conn, $row['song']);
        array_push($nominees, $nomination);
    };
    $response = [
        'votationId' => $votationId,
        'nominees' => $nominees
    ];
};

echo json_encode($response)

?>