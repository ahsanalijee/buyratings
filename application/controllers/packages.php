<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Packages extends CI_Controller 
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('plateform');
		$this->load->model('package');
	}

	public function index()
	{
		$data['plateforms']=$this->plateform->alldata();
		$this->load->view('package/package_add',$data);
	}
	public function save()
	{
        $data = array(  
        'plateform_id'     => $this->input->post('plateform'),
        'package_title'     => $this->input->post('title'),
        'package_price'     => $this->input->post('price'),
    	);
       $ret= $this->package->savedata($data);
       if ($ret) {
       	$this->session->set_flashdata('success',"Package Added Successfully");
       	redirect("packages");
       }
	}
	public function packages()
	{
		$data['data']=$this->package->alldata();
		$this->load->view('package/package_all',$data);
	}
	public function edit()
	{

		$id=$this->uri->segment('3');
		$data['plateforms']=$this->plateform->alldata();
		$data['data']=$this->package->singledata($id);
		$this->load->view('package/package_edit',$data);
	}
	public function update()
	{
		$data['data'] = array(  
        'plateform_id'     => $this->input->post('plateform'),
        'package_title'     => $this->input->post('title'),
        'package_price'     => $this->input->post('price'),
    	);
		$data['id']=$this->input->post('editid');
		$this->package->update($data); 
		redirect('packages/packages');
	}
	public function delete($value='')
	{
		$this->package->delete($value);
		redirect('packages/packages');
	}
	
	
}
?>
