<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function create()
    {
        // Add Post পেজে Inertia রিটার্ন করবে
        return Inertia::render('Admin/Post/index');
    }
}
