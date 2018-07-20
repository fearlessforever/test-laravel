<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use JWTAuth;
use \Illuminate\Http\Response as Res;

class GameController extends ApiController
{
     protected $user;
	 
     public function __construct( )
    {
		$token = JWTAuth::getToken();
		$this->user = JWTAuth::toUser($token);
    }
    
	public function datatable(Request $request){
		$data = Game::all();
		return $this->respondCreated( 'Get Game List',$data );
	}
	public function getOne($id=null){
		$data = Game::find($id);
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
