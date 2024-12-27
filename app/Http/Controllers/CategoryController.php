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
            'categories' => $categories
        ]);

    }

    public function store(Request $request)
    {
        $request->validate(['name' => 'required|string|max:255']);
        Category::create($request->all());

        return redirect()->route('Home');
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);
        $category->update($request->all());

        return Inertia::render('Home', [
            'category' => response()->json($category)
        ]);    }

    public function destroy($id)
    {

        Category::destroy($id);
        return Inertia::render('Home', [
            'Category' => 'Category deleted successfully.'
        ]);    }
}
