<?php
include 'recipes_db.php';

if ($conn === null) {
  echo json_encode(["message" => "Database connection failed"]);
  exit();
}

$sql = "SELECT * FROM recipes";
$result = $conn->query($sql);

if (!$result) {
  echo json_encode(["message" => "Error executing query: " . $conn->error]);
  $conn->close();
  exit();
}

$recipes = array();

if ($result->num_rows > 0) {
  while($row = $result->fetch_assoc()) {
      $recipes[] = $row;
  }
}

header('Content-Type: app/json');
echo json_encode($recipes);
$conn->close();
?>
