<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class package extends CI_Model {
	function __construct()
	{
		parent::__construct();
	}
	public function savedata($data)
	{
		return $this->db->insert('package',$data);
	}
	public function alldata()
	{
		$query = $this->db->from('package')->join('plateform', 'plateform.plateform_id = package.plateform_id')->get(); 
		return $query->result();
	}
	public function singledata($value='')
	{
		$data=$this->db->from('package')->join('plateform', 'plateform.plateform_id = package.plateform_id')->
		where('package_id',$value)->
		get();
		return $data->result();
	}
	public function update($data)
	{
	
		$this->db->where('package_id', $data['id']);
		$this->db->update('package', $data['data']);
	}
	public function delete($value)
	{
		$this->db->delete('package', array('package_id' => $value));
	}
}
?>