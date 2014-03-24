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
	echo "connected";

	mysql_select_db("$database") or die(mysql_error());
	echo "database found";
}

function addEntry(){

global $table, $longitude, $latitude;
connecToDatabase();
translateAddress();

$level = $_POST['level'];
$image = mysql_real_escape_string(file_get_contents($_FILES["image"]["tmp_name"]));

$sql = "INSERT INTO $table(longitude, latitude, level, image) VALUES($longitude, $latitude, $level, '$image')";

mysql_query("$sql") or die(mysql_error());
echo "data inserted";

mysql_close();
}

function translateAddress(){

global $longitude, $latitude;

$address = $_POST['address'];
 
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