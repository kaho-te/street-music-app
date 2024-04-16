<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use FFMpeg\FFMpeg;

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
        $filename = "";
        if ($request->hasFile('music')) {
            $wavAudio = $request->file('music');
            $wavPath = $wavAudio->getPathname();
            // $file = Storage::putFile('public/audio/'.$userId, $audio);
            // 出力ファイルのパスを設定
            $outputPath = storage_path('app/public/audio/') . $userId . '/' . uniqid() . '.mp3';

            // FFMpegを使用してWAVをMP3に変換
            $ffmpeg = FFMpeg::create();
            $audio = $ffmpeg->open($wavPath);
            $format = new \FFMpeg\Format\Audio\Mp3();
            $audio->save($format, $outputPath);
            $filename = basename($outputPath);
        }
        $user = $request->user();

        $post = $user->posts()->create([
            'story' => $request->story,
            'music' => $filename,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
        ]);

        return to_route('posts.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $post = Post::where('id', $id)
            ->with('user.account')
            ->with('comments.user.account')
            ->withCount('liked')
            ->withCount('comments')
            ->first();
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
    public function destroy($id)
    {
        $music = Post::find($id)->music; 
        Storage::disk('public')->delete('audio/'.auth()->id().'/'.$music);
        Post::find($id)->delete();
        return to_route('posts.index');
    }
}
