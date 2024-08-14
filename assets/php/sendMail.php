<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../../vendor/autoload.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $phoneIndicative = $_POST['phone-indicative'] ?? '';
    $phoneNumber = $_POST['phone-number'] ?? '';
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
        $mail->addAddress('Conalpissal@gmail.com', 'Chelsea\'s mail');

        $mail->isHTML(true);
        $mail->Subject = "Mensagem de $name";
        $mail->Body    = "Nome: $name<br>Telefone: $phoneIndicative $phoneNumber<br>E-mail: $email<br>Mensagem: $message";

        $mail->send();
        echo 'Mensagem enviada com sucesso!';
    } catch (Exception $e) {
        echo "Mensagem não pôde ser enviada. Erro: {$mail->ErrorInfo}";
    }
} else {
    echo 'Método de solicitação inválido.';
}
?>
