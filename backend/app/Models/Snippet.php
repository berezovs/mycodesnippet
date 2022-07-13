<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Snippet extends Model
{
    use HasFactory;

    protected $fillable = ['snippet', 'language', 'user_id', 'modified_at'];


    public function author(){
        return $this->belongsTo(User::class);
    }

}
