<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use App\Models\Category;
use App\Models\Order;
use Illuminate\Http\Request;
use GuzzleHttp\Promise\Create;

class ProductController extends Controller
{
    
    public function index()
    {
        //
        $products = Product::with(['category' => function ($query) {
            $query->select('id', 'name'); // تحديد الحقول التي تريد استرجاعها من العلاقة
        }])->get();
        $categories = Category::all();
        return Inertia::render('Home', [
            'products' =>$products,
            'categories' => $categories,

        ]);
    }

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
        $imagePath = $request->file('image')->store('products', 'public');
        Product::create([
            'image' => $imagePath,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
            'category_id' => $request->category_id,
        ])->save();
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
        return redirect()->route('Home');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        
        $product->delete();
        return Inertia::render('Home', [
            'products' =>'Product deleted successfully.'
        ]);
    }
}
