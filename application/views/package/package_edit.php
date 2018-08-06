<?php
$this->view('header');
?>
<!-- page Header End -->

	<!-- page content -->
	<a onclick="window.history.back()" class="btn btn-warning">Go Back</a>
	<h1 align="center">Update Subject</h1>
	<?php
		// echo "<pre>";
		// print_r($data);
		//exit();
	?>	
	<form method="post"  action="<?php echo site_url()."packages/update"?>">
		<input type="hidden" name="editid" value="<?php echo $data['0']->package_id; ?>">
		<div class="form-group">
			<label>Package Title</label>
			<input type="text" name="title" required="required" value="<?php echo $data['0']->package_title; ?>" class="form-control">
		</div>
		<div class="form-group">
			<label>Package Price</label>
			<input type="number" name="price" value="<?php echo $data['0']->package_price; ?>" required="required"  class="form-control">
		</div>
		
		<div class="form-group">
			<label>Plateform</label>
			<select class="form-control" required="required" name="plateform">
				<option value="">Select One</option>
				<?php
					foreach ($plateforms as $plateform) {
				?>

				<option value="<?php echo $plateform->plateform_id?>" <?php 
				if ($data['0']->plateform_id==$plateform->plateform_id) {
				 	echo "selected";
				 }  ?>><?php echo $plateform->plateform_title?></option>

				<?php
					}
				?>
			</select>									
		</div>

		<div class="form-group">
			
			<input type="submit" name="submit" class="btn btn-primary">
		</div>
	</form>

<!-- page footer -->
<?php
$this->view('footer');
?>