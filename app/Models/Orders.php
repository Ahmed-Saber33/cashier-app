<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = [
        'total_price',
        'order_date',
        'payement_method',
    ];


    public function orderDetails()
    {
        return $this->hasMany(OrderDetail::class);
    }
}
