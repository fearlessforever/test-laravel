<?php

namespace App\Http\Controllers;

use App\Login as User;
use Illuminate\Http\Request;
use App\Http\Requests;
use JWTAuth;
use Response;
use App\Repository\Transformers\UserTransformer;
use \Illuminate\Http\Response as Res;
use Validator;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginController extends ApiController
{
    /**
     * @var \App\Repository\Transformers\UserTransformer
     * */
    protected $userTransformer;

    public function __construct(UserTransformer $userTransformer)
    {

        $this->userTransformer = $userTransformer;

    }
	
    public function authenticate(Request $request)
    {
        $rules = array (
            'username' => 'required',
            'password' => 'required',
        );

        $validator = Validator::make($request->all(), $rules);
        if ($validator-> fails()){
            return $this->respondValidationError('Fields Validation Failed.', $validator->errors());
        }

        else{
            $user = User::where('username', $request['username'])->first();
            if($user){
                $api_token = $user->api_token;
                if ($api_token == NULL){
                    return $this->_login($request['username'], $request['password']);
                }

                try{
                    $user = JWTAuth::toUser($api_token);
                    return $this->respond([
                        'status' => 'success',
                        'status_code' => $this->getStatusCode(),
                        'message' => 'Already logged in',
                        'user' => $this->userTransformer->transform($user)
                    ]);
                }catch(JWTException $e){
                    $user->api_token = NULL;
                    $user->save();
                    return $this->respondInternalError("Login Unsuccessful. An error occurred while performing an action!");
                }
            }
            else{
                return $this->respondWithError("Invalid Username or Password");
            }

        }

    }

    private function _login($email, $password)
    {
        $credentials = ['username' => $email, 'password' => $password];
		
        if ( ! $token = JWTAuth::attempt($credentials)) {
            return $this->respondWithError("User does not exist!");
        }
		
        $user = JWTAuth::toUser($token);

        $user->api_token = $token;
        $user->save();

        return $this->respond([
            'status' => 'success',
            'status_code' => $this->getStatusCode(),
            'message' => 'Login successful!',
            'data' => $this->userTransformer->transform($user)

        ]);
    }
	
    public function register(Request $request)
    {

        $rules = array (

            'name' => 'required|max:255',
            'username' => 'required|max:255|unique:logins',
            'password' => 'required|min:1|confirmed',
            'password_confirmation' => 'required|min:1'

        );

        $validator = Validator::make($request->all(), $rules);

        if ($validator-> fails()){
            return $this->respondValidationError('Fields Validation Failed.', $validator->errors());
        }
        else{
            $user = User::create([
                'name' => $request['name'],
                'username' => $request['username'],
                'password' => \Hash::make($request['password']),
            ]);
            return $this->_login($request['username'], $request['password']);
        }

    }
	
    public function logout($api_token)
    {
        try{
            $user = JWTAuth::toUser($api_token);
            $user->api_token = NULL;
            $user->save();
            JWTAuth::setToken($api_token)->invalidate();
            $this->setStatusCode(Res::HTTP_OK);
            return $this->respond([
                'status' => 'success',
                'status_code' => $this->getStatusCode(),
                'message' => 'Logout successful!',
            ]);
        }catch(JWTException $e){
            return $this->respondInternalError("An error occurred while performing an action!");

        }

    }
}
