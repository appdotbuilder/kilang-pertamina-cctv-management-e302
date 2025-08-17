<?php

namespace Database\Factories;

use App\Models\Building;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Room>
 */
class RoomFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'building_id' => Building::factory(),
            'name' => fake()->randomElement(['Control Room', 'Equipment Room', 'Storage', 'Office']) . ' ' . fake()->numberBetween(1, 10),
            'code' => fake()->unique()->lexify('RM-???'),
            'description' => fake()->sentence(),
            'latitude' => fake()->latitude(-6.3, -6.1),
            'longitude' => fake()->longitude(106.7, 106.9),
            'status' => fake()->randomElement(['active', 'inactive', 'maintenance']),
        ];
    }

    /**
     * Indicate that the room is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}