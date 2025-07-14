<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StoreOrders extends Model
{
    protected $fillable = [
        'user_id',
        'items',
        'total_amount',
        'order_date',
        'shipping_address',
        'status',
    ];

    protected $casts = [
        'items' => 'array',
        'order_date' => 'datetime',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
