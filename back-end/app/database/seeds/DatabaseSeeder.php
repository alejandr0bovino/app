<?php


class DatabaseSeeder extends Seeder {

	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		Eloquent::unguard();

		// call our class and run our seeds
		$this->call('BirdsAppSeeder');
		$this->command->info('Birds app seeds finished.'); // show information in the command line after everything is run
	}

}

// our own seeder class
// usually this would be its own file
class BirdsAppSeeder extends Seeder {
	
	public function run() {

		// clear our database ------------------------------------------
		DB::table('books')->delete();
		DB::table('book_genres')->delete();


		$genre1 = BookGenre::create(array(
			'name'         => 'Crime/Detective',			
		));
		$genre2 = BookGenre::create(array(
			'name'         => 'Fantasy',			
		));
		$genre3 = BookGenre::create(array(
			'name'         => 'Humor',			
		));
		$genre4 = BookGenre::create(array(
			'name'         => 'Mystery',			
		));
		$genre5 = BookGenre::create(array(
			'name'         => 'Science fiction',			
		));
		$genre6 = BookGenre::create(array(
			'name'         => 'Suspense',			
		));
          

		$this->command->info('book genres alive!');

	
		Book::create(array(
			'title'    => 'Great Expectations',
			'author'   => 'Dickens',
			'genre_id' => $genre3->id
		));
		Book::create(array(
			'title'    => 'Foundation',
			'author'     => 'Asimov',
			'genre_id' => $genre5->id
		));
		Book::create(array(
			'title'    => 'Treasure Island',
			'author'     => 'Stephenson',
			'genre_id' => $genre2->id
		));
		Book::create(array(
			'title'    => 'The Hunger Games',
			'author'     => 'Suzanne Collins',
			'genre_id' => $genre5->id
		));
		Book::create(array(
			'title'    => 'To Kill a Mockingbird',
			'author'     => 'Harper Lee',
			'genre_id' => $genre2->id
		));


		$this->command->info('Books Be free!');


		$this->command->info('They are terrorizing picnics!');

	}

}
