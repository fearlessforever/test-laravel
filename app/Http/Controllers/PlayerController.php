<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Tymon\JWTAuth\Exceptions\JWTException;
use App\Player;
use JWTAuth;
use \Illuminate\Http\Response as Res;

class PlayerController extends ApiController
{
    //
     protected $user;
	 
     public function __construct( )
    {
		$token = JWTAuth::getToken();
		$this->user = JWTAuth::toUser($token);
    }
	
	public function datatable(Request $request){
		$data = Player::all();
		return $this->respondCreated( 'Get Player List',$data );
	}
	public function getOne($id=null){
		$data = Player::find($id);
		return $this->respondCreated( 'Get ID '.$id ,$data );
	}
	//==== post
	public function tambahData(Request $request){
		
	}
	public function updateData(Request $request){
		
	}
	public function deleteData(Request $request){
		
	}
}
