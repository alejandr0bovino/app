<?php

class BookGenre extends Eloquent {

    /**
     * The database table used by the model.
     *
     * @var string
     */
    protected $table = 'book_genres';

    protected $fillable = array('name');

    public function books() {
        return $this->hasMany('Book', 'genre_id');
    }
}