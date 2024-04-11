<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ChatCreated;
use App\Http\Resources\ChatResource;
use App\Models\Chat;
use App\Models\User;
use Inertia\Inertia;

class ChatController extends Controller
{
    public function index($id)
    {
        $r_user = User::where('id', $id)
        ->with('account')
        ->first();

        $chat_messages = Chat::where(function($query) use ($id) {
            $query->where('user_id', $id)
                ->where('r_user_id', auth()->id());
         })
        ->orWhere(function($query) use ($id) {
            $query->where('user_id', auth()->id())
                ->where('r_user_id', $id);
         })
        ->with('user')
        ->with('r_user')
        ->oldest()
        ->get();

        return Inertia::render('Chat/Index', [
            'chat_messages' => $chat_messages,
            'r_user' => $r_user
        ]);
    }

    public function list($id)
    {
        $chat_messages = Chat::where(function($query) use ($id) {
            $query->where('user_id', $id)
                ->Where('r_user_id', auth()->id());
         })
        ->orWhere(function($query) use ($id) {
            $query->where('user_id', auth()->id())
                ->Where('r_user_id', $id);
         })
        ->with('user')
        ->with('r_user')
        ->oldest()
        ->get();

        return ChatResource::collection($chat_messages);
    }

    public function store(Request $request)
    {
        // 注： バリデーションは省略してます

        $chat_message = new Chat();
        $chat_message->user_id = auth()->id();
        $chat_message->r_user_id = $request->r_user_id;
        $chat_message->message = $request->message;
        $chat_message->save();

        ChatCreated::dispatch($chat_message); // ブロードキャストを実行

        return to_route('chat.index', $request->r_user_id); // リダイレクト
    }
}
