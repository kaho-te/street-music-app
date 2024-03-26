<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PostLikeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Post $post)
    {
        $post->liked()->attach(auth()->id());
        return back();
    }

    /**
     * Display the specified resource.
     */
    public function show()
    {
        $favorite = Post::with('liked')->whereHas('liked', function($query){
            $query->where('user_id', auth()->id());
        })->with('user.account')->get();

        return Inertia::render('PlayList', [
            'favorite' => $favorite
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        $post->liked()->detach(auth()->id());
        return back();
    }
}
