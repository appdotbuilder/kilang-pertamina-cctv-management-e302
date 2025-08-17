<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Building
 *
 * @property int $id
 * @property string $name
 * @property string $code
 * @property string|null $description
 * @property string $latitude
 * @property string $longitude
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Room> $rooms
 * @property-read int|null $rooms_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\CctvCamera> $cameras
 * @property-read int|null $cameras_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Building newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Building query()
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereLatitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereLongitude($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Building active()
 * @method static \Database\Factories\BuildingFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Building extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
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
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the rooms for the building.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function rooms(): HasMany
    {
        return $this->hasMany(Room::class);
    }

    /**
     * Get all cameras in the building through rooms.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasManyThrough
     */
    public function cameras()
    {
        return $this->hasManyThrough(CctvCamera::class, Room::class);
    }

    /**
     * Scope a query to only include active buildings.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}