<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
//use Tymon\JWTAuth\Exceptions\JWTException;
use App\Player;
use JWTAuth;
use Validator;
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
		$data = Player::select(\DB::raw('players.*,games.game_name'))
			->leftJoin('games','games.id','=','players.game_id')
			->get();//all();
		return $this->respondCreated( 'Get Player List',$data );
	}
	public function getAutoComplete(Request $request){
		$validator = Validator::make($request->all(), [
			'search'=>'required'
		]);
		if ($validator-> fails()){
			return $this->respondValidationError('Fields Validation Failed.', $validator->errors());
		}
		
		$search = \App\Game::where('game_name','LIKE','%' . $request['search'] .'%' )->limit(5)->get();
		return $this->respondCreated( 'Get Automplete', $search );
	}
	public function setPoint($mode , $id){
		if(!in_array($mode,['kurangi','tambahi']))
			return $this->respondWithError('Set mode unknown !!! ');
		
		$player = Player::find($id);
		if( empty($player) ){
			return $this->respondWithError('Player ID not found ');
		}
		$message = '';
		switch($mode){
			case 'kurangi':	$message = 'Point minus 1';  $player->point -=1; break;
			case 'tambahi':	$message = 'Point plus 1'; $player->point +=1; break;
			default: break;; 
		}
		$point = $player->point ; $player->save();
		return $this->respondCreated( $message , ['points'=>$point] );
	}
	public function getOne($id=null){
		$data = Player::where('players.id',$id)
			    ->select(\DB::raw('players.*,games.game_name'))
			    ->limit(1)
			    ->leftJoin('games','games.id','=','players.game_id')
			    ->first();
		return $this->respondCreated( 'Get ID '.$id ,$data );
	}
	//==== post
	public function modifyData(Request $request){
		$rules = array (
			'player_name' => 'required',
			'game_id' => 'required',
			'mode' => 'required',
		);
		
		$validator = Validator::make($request->all(), $rules);
		if ($validator-> fails()){
			return $this->respondValidationError('Fields Validation Failed.', $validator->errors());
		}
		$message ='';$data=[];
		switch($request['mode']){
			case 'tambah':
				$player = new Player;
				$player->player_name = $request['player_name'];
				$player->game_id = $request['game_id'];
				$player->save();
				$message =' Data berhasil ditambahkan';
				break;
			case 'edit':
				if(empty($request['id']))
					return $this->respondWithError('Game id is required');
				$player = Player::find($request['id']);
				if(empty($player))
					return $this->respondWithError('Data not found');
				
				$player->player_name = $request['player_name'];
				$player->game_id = $request['game_id'];
				$player->save();
				$message =' Data berhasil diupdate';
				break;
			case 'delete':
				if(empty($request['id']))
					return $this->respondWithError('Game id is required');
				$player = Player::find($request['id']);
				if(empty($player))
					return $this->respondWithError('Data not found');
				
				$player->delete();
				$message =' Data sudah dihapus';
				break;
			default: break;
		}
		return $this->respondCreated( $message , $data );
	}
}
