<!DOCTYPE html>
<html lang="en" ng-app="veloToulouse" class="no-js">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Velo Toulouse - Concept App by Simon Bats</title>
  <meta name="description" content="">
  <meta name="viewport" content="width=device-width, minimum-scale=1.0, initial-scale=1.0, user-scalable=yes">
  <meta name="mobile-web-app-capable" content="yes" />
  <link rel="icon" sizes="192x192" href="img/icon.png?v=<?php echo uniqid(); ?>">
  <link rel="stylesheet" href="ressources/html5-boilerplate/css/normalize.css">
  <link rel="stylesheet" href="ressources/html5-boilerplate/css/main.css">
  <link rel="stylesheet" href="css/app.css?v=<?php echo uniqid(); ?>"/>
  <script src="ressources/polymer/platform/platform.js"></script>
  <link rel="import" href="ressources/polymer/paper-elements/paper-elements.html">
  <link rel="import" href="partials/components/icon-set.html">
  <link href='http://fonts.googleapis.com/css?family=Roboto:400,500,700' rel='stylesheet' type='text/css'>
</head>
<body ng-controller="MainCtrl">
  <!--[if lt IE 9]>
      <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
  <![endif]-->

  <div class="view-container">
    <div ui-view class="main-view"></div>
  </div>

  <div side-menu></div>

  <script src="ressources/jquery/jquery.min.js"></script>
  <script src="ressources/angular/angular.min.js"></script>
  <script src="ressources/angular-ui-router/release/angular-ui-router.min.js"></script>
  <script src="ressources/angular-resource/angular-resource.min.js"></script>
  <script src='//maps.googleapis.com/maps/api/js?sensor=false'></script>
  <script src="ressources/lodash/dist/lodash.underscore.min.js"></script>
  <script src="ressources/angular-google-maps/dist/angular-google-maps.min.js"></script>
  <script src="ressources/angular-local-storage/angular-local-storage.min.js"></script>
  <script src="js/app.js?v=<?php echo uniqid(); ?>"></script>
  <script src="js/services.js?v=<?php echo uniqid(); ?>"></script>  
  <script src="js/navbar.js?v=<?php echo uniqid(); ?>"></script>  
  <script src="js/side-menu.js?v=<?php echo uniqid(); ?>"></script>  
  <script src="js/map.js?v=<?php echo uniqid(); ?>"></script>
  <script src="js/station.js?v=<?php echo uniqid(); ?>"></script>
  <script src="js/favoris.js?v=<?php echo uniqid(); ?>"></script>
</body>
</html>