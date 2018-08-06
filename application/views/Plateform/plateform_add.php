<?php
$this->view('header');
?>
<!-- page Header End -->

	<!-- page content -->
	<a onclick="window.history.back()" class="btn btn-warning">Go Back</a>
	<h1 align="center">Add New Plateform</h1>
	<form method="post" enctype="multipart/form-data"  action="<?php echo site_url()."plateforms/save"?>">
		<?php
		 if ($this->session->flashdata('success')) {
		?>
			<div class="alert alert-success alert-dismissible">
			  <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>
			  <?php echo $this->session->flashdata('success');?>
			</div>
		<?php
		 }
		?>
		<div class="form-group">
			<label>Plateform title</label>
			<input type="text" name="title" required="required" value="<?php echo set_value('subject'); ?>" class="form-control">
		</div>
		<div class="form-group">
			<label>Delivery Time</label>
			<input type="number" name="dfrom" required="required" value="<?php echo set_value('dfrom'); ?>">--To--
			<input type="number" name="dto" required="required" value="<?php echo set_value('dto'); ?>"> Hours
		</div>
		<div class="form-group">
			<label>Plateform Image</label>
			<input type="file" name="image" required="required" value="<?php echo set_value('subject'); ?>" class="form-control">
		</div>
		<div class="form-group">
			
			<input type="submit" name="submit" class="btn btn-primary">
		</div>
	</form>

<!-- page footer -->
<?php
$this->view('footer');
?>