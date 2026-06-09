<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'Welcome')->name('home');
Route::get('/gallery', function () {
    $dbCakes = \App\Models\Cake::with('category')->get()->map(function ($cake) {
        return [
            'id' => $cake->id,
            'name' => $cake->name,
            'slug' => $cake->slug,
            'price' => $cake->price,
            'priceFormatted' => 'Rp ' . number_format($cake->price, 0, ',', '.'),
            'category' => $cake->category ? $cake->category->name : 'Uncategorized',
            'image' => $cake->image ? asset('storage/' . $cake->image) : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
        ];
    });

    $dbCategories = \App\Models\Category::all()->map(function ($cat) {
        return [
            'value' => $cat->name,
            'label' => $cat->name,
        ];
    });

    $categories = collect([['value' => 'All', 'label' => 'Semua']])->merge($dbCategories);

    return inertia('Gallery', [
        'categories' => $categories,
        'cakes' => $dbCakes
    ]);
})->name('gallery');
Route::get('/gallery/{slug}', function ($slug) {
    $cake = \App\Models\Cake::with('category')->where('slug', $slug)->first();
    
    if (!$cake) {
        return inertia('CakeDetail', [
            'cake' => null,
            'relatedCakes' => []
        ]);
    }

    $formattedCake = [
        'id' => $cake->id,
        'name' => $cake->name,
        'slug' => $cake->slug,
        'price' => $cake->price,
        'priceFormatted' => 'Rp ' . number_format($cake->price, 0, ',', '.'),
        'category' => $cake->category ? $cake->category->name : 'Uncategorized',
        'image' => $cake->image ? asset('storage/' . $cake->image) : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
        'longDescription' => $cake->description ?: 'Kue lezat dan spesial persembahan Jasmine Patisserie. Dibuat dengan bahan premium dan penuh cinta.',
        'servings' => 'Sesuai pesanan',
    ];

    $relatedCakes = \App\Models\Cake::with('category')
        ->where('category_id', $cake->category_id)
        ->where('id', '!=', $cake->id)
        ->limit(4)
        ->get()
        ->map(function ($c) {
            return [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'price' => $c->price,
                'priceFormatted' => 'Rp ' . number_format($c->price, 0, ',', '.'),
                'category' => $c->category ? $c->category->name : 'Uncategorized',
                'image' => $c->image ? asset('storage/' . $c->image) : 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1089&auto=format&fit=crop',
            ];
        });

    return inertia('CakeDetail', [
        'cake' => $formattedCake,
        'relatedCakes' => $relatedCakes
    ]);
})->name('cake.detail');
Route::inertia('/custom-designer', 'CustomDesigner')->name('custom-designer');
