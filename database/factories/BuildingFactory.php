<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Building>
 */
class BuildingFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company() . ' Building',
            'code' => fake()->unique()->lexify('BLD-???'),
            'description' => fake()->sentence(),
            'latitude' => fake()->latitude(-6.3, -6.1),
            'longitude' => fake()->longitude(106.7, 106.9),
            'status' => fake()->randomElement(['active', 'inactive', 'maintenance']),
        ];
    }

    /**
     * Indicate that the building is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }
}