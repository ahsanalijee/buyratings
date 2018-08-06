<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Plateform extends CI_Model {
	public function savedata($data)
	{
		return $this->db->insert('plateform',$data);
	}
	public function alldata()
	{
		$query = $this->db->get('plateform'); 
		return $query->result();
	}
	public function singledata($value='')
	{
		$data=$this->db->from('plateform')->where('plateform_id',$value)->get();
		return $data->result();
	}
	public function getsingledata($id)
	{
		$data=$this->db->get_where('plateform', array('plateform_id' => $id));
		return $data->result();
	}
	public function update($data)
	{
		$this->db->where('plateform_id', $data['id']);
		$this->db->update('plateform', $data['data']);
	
	}
	public function delete($value='')
	{
		$data=$this->getsingledata($value);
		unlink($data[0]->image);
		$this->db->delete('plateform', array('plateform_id' => $value));
	}
	public function packages()
	{
		$glob=array(); 
		$plateforms = $this->db->get('plateform')->result();
		for ($i=0; $i <count($plateforms); $i++) {
			$pack=$this->db->get_where('package', array('plateform_id' => $plateforms[$i]->plateform_id))->result();
			array_push($glob,array(
				"plateform" => $plateforms[$i],
				"packages"	=>	$pack
			));
		}
		return $glob;
	}
}
?>