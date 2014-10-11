<?php

class Book extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'books';

    protected $fillable = array('title', 'author', 'genre_id');

    public function genre() {
        return $this->belongsTo('BookGenre');
    }
}