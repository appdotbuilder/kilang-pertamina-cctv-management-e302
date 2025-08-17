<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Notification>
 */
class NotificationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['login', 'message', 'system', 'camera_status']);
        
        $titles = [
            'login' => 'User Login',
            'message' => 'New Message',
            'system' => 'System Alert',
            'camera_status' => 'Camera Status Change',
        ];

        return [
            'user_id' => User::factory(),
            'title' => $titles[$type],
            'message' => fake()->sentence(),
            'type' => $type,
            'read_at' => fake()->optional()->dateTimeBetween('-1 week', 'now'),
            'data' => null,
        ];
    }

    /**
     * Indicate that the notification is unread.
     */
    public function unread(): static
    {
        return $this->state(fn (array $attributes) => [
            'read_at' => null,
        ]);
    }
}