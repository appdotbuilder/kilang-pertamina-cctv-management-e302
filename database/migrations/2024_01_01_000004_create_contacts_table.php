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
        Schema::create('contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Contact name');
            $table->string('title')->comment('Contact title/position');
            $table->string('email')->comment('Contact email');
            $table->string('phone')->comment('Contact phone number');
            $table->string('whatsapp')->nullable()->comment('WhatsApp number');
            $table->text('address')->comment('Contact address');
            $table->enum('status', ['active', 'inactive'])->default('active')->comment('Contact status');
            $table->timestamps();
            
            $table->index('status');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};