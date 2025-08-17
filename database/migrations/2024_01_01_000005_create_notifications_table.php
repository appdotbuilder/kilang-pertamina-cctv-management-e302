<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('notifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('title')->comment('Notification title');
            $table->text('message')->comment('Notification message');
            $table->enum('type', ['login', 'message', 'system', 'camera_status'])->comment('Notification type');
            $table->timestamp('read_at')->nullable()->comment('Read timestamp');
            $table->json('data')->nullable()->comment('Additional notification data');
            $table->timestamps();
            
            $table->index(['user_id', 'read_at']);
            $table->index('type');
            $table->index('created_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};