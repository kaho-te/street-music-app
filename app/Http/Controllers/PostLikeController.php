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
        $userId = auth()->id(); 

        $results = Post::with('liked')->whereHas('liked', function($query) use ($userId) {
            $query->where('user_id', $userId);
        })->with('user.account')
        ->addSelect(['isLike' => function ($query) use ($userId) {
            $query->selectRaw('count(*) > 0')
                  ->from('post_user')
                  ->whereColumn('post_id', 'posts.id')
                  ->where('user_id', $userId);
        }])
        ->withCount('liked')
        ->withCount('comments')
        ->get();

        return Inertia::render('ResultList', [
            'results' => $results,
            'search_flg' => 0,
            'category' => null,
            'search' => null
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
