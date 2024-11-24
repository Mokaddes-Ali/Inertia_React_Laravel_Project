<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('id', 'desc')->paginate(10);
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'remarks' => 'nullable|string|max:200',
        ]);

        Category::create([
            'name' => $request->name,
            'remarks' => $request->remarks,
            'slug' => uniqid(),
            'creator' => Auth::id(),
        ]);

        return redirect()->back()->with('success', 'Category added successfully!');
    }

    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'remarks' => 'nullable|string|max:200',
        ]);

        $category = Category::findOrFail($id);
        $category->update([
            'name' => $request->name,
            'remarks' => $request->remarks,
            'editor' => Auth::id(),
        ]);

        return redirect()->route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return redirect()->back()->with('success', 'Category deleted successfully!');
    }
}
