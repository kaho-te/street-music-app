<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CommentController extends Controller
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
    public function store(Request $request)
    {
        $userId = auth()->id();
        if ($request->hasFile('music')) {
            $audio = $request->file('music');
            $file = Storage::putFile('public/audio/'.$userId, $audio);
            $filename = basename($file);
        } else {
            return Inertia::render('PlayMusic');
        }
        $user = $request->user();

        $post = $user->comments()->create([
            'text' => $request->text,
            'music' => $filename,
            'post_id' => $request->post_id
        ]);

        return to_route('post.show', $request->post_id);
    }

    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $comment = Comment::find($id);
        $post_id = $comment->post_id;
        $music = $comment->music; 
        Storage::disk('public')->delete('audio/'.auth()->id().'/'.$music);
        $comment->delete();
        return to_route('post.show', $post_id);
    }
}
