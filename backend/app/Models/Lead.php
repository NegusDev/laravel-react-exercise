<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Lead extends Model
{
   /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'leads';

    protected $fillable = [
        'name',
        'email',
        'phone',
    ];
}
