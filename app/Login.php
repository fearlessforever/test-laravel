<?php

namespace App;

//use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Login extends Authenticatable
{
   use Notifiable;
   
    protected $fillable = [
        'name', 'username', 'password',
    ];
}
