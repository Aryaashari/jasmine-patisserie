<?php

namespace App\Filament\Resources\Cakes\Schemas;

use Filament\Schemas\Schema;

class CakeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                \Filament\Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->required(),
                \Filament\Forms\Components\TextInput::make('name')
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(fn (string $operation, $state, $set) => $operation === 'create' ? $set('slug', \Illuminate\Support\Str::slug($state)) : null),
                \Filament\Forms\Components\TextInput::make('slug')
                    ->required()
                    ->maxLength(255)
                    ->unique(ignoreRecord: true),
                \Filament\Forms\Components\Textarea::make('description')
                    ->columnSpanFull(),
                \Filament\Forms\Components\TextInput::make('price')
                    ->required()
                    ->numeric()
                    ->prefix('Rp'),
                \Filament\Forms\Components\FileUpload::make('image')
                    ->image()
                    ->directory('cakes'),
                \Filament\Forms\Components\DateTimePicker::make('created_at')
                    ->label('Waktu Tambah')
                    ->native(false),
                \Filament\Forms\Components\DateTimePicker::make('updated_at')
                    ->label('Waktu Edit')
                    ->native(false),
            ]);
    }
}
