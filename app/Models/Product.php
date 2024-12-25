<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    //
    protected $fillable = [
        'name',
        'image',
        'price',
        'category_id',
        'quantity'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
