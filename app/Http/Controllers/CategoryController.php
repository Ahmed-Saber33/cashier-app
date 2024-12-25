<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Home', [
            'categories' => response()->json(response()->json($categories))
        ]);

    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        Category::create($request->all());
        return response()->json(['message' => 'Category created successfully.']);

        return Inertia::render(['message' => 'Category created successfully.']);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return Inertia::render(['message' => 'Category updated successfully.']);
    }

    public function destroy($id)
    {

        Category::destroy($id);
        return Inertia::render(['message' => 'Category deleted successfully.']);
    }
}
