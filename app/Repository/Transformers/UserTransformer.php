<?php

namespace App\Repository\Transformers;

class UserTransformer extends Transformer{

    public function transform($user){

        return [
            'fullname' => $user->name,
            'username' => $user->username,
            'api_token' => $user->api_token,
        ];

    }

}