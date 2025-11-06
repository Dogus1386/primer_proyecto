<?php
include "../conexion.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = trim($_POST['nombre']);
    $correo = trim($_POST['correo']);
    $clave = password_hash($_POST['clave'], PASSWORD_DEFAULT);

    $check = $conexion->prepare("SELECT id FROM usuarios WHERE correo = ?");
    $check->bind_param("s", $correo);
    $check->execute();
    $check->store_result();

    if ($check->num_rows > 0) {
        echo json_encode(["success" => false, "error" => "El correo ya está registrado"]);
    } else {
        $stmt = $conexion->prepare("INSERT INTO usuarios (nombre, correo, clave) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $nombre, $correo, $clave);
        $stmt->execute();
        echo json_encode(["success" => true]);
        $stmt->close();
    }

    $check->close();
}
?>
