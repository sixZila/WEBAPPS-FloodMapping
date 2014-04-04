<?php
$table = "entries";
$longitude;
$latitude;

function connecToDatabase(){
	$host = "localhost";
	$username = "root";
	$password = "p@ssword";
	$database = "flood_reports";
	
	mysql_connect("$host", "$username", "$password") or die(mysql_error());

	mysql_select_db("$database") or die(mysql_error());
}

function addEntry(){

global $table, $longitude, $latitude;
translateAddress();
connecToDatabase();

$level = $_POST['level'];
$location = $_POST['location'];
$date = date('Y-m-d H:i:s');

if (file_exists("Assets/floodImages/" . $_FILES["image"]["name"])){

   echo $_FILES["image"]["name"] . " already exists. ";

}
else{

    $file = $_FILES["image"]["name"];
    $filePath = "Assets/floodImages/" . $file;
    if(move_uploaded_file($_FILES["image"]["tmp_name"], $filePath)){

		$sql = "INSERT INTO $table(location, image_dir, longitude, latitude, level, upload_time) VALUES('$location', '$filePath', $longitude, $latitude, $level, '$date')";
        mysql_query("$sql") or die(mysql_error());
    }
	
}
mysql_close();
}

function translateAddress(){

global $longitude, $latitude;

$address = $_POST['location'];
 
$address = str_replace(" ", "+", $address);
 
$address_url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false";
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $address_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($ch);
curl_close($ch);
 
$response_a = json_decode($response);
$longitude = $response_a->results[0]->geometry->location->lng;
$latitude = $response_a->results[0]->geometry->location->lat;
 
}

addEntry();

?>
