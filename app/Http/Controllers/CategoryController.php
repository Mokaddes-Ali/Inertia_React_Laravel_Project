<?php

namespace App\Http\Controllers;


use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Flasher\Prime\FlasherInterface;
use Inertia\Inertia;

class CategoryController extends Controller
{
    // Add category form
    public function index()
    {
        return Inertia::render('Categories/Create');

    }



    // Show all categories
    public function show()
    {
        $categories = Category::orderBy('id', 'desc')->get();
        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }




    // Insert category data
    public function store(Request $request, FlasherInterface $flasher)
    {
        $request->validate([
            'name' => 'required|string|max:50',
            'remarks' => 'nullable|string|max:200',
        ]);

        $insert = Category::create([
            'name' => $request->name,
            'remarks' => $request->remarks,
            'slug' => uniqid().rand(10000, 10000000),
            'status' => 1,
            'creator' => Auth::user()->id,
        ]);

        if ($insert) {
            $flasher->addSuccess('Data Inserted Successfully.', [
                'position' => 'top-center',
                'timeout' => 3000,
            ]);
            return redirect()->back();
        } else {
            return back()->with('fail', 'Data insertion failed');
        }
    }


    // Edit category form
    public function edit($id)
    {
        $category = Category::findOrFail($id);
        return Inertia::render('Categories/Edit', [
            'category' => $category
        ]);

    }

    public function update(Request $request)
    {
        $id = $request->id;

        $request->validate([
            'name' => 'required|string|max:50',
            'remarks' => 'nullable|string|max:200',
        ]);

        $update = Category::where('id', $id)->update([
            'name' => $request->name,
            'remarks' => $request->remarks,
            'editor' => Auth::user()->id,
        ]);

        if ($update) {
            return redirect()->route('categories.index')->with('success', 'Category updated successfully.');
        } else {
            return back()->with('fail', 'Failed to update category.');
        }
    }


    // Delete category data
    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return redirect()->back()->with('success', 'Category deleted successfully.');

    }
}
