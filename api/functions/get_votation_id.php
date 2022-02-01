<?php
function getVotationId($conn){
    $statement = $conn->prepare('SELECT MAX(id) as id FROM votations WHERE active = 1');
    $statement->execute();
    $result = $statement->get_result();
    $result = $result->fetch_assoc();
    $result = $result['id'];
    return $result;
}
?>