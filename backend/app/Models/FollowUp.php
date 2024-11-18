<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FollowUp extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'follow_up';
    protected $fillable = [
        'lead_id',
        'scheduled_at',
        'status',
    ];
}
