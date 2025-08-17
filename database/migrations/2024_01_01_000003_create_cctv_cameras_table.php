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
        Schema::create('cctv_cameras', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained()->cascadeOnDelete();
            $table->string('name')->comment('Camera name');
            $table->string('code')->unique()->comment('Camera code identifier');
            $table->string('ip_address')->comment('Camera IP address');
            $table->string('rtsp_url')->comment('RTSP stream URL');
            $table->string('hls_url')->nullable()->comment('HLS stream URL');
            $table->decimal('latitude', 10, 8)->comment('Latitude coordinate');
            $table->decimal('longitude', 11, 8)->comment('Longitude coordinate');
            $table->enum('status', ['online', 'offline', 'maintenance'])->default('offline')->comment('Camera status');
            $table->timestamp('last_ping')->nullable()->comment('Last ping timestamp');
            $table->text('notes')->nullable()->comment('Additional notes');
            $table->timestamps();
            
            $table->index(['room_id', 'status']);
            $table->index('status');
            $table->index('ip_address');
            $table->index(['latitude', 'longitude']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cctv_cameras');
    }
};