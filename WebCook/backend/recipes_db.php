<?php
header('Content-Type: application/json');

// Replace with your database connection details
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "recipes_db";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Check the request method
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Fetch recipes
    $sql = "SELECT * FROM recipes";
    $result = $conn->query($sql);

    if ($result === false) {
        echo json_encode(["error" => "Query failed: " . $conn->error]);
    } else {
        $recipes = [];
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                $recipes[] = $row;
            }
        }
        echo json_encode($recipes);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Add a new recipe
    $input = json_decode(file_get_contents('php://input'), true);
    $name = $input['name'];
    $ingredients = $input['ingredients'];
    $instructions = $input['instructions'];

    $sql = "INSERT INTO recipes (name, ingredients, instructions) VALUES ('$name', '$ingredients', '$instructions')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Recipe posted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $conn->error]);
    }
} else {
    // Handle invalid request method
    echo json_encode(['message' => 'Invalid request method']);
}

$conn->close();
?>
