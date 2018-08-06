<?php
$this->view('header');
?>
<!-- page Header End -->

	<!-- page content -->
	<a onclick="window.history.back()" class="btn btn-warning">Go Back</a>
	<h1 align="center">Add New Package</h1>
	<div class="row">
		<form method="post"  action="<?php echo site_url()."packages/save"?>">
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
				<label>Package Title</label>
				<input type="text" name="title" required="required" class="form-control">
			</div>
			<div class="form-group">
				<label>Package Price</label>
				<input type="text" name="price" required="required"  class="form-control">
			</div>
			
			<div class="form-group">
				<label>Plateform</label>
				<select class="form-control" required="required" name="plateform">
					<option value="">Select One</option>
					<?php
						foreach ($plateforms as $plateform) {
					?>

					<option value="<?php echo $plateform->plateform_id?>"><?php echo $plateform->plateform_title?></option>

					<?php
						}
					?>
				</select>									
			</div>

			<div class="form-group">
				
				<input type="submit" name="submit" class="btn btn-primary">
			</div>
		</form>
	</div>

<!-- page footer -->
<?php
$this->view('footer');
?>