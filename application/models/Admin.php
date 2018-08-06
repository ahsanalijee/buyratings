<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Admin extends CI_Model{

	public function login($data)
	{
		$data=$this->db->get_where('admin', $data);
		return $data->result();
	}
}
?>