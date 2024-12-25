<?php

namespace App\Http\Controllers;

use App\Models\Product;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $products = Product::with('category')->get();
        // return response()->json($products);

        return Inertia::render('Home', [
            'products' => response()->json($products)
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'name' => 'required',
            'category_id' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'image' => 'required',
        ]);
        Product::create($request->all());
        return redirect()->route('Home');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $product = Product::with('category')->findOrFail($id);
        return Inertia::render('Home', [
            'products' => response()->json($product)
        ]);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
        $request->validate([
            'name' => 'required|string|max:255|min:3',
            'category_id' => 'required',
            'price' => 'required',
            'quantity' => 'required',
            'image' => 'required',
        ]);

        $product = Product::findOrFail($id);
        $product->update($request->all());
        return Inertia::render('Home', [
            'products' => response()->json($product)
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        Product::destroy($id);
        return Inertia::render('Home', [
            'products' => response()->json(['message' => 'Product deleted successfully.'])
        ]);
    }
}
