<?php

class BookController extends BaseController {

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    // public function getIndex() {
    //     sleep(1); // test progress bar
    //     //return Response::json(Book::get());        
    //     $books = Book::with('genre')->get();
    //     return Response::json($books);
    // }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function getGenres() {
        // $books = Book::with(array('genre' => function($query)
        // {
        //     $query->orderBy('name', 'desc');

        // }))->get();

        $genres = BookGenre::with('books')->get();
        return Response::json($genres);
    }

    // public function getBooksByGenre() {
    //     $scifi = BookGenre::where('name', '=', 'Science fiction')->first();
    //     $books = $scifi->books;
    //     return Response::json($books);
    // }

    public function getXss($id) {                
        return Response::json(Book::find($id));
    }

}