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
        Schema::create('rooms', function (Blueprint $table) {
            $table->id();
            $table->foreignId('building_id')->constrained()->cascadeOnDelete();
            $table->string('name')->comment('Room name');
            $table->string('code')->comment('Room code identifier');
            $table->text('description')->nullable()->comment('Room description');
            $table->decimal('latitude', 10, 8)->comment('Latitude coordinate');
            $table->decimal('longitude', 11, 8)->comment('Longitude coordinate');
            $table->enum('status', ['active', 'inactive', 'maintenance'])->default('active')->comment('Room status');
            $table->timestamps();
            
            $table->index(['building_id', 'status']);
            $table->index(['latitude', 'longitude']);
            $table->unique(['building_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rooms');
    }
};