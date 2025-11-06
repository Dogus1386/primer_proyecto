<?php
session_start();
include "../conexion.php";
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $correo = trim($_POST['correo']);
    $clave = $_POST['clave'];

    $stmt = $conexion->prepare("SELECT id, nombre, clave FROM usuarios WHERE correo = ?");
    $stmt->bind_param("s", $correo);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        $stmt->bind_result($id, $nombre, $clave_hash);
        $stmt->fetch();

        if (password_verify($clave, $clave_hash)) {
            $_SESSION['usuario_id'] = $id;
            $_SESSION['usuario_nombre'] = $nombre;
            echo json_encode(["success" => true, "nombre" => $nombre]);
        } else {
            echo json_encode(["success" => false, "error" => "Contraseña incorrecta"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Correo no registrado"]);
    }

    $stmt->close();
}
?>
