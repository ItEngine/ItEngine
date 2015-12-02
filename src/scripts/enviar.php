<?php

$firstnameAux = isset($_POST['firstname']);
$emailAux = isset($_POST['email']);
$lastnameAux = isset($_POST['lastname']);
$messageAux = isset($_POST['message']);

//Valido que vengan todas las opciones
if($firstnameAux && $emailAux && $lastnameAux && $messageAux){

	$emptyFirstname = empty($_POST['firstname']);
	$emptyEmail = empty($_POST['email']);
	$emptyLastname = empty($_POST['lastname']);
	$emptyMessage = empty($_POST['message']);

	//Valido que tenga datos
	if(!$emptyFirstname && !$emptyEmail && !$emptyLastname && !$emptyMessage){
		$email_destino = "martinpeveri@gmail.com";

		//Obtengo los campos
		$firstname = $_POST['firstname'];
		$email = $_POST['email'];
		$lastname = $_POST['lastname'];
		$message = $_POST['message'];

		//Email
		$consulta = "";
		$consulta = $consulta . "Nombre: " . $fistname . " <br>";
		$consulta = $consulta . "Apellido: " . $lastname . " <br>";
		$consulta = $consulta . "Email: " . $email . " <br>";
		$consulta = $consulta . "Mensaje: " . $message . " <br>";

		$from = $email;
		$to = $email_destino;
		$name = "ItEngine Contacto";
		$subject = "Email desde ItEngine ONLine";
		$message = $consulta;

		//Envío el email
		$from_user = "=?UTF-8?B?".base64_encode($from)."?=";
	    $subject = "=?UTF-8?B?".base64_encode($subject)."?=";

	    $headers = "From: $from <$from>\r\n".
	               "MIME-Version: 1.0" . "\r\n" .
	               "Content-type: text/html; charset=UTF-8" . "\r\n";

	    $resultado = mail($to, $subject, $message, $headers);
		if($resultado){
			echo '<h5 class="card"><i class="mdi-action-info-outline"></i>' . " Se envió el email con éxito.</h5>";
		}else{
			echo '<h5 class="card"><i class="mdi-action-info-outline"></i>' . " Error al enviar el email.</h5>";
		}
	}else{
		echo '<h5 class="card"><i class="mdi-action-info-outline"></i>' . " Todos los campos del formulario son obligatorios.</h5>";
	}
}else{
	echo '<h5 class="card"><i class="mdi-action-info-outline"></i>' . " Datos incorrectos.</h5>";
}

?>
