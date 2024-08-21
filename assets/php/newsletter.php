<?php
$host = 'localhost';
$db = 'dinorath_bd';
$user = 'root';
$pass = '';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Conecta ao banco de dados
    $mysqli = new mysqli($host, $user, $pass, $db);

    // Verifica a conexão
    if ($mysqli->connect_error) {
        echo json_encode([
            'success' => false,
            'message' => 'Erro de conexão: ' . $mysqli->connect_error
        ]);
        exit(); // Encerra o script para evitar execução adicional
    }

    // E-mail a ser inserido
    $email = $_POST['email'] ?? '';

    // Verifica se o e-mail não está vazio
    if (empty($email)) {
        echo json_encode([
            'success' => false,
            'message' => 'E-mail não fornecido.'
        ]);
        $mysqli->close();
        exit(); // Encerra o script
    }

    // Prepara e executa a consulta
    $stmt = $mysqli->prepare('INSERT INTO newsletter_subscribers (email, active) VALUES (?, ?)');
    if ($stmt === false) {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao preparar a consulta: ' . $mysqli->error
        ]);
        $mysqli->close();
        exit(); // Encerra o script
    }

    $active = 1; // Estado de atividade padrão
    $stmt->bind_param('si', $email, $active);

    if ($stmt->execute()) {
        echo json_encode([
            'success' => true,
            'message' => 'E-mail adicionado com sucesso!'
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao adicionar e-mail: ' . $stmt->error
        ]);
    }

    // Fecha a declaração e a conexão
    $stmt->close();
    $mysqli->close();
}
?>
