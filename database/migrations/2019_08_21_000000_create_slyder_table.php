<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSlyderTable extends Migration
{
    /**
     * Schema table name to migrate
     * @var string
     */
    public $tableName = 'slyder';

    /**
     * Run the migrations.
     * @table slyder
     *
     * @return void
     */
    public function up()
    {
        Schema::create($this->tableName, function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->increments('id');
            $table->string('titulo', 50);
            $table->string('descripcion', 100);
            $table->string('imagen', 50);
            $table->string('link', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
     public function down()
     {
       Schema::dropIfExists($this->tableName);
     }
}
