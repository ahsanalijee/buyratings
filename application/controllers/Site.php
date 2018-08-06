<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Site extends CI_Controller 
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('plateform');
		$this->load->model('package');
		$this->load->model('payment');
	}
	public function index()
	{
		$data['datas']=$this->plateform->packages();
		$this->load->view('site/index',$data);
	}
	public function load()
	{
		$id=$this->input->post('packageid');
		$res=$this->package->singledata($id);
		
		if (count($res)>0) {
			
			echo '<input type="hidden" name="item_name" value="'.$res[0]->plateform_id.'"><input type="hidden" name="item_number" value="'.$res[0]->package_id.'"><input type="hidden" name="amount" value="'.$res[0]->package_price.'">';
		}
	}
	public function payment($value='')
	{
		$value;
		$item_name = $this->input->post('item_name');
		$item_number = $this->input->post('item_number');
		$payment_status = $this->input->post('payment_status');
		$payment_amount = $this->input->post('mc_gross');
		$payment_currency = $this->input->post('mc_currency');
		$txn_id = $this->input->post('txn_id');
		$receiver_email = $this->input->post('receiver_email');
		$payer_email = $this->input->post('payer_email');
		$data=array(
			'plateform_id' => $item_name,
			'package_id' => $item_number,
			'txn_id' => $txn_id,
			'sender_email' => $payer_email,
			'date' => date('Y-m-d H:m:s'),
			'link'	=>	$value
		);
		$ret=$this->payment->save($data);
		if ($ret) {
       	redirect("site/thanks");
       }

	}
	public function thanks()
	{
		$this->load->view('thanks');
	}
	public function complete($value)
	{
		$data['data'] = array(  
        'complete'     => 1
    	);
		$data['id']=$value;
		$this->payment->update($data); 
		redirect('home');
	}
	
}
?>
