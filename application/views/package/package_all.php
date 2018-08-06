<?php
$this->view('header');
?>
<link rel="stylesheet" type="text/css" href="https://cdn.datatables.net/1.10.19/css/jquery.dataTables.css">
  
<script type="text/javascript" charset="utf8" src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.js"></script>
<!-- page Header End -->
<a class="btn btn-primary" href="<?php echo site_url()."packages/index"?>">Add New</a>
<h2 align="center">Packages</h2>

<table id="myTable" class="table table-responsive table-striped">
	<tr>
		<th>Plateform</th>
		<th>Package</th>
		<th>Price</th>
		<th>Actions</th>
	</tr>
	<?php
		foreach ($data as $d) {
	?>

	<tr>
		<td><?php echo $d->plateform_title?></td>
		<td><?php echo $d->package_title?></td>
		<td>$<?php echo $d->package_price?></td>
		
		<td>
			<a class="btn btn-warning" href="<?php echo site_url()."packages/edit/".$d->package_id?>">Edit</a>
			<a class="btn btn-danger" onclick="return confirm('Are You Sure You Wanna Delete This?')" href="<?php echo site_url()."packages/delete/".$d->package_id?>">Delete</a>
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
