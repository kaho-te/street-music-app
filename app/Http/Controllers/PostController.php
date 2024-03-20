<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::get();
        return Inertia::render('Home', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        return Inertia::render('AddMusic',[
            'position' => $request
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = auth()->id();
        if ($request->hasFile('music')) {
            $audio = $request->file('music');
            $file = Storage::putFile('audio/'.$userId, $audio);
            $filename = basename($file);
            // $audio->store('public/audio'.$userId);
        } else {
            return Inertia::render('Home');
        }
        $user = $request->user();

        $post = $user->posts()->create([
            'story' => $request->story,
            'music' => $filename,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude
        ]);
        // return response()->json(['success' => false], 400);
        // return to_route('posts.index');
        return Inertia::render('Home');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::where('id', $id)->with('user')->with('comments')->first();
        $isLike = Post::find($id)->liked()->pluck('users.id')->contains(auth()->id());

        return Inertia::render('PlayMusic', [
            'post' => $post,
            'isLike' => $isLike
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Post $post)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Post $post)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        //
    }
}
