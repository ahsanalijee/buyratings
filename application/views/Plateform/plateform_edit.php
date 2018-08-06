<?php
$this->view('header');
?>
<!-- page Header End -->

	<!-- page content -->

	<a onclick="window.history.back()" class="btn btn-warning">Go Back</a>
	<h1 align="center">Update Subject</h1>
	<form method="post" enctype="multipart/form-data"  action="<?php echo site_url()."plateforms/update"?>">
		
		<input type="hidden" name="editid" value="<?php echo $data['0']->plateform_id; ?>">
		<div class="form-group">
			<label>Plateform title</label>
			<input type="text" name="title" required="required" value="<?php echo $data['0']->plateform_title; ?>" class="form-control">
		</div>
		<div class="form-group">
			<label>Delivery Time</label>
			<input type="text" class="form-control" name="dfrom" required="required" value="<?php echo $data['0']->plateform_delivery ?>" >
		</div>
		<div class="form-group">
			<label>Plateform Image</label>
			<input type="hidden" id="checkimage" name="checkimage" value="<?php echo $data['0']->plateform_image; ?>">
			<input type="file" name="image" onchange="readURL(this)"  class="form-control">
			<br><br>
			<img id="cimage" width="200px" height="200px" src="<?php echo site_url().$data['0']->plateform_image?>">
		</div>
		<div class="form-group">
			
			<input type="submit" name="submit" class="btn btn-primary">
		</div>
	</form>

<!-- page footer -->
<?php
$this->view('footer');
?>
<script type="text/javascript">
	function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            
            reader.onload = function (e) {
                document.getElementById('cimage').src=e.target.result;
               	document.getElementById('checkimage').value='';
                document.getElementById("checkimage").value = "";
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
</script>