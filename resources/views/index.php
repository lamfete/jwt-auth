<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Angular-Laravel Authentication</title>
	<link rel="stylesheet" href="node_modules/bootstrap/dist/css/bootstrap.css">
	<!-- <link rel="stylesheet" href=".\node_modules\bootstrap\dist\css\bootstrap.css"> -->
	<base href="/">
</head>

<body ng-app="authApp">
	<div class="container">
		<div ui-view></div>
	</div>
</body>

<!-- Application dependencies -->
<script src="node_modules/angular/angular.js"></script>
<script src="node_modules/angular-ui-router/release/angular-ui-router.js"></script>
<script src="node_modules/satellizer/dist/satellizer.js"></script>

<!-- Application scripts -->
<script src="scripts/app.js"></script>
<script src="scripts/authController.js"></script>
<script src="scripts/userController.js"></script>

</html>