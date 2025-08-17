<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Room
 *
 * @property int $id
 * @property int $building_id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property string $latitude
 * @property string $longitude
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Building $building
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CctvCamera> $cameras
 * @property-read int|null $cameras_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereBuildingId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room active()
 * @method static \Database\Factories\RoomFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Room extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'building_id',
        'name',
        'code',
        'description',
        'latitude',
        'longitude',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'building_id' => 'integer',
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the building that owns the room.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function building(): BelongsTo
    {
        return $this->belongsTo(Building::class);
    }

    /**
     * Get the cameras for the room.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function cameras(): HasMany
    {
        return $this->hasMany(CctvCamera::class);
    }

    /**
     * Scope a query to only include active rooms.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}