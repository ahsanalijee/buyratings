<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Home extends CI_Controller 
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model("payment");
	}
	public function index()
	{
		$data["payments"]=$this->payment->payments();
		//print_r($data['payments']);
		$this->load->view('home',$data);
	}
	public function logout()
	{
		$this->session->sess_destroy();
		redirect("admins/index");
	}
}
?>
