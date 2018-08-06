<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Payment extends CI_Model {
	function __construct()
	{
		parent::__construct();
	}
	public function payments()
	{
		$query = $this->db->from('payment')->join('plateform', 'plateform.plateform_id = payment.plateform_id')->join('package', 'package.package_id = payment.package_id')->where("complete !=",1)->get();
		return $query->result();
		//return $q= $this->db->from('payment')->where("complete !=",1)->get()->result();
	}
	public function save($data)
	{
		return $this->db->insert('payment',$data);
	}
	public function update($data)
	{
	
		$this->db->where('payment_id', $data['id']);
		$this->db->update('payment', $data['data']);
	}
}