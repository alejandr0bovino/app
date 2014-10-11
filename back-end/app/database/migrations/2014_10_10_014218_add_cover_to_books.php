<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCoverToBooks extends Migration {

	public function up()
	{
		Schema::table('books', function(Blueprint $table)
		{
			$table->string('cover')->after('abstract');
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
	    Schema::table('books', function(Blueprint $table) {
         $table->dropColumn('cover');
      });
	}


}
