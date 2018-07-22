<?php

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$servername = "localhost";
$username="root";
$password="jorge";

$database="drawvote";
$option=$_REQUEST['option'];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


switch($option){
    case "getArtistas":
        //echo "getNumberGa";
        $sql = "SELECT name FROM artistas";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
            $json[]=  $row["name"];
            }
        } else {
            echo "0 results";
        }
        //$json["artistas"] = $data;
        echo (json_encode($json));
        break;
}

$conn->close();

?>