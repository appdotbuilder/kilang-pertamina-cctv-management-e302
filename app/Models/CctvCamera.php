<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\CctvCamera
 *
 * @property int $id
 * @property int $room_id
 * @property string $name
 * @property string $code
 * @property string $ip_address
 * @property string $rtsp_url
 * @property string|null $hls_url
 * @property string $latitude
 * @property string $longitude
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $last_ping
 * @property string|null $notes
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Room $room
 * @property-read \App\Models\Building $building
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera query()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereHlsUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereIpAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLastPing($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereNotes($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereRoomId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereRtspUrl($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera online()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera offline()
 * @method static \Illuminate\Database\Eloquent\Builder|CctvCamera maintenance()
 * @method static \Database\Factories\CctvCameraFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class CctvCamera extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'room_id',
        'name',
        'code',
        'ip_address',
        'rtsp_url',
        'hls_url',
        'latitude',
        'longitude',
        'status',
        'last_ping',
        'notes',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'room_id' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'last_ping' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the room that owns the camera.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function room(): BelongsTo
    {
        return $this->belongsTo(Room::class);
    }

    /**
     * Get the building through the room.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class, 'room_id', 'id');
    }

    /**
     * Scope a query to only include online cameras.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOnline($query)
    {
        return $query->where('status', 'online');
    }

    /**
     * Scope a query to only include offline cameras.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeOffline($query)
    {
        return $query->where('status', 'offline');
    }

    /**
     * Scope a query to only include cameras in maintenance.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMaintenance($query)
    {
        return $query->where('status', 'maintenance');
    }
}