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
        Schema::create('buildings', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('Building name');
            $table->string('code')->unique()->comment('Building code identifier');
            $table->text('description')->nullable()->comment('Building description');
            $table->decimal('latitude', 10, 8)->comment('Latitude coordinate');
            $table->decimal('longitude', 11, 8)->comment('Longitude coordinate');
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active')->comment('Building status');
            $table->timestamps();
            
            $table->index('status');
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('buildings');
    }
};