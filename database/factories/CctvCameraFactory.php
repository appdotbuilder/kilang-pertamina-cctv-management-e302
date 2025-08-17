<?php

namespace Database\Factories;

use App\Models\Room;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\CctvCamera>
 */
class CctvCameraFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $ip = fake()->localIpv4();
        $status = fake()->randomElement(['online', 'offline', 'maintenance']);
        
        return [
            'room_id' => Room::factory(),
            'name' => 'Camera ' . fake()->unique()->numberBetween(1, 999),
            'code' => fake()->unique()->lexify('CAM-???'),
            'ip_address' => $ip,
            'rtsp_url' => "rtsp://{$ip}:554/stream1",
            'hls_url' => "http://{$ip}:8080/stream.m3u8",
            'latitude' => fake()->latitude(-6.3, -6.1),
            'longitude' => fake()->longitude(106.7, 106.9),
            'status' => $status,
            'last_ping' => $status === 'online' ? fake()->dateTimeBetween('-1 hour', 'now') : null,
            'notes' => $status === 'maintenance' ? fake()->sentence() : null,
        ];
    }

    /**
     * Indicate that the camera is online.
     */
    public function online(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'online',
            'last_ping' => fake()->dateTimeBetween('-1 hour', 'now'),
        ]);
    }

    /**
     * Indicate that the camera is offline.
     */
    public function offline(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'offline',
            'last_ping' => null,
        ]);
    }

    /**
     * Indicate that the camera is in maintenance.
     */
    public function maintenance(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'maintenance',
            'notes' => fake()->sentence(),
        ]);
    }
}