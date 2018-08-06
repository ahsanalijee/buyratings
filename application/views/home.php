<?php
$this->view('header');
?>
<!-- page Header End -->

	<!-- page content -->
	<h2 align="center" style="margin: 50px auto">Pending Work</h2>
	<table class="table table-hover">
		<thead>
			<tr>
				<th>Plateform</th>
				<th>Package</th>
				<th>TXN_ID</th>
				<th>Sender Email</th>
				<th>Link</th>
				<th>Date</th>
				<th>Actions</th>
			</tr>
		</thead>
		<tbody>
			<?php
			//print_r($payments);
				foreach ($payments as $d) {
			?>

			<tr>
				<td><?php echo $d->plateform_title?></td>
				<td><?php echo $d->package_title?></td>
				<td><?php echo $d->txn_id?></td>
				<td><?php echo $d->sender_email?></td>
				<td><?php echo $d->link?></td>
				<td><?php echo $d->date?></td>
				<td><a class="btn btn-primary" href="<?php echo site_url()."site/complete/".$d->payment_id?>">Completed</a></td>
			</tr>
			<?php
				}
			?>
		</tbody>
	</table>

<!-- page footer -->
<?php
$this->view('footer');
?>