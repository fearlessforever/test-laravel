<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Game;
use JWTAuth;
use Validator;
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
	public function modifyData(Request $request){
		$rules = array (
			'game_name' => 'required',
			'mode' => 'required',
		);
		
		$validator = Validator::make($request->all(), $rules);
		if ($validator-> fails()){
			return $this->respondValidationError('Fields Validation Failed.', $validator->errors());
		}
		$message ='';$data=[];
		switch($request['mode']){
			case 'tambah':
				$game = new Game;
				$game->game_name = $request['game_name'];
				$game->save();
				$message =' Data berhasil ditambahkan';
				break;
			case 'edit':
				if(empty($request['id']))
					return $this->respondWithError('Game id is required');
				$game = Game::find($request['id']);
				if(empty($game))
					return $this->respondWithError('Data not found');
				
				$game->game_name = $request['game_name'];
				$game->save();
				$message =' Data berhasil diupdate';
				break;
			case 'delete':
				if(empty($request['id']))
					return $this->respondWithError('Game id is required');
				$game = Game::find($request['id']);
				if(empty($game))
					return $this->respondWithError('Data not found');
				
				$game->delete();
				$message =' Data sudah dihapus';
				break;
			default: break;
		}
		return $this->respondCreated( $message , $data );
	}
}
