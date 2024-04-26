<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Instrument;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
// use FFMpeg\FFMpeg;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $posts = Post::with('user.account')
        ->with('instrument')
        ->with('genre')
        ->latest()->get();
        return Inertia::render('Timeline', [
            'posts' => $posts
        ]);
    }

    public function get_posts()
    {
        $posts = Post::with('user.account')->latest()->get();
        return Inertia::render('Home', [
            'posts' => $posts
        ]);
    }

    public function search()
    {
        $posts = Post::with('user.account')->latest()->get();
        return Inertia::render('Timeline', [
            'posts' => $posts
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $instruments = Instrument::orderBy('id')->get();
        $genres = Genre::orderBy('id')->get();
        return Inertia::render('AddPost', [
            'instruments' => $instruments,
            'genres' => $genres,
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
            $outputPath = 'public/audio/'.$userId;
            // 出力ファイルのパスを設定
            // $outputDir = storage_path('app/public/audio/') . $userId;
            // $outputPath = storage_path('app/public/audio/') . $userId . '/' . uniqid() . '.mp3';

            if(!Storage::exists($outputPath)){
                Storage::makeDirectory($outputPath);
            }
            // FFMpegを使用してWAVをMP3に変換
            // $ffmpeg = FFMpeg::create();
            // $audio = $ffmpeg->open($wavPath);
            // $format = new \FFMpeg\Format\Audio\Mp3();
            // $audio->save($format, $outputPath);
            $file = Storage::putFile($outputPath, $wavAudio);
            $filename = basename($file);
        }
        $user = $request->user();

        $post = $user->posts()->create([
            'story' => $request->story,
            'music' => $filename,
            'instrument_id' => $request->instrument_id,
            'genre_id' => $request->genre_id,
            'r_instrument_id' => $request->r_instrument_id,
            // 'address' => $request->address,
            // 'latitude' => $request->latitude,
            // 'longitude' => $request->longitude,
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
