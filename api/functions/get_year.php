<?php
function getYear($conn, $id){
    $statement = $conn->prepare("SELECT year FROM albums WHERE id = $id");
    $statement->execute();
    $year = $statement->get_result();
    $year = $year->fetch_assoc();
    $year = $year['year'];
    return $year;
}
?>