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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("activity_id");
            $table->string('name');
            $table->string('description')->nullable();

            $table->string("published_trigger");
            $table->date("trigger_date")->nullable();
            $table->timestamp("finished_at")->nullable();
            $table->date("published_at")->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign("activity_id")->references("id")->on("activities");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
