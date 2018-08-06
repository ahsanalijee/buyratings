<?php
$this->view('header');
?>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
<!-- page Header End -->
<a class="btn btn-primary" href="<?php echo site_url()."plateforms/index"?>">Add New</a>

<h2 align="center">All Subjects</h2>
<br>
<table id="myTable" class="table table-responsive table-striped table-hover">
	<tr>
		<th>Image</th>
		<th>Title</th>
		<th>Delivery</th>
		<th>Actions</th>
	</tr>
	<?php
		foreach ($data as $d) {
	?>

	<tr>
		<td><img width="100px" height="100px" src="<?php echo site_url().$d->plateform_image?>" class="img img-thumbnail"></td>
		<td><?php echo $d->plateform_title?></td>
		<td><?php echo $d->plateform_delivery?> Hours</td>		
		<td>
			<a class="btn btn-warning" href="<?php echo site_url()."plateforms/edit/".$d->plateform_id?>">Edit</a>
			<a class="btn btn-danger" onclick="return confirm('Are You Sure You Wanna Delete This?')" href="<?php echo site_url()."plateforms/delete/".$d->plateform_id?>">Delete</a>
		</td>
	</tr>

	<?php
		}
	?>
	
</table>

<!-- page footer -->
<?php
$this->view('footer');
?>

<script type="text/javascript">
	jQuery(document).ready( function () {
	    jQuery('#myTable').DataTable();
	} );
</script>
