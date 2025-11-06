<?php
$conexion = new mysqli("localhost", "root", "", "productouno_db");

if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}
// No imprimir nada aquí
?>
