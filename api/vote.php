<?php
require 'conn.php';
require 'header_json.php';
require 'functions/get_votation_id.php';

if($conn->connect_errno){
    $response = [
        'error' => true
    ];
} else {
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        $data = json_decode(file_get_contents('php://input'));
        $ig = $data->ig === '' ? null : $data->ig;
        $phone = $data->phone === '' ? null : $data->phone;
        $song = $data->song;
        $conn->set_charset('utf8mb4');
        $votationId = getVotationId($conn);
        $voting = $conn->prepare("INSERT INTO votes(phone, ig, song) VALUES(?, ?, ?)");
        $voting->bind_param('isi', $phone, $ig, $song);
        $voting->execute();
        if($conn->affected_rows <= 0) {
            $response = [
                'status' => 500,
            ];
        } else {
            $response = [
                'status' => 200,
                'phone' => $phone,
                'rows' => $conn->affected_rows,
            ];
        }
    } else {
        $response = [
            'status' => 405,
        ];
    }
};

echo json_encode($response)

?>