<?php
	if (!$this->session->has_userdata('user')) {
		redirect("librarian/index");
	}
?>
<!DOCTYPE html>
<html>
<head>
	<title>Social Trafic</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.css"/>
	<script type="text/javascript" src="https://cdn.datatables.net/v/bs4/dt-1.10.18/datatables.min.js"></script>
</head>
<body>
	<nav class="navbar navbar-default">
		  <div class="container-fluid">
		    <div class="navbar-header">
		      <a class="navbar-brand" href="<?php echo site_url()."home/index"?>">Social Trafic</a>
		    </div>
		    <ul class="nav navbar-nav">
		    <li><a href="<?php echo site_url()."home"?>">Home</a></li>
		      <li class="dropdown">
		        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Plateform
		        <span class="caret"></span></a>
		        <ul class="dropdown-menu">
		          <li><a href="<?php echo site_url()."plateforms/index"?>">Add Plateform</a></li>
		          <li><a href="<?php echo site_url()."plateforms/plateforms"?>">All Plateforms</a></li>
		        </ul>
		      </li>
		      <li class="dropdown">
		        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Packages
		        <span class="caret"></span></a>
		        <ul class="dropdown-menu">
		          <li><a href="<?php echo site_url()."packages/index"?>">Add Package</a></li>
		          <li><a href="<?php echo site_url()."packages/packages"?>">All Packages</a></li>
		        </ul>
		      </li>
		      
		    </ul>
		      <ul class="nav navbar-nav navbar-right">
			      <li><a href="<?php echo site_url()."home/logout"?>"><span class="glyphicon glyphicon-user"></span> Logout</a></li>
			      
			    </ul>
		  </div>
		</nav>
	<div class="container">
		
	