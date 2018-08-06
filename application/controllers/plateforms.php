<?php
defined('BASEPATH') OR exit('No direct script access allowed');


class Plateforms extends CI_Controller 
{
	
	function __construct()
	{
		parent::__construct();
		$this->load->model('plateform');
	}
	public function index()
	{
		$this->load->view('plateform/plateform_add');
	}
	public function save()
	{
		$config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['max_size']             = 100;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;

        $this->load->library('upload', $config);

        if ( ! $this->upload->do_upload('image'))
        {
             $error = array('error' => $this->upload->display_errors());
             $this->load->view("plateform/plateform_add");
        }
        else
        {
        	$imgname="uploads/".$this->upload->data('file_name');
        }
        $data = array(  
        'plateform_title' => $this->input->post('title'),
        'plateform_image' => @$imgname,
        'plateform_delivery' => $this->input->post('dfrom')."-".$this->input->post('dto')
    	);
    	// print_r($data);
    	// exit();
       $ret= $this->plateform->savedata($data);
       if ($ret) {
       	$this->session->set_flashdata('success',"Plateform Added Successfully");
       	redirect("plateforms");
       }
	}
	public function plateforms()
	{
		$data['data']=$this->plateform->alldata();
		// print_r($data);
		// exit();
		$this->load->view('plateform/plateform_all',$data);
	}
	public function edit()
	{
		$id=$this->uri->segment('3');
		$data['data']=$this->plateform->singledata($id);
		$this->load->view('plateform/plateform_edit',$data);
	}
	public function update()
	{
		$config['upload_path']          = './uploads/';
        $config['allowed_types']        = 'gif|jpg|png';
        $config['max_size']             = 100;
        $config['max_width']            = 1024;
        $config['max_height']           = 768;

        $this->load->library('upload', $config);

        if (! $this->input->post('checkimage')) {
        	
        	if ( ! $this->upload->do_upload('image'))
	        {
	             $error = array('error' => $this->upload->display_errors());
	             print_r($error);

	        }
	        else
	        {
	        	$data=$this->plateform->getsingledata($this->input->post('id'));
				unlink($data[0]->image);
	        	$imgname="uploads/".$this->upload->data('file_name');
	        }
        	
        }else{
        	$imgname=$this->input->post('checkimage');
        }
		$data['data'] = array(  
            'plateform_title' => $this->input->post('title'),
	        'plateform_image' => @$imgname,
	        'plateform_delivery' => $this->input->post('dfrom') 
            );
		$data['id']=$this->input->post('editid');
		$this->plateform->update($data); 
		redirect('plateforms/plateforms');
	}
	public function delete($value='')
	{
		$this->plateform->delete($value);
		redirect("plateforms/plateforms");
	}
	
}
?>
