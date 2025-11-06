<?php
session_start();
include "../conexion.php";

if (isset($_POST['ingresar'])) {
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
            header("Location: bienvenida.php");
            exit;
        } else {
            $mensaje = "Contraseña incorrecta.";
        }
    } else {
        $mensaje = "Correo no registrado.";
    }

    $stmt->close();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Iniciar Sesión</title>
    <link rel="stylesheet" href="../CSS/style.css">
</head>
<body>
    <h2>Login</h2>
    <?php if (isset($mensaje)) echo "<p>$mensaje</p>"; ?>
    <form method="POST" action="">
        <input type="email" name="correo" placeholder="Correo electrónico" required><br>
        <input type="password" name="clave" placeholder="Contraseña" required><br>
        <button type="submit" name="ingresar">Ingresar</button>
    </form>
</body>
</html>
