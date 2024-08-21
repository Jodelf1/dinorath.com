<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    header('Content-Type: application/json');

    $name = $_POST['nome'] ?? '';
    $phoneIndicative = $_POST['phoneId'] ?? '';
    $phoneNumber = $_POST['numero'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    $mail = new PHPMailer(true);

    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'cdmailsender@gmail.com'; 
        $mail->Password   = 'ckgy dqqg pnrm zhzc'; 
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        $mail->setFrom('cdmailsender@gmail.com', 'Messages to Chelsea');
        $mail->addAddress('conalpissal@gmail.com', 'Chelsea\'s mail');

        $mail->isHTML(true);
        $mail->Subject = "Message from $name";
        $mail->Body    = "<strong>Nome:</strong> $name<br> <strong>Telefone:</strong> $phoneIndicative $phoneNumber<br> <strong>Email:</strong> $email<br><strong>Mensagem:</strong> $message";

        if ($mail->send()) {
            // Retorna uma resposta JSON se a inserção foi bem-sucedida
            echo json_encode([
                'success' => true,
                'message' => 'Mensagem enviada'
            ]);
        }

    } catch (Exception $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Erro ao enviar a mensagem.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Método inválido'
    ]);
}
?>
