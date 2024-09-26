@extends(backpack_view('layouts.vertical_dark'))

@section('content')
    <div class="container">
        <h1 class="mb-4">Verification Results</h1>

        <div class="row">
           <!-- Left Column: Verified Image -->
<div class="col-md-6">
    <div class="card mb-4">
        <div class="card-header">
            <h4>Artwork Details</h4>
        </div>
        <div class="card-body text-center">
        <p>{{ $imageUrl }}</p>
        <img src="{{ $imageUrl }}" alt="Uploaded Image" class="img-fluid rounded mb-4" style="max-width: 100%; height: auto;">
        </div>
    </div>
</div>


            <!-- Right Column: Similar Images -->
            <div class="col-md-6">
    <h4 class="mb-3">Similar Images Found</h4>
    @if (!empty($similarImages) && count($similarImages) > 0)
        <div class="row">
            @foreach ($similarImages as $image)
                <div class="col-md-12 mb-3">
                    <div class="card shadow-sm h-100 d-flex flex-row" style="max-width: 100%; padding: 10px;">
                        <img src="{{ $image['thumbnail'] }}" class="rounded" alt="{{ $image['title'] }}" style="width: 60px; height: 60px; margin-right: 10px;">
                        <div class="card-body" style="padding: 5px;">
                            <h6 class="card-title" style="font-size: 14px; margin-bottom: 5px;">{{ $image['title'] }}</h6>
                            <p class="card-text" style="font-size: 12px; margin-bottom: 5px;">Source: {{ $image['source'] }}</p>
                            <a href="{{ $image['link'] }}" target="_blank" class="text-primary" style="font-size: 12px;">{{ $image['link'] }}</a>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    @else
        <div class="alert alert-warning text-center">
            <p>No similar images found.</p>
        </div>
    @endif
</div>


        </div>

        <div class="d-flex justify-content-center mt-4">
            <a href="{{ route('submitted-artwork.index') }}" class="btn btn-secondary">Back to Artworks</a>
        </div>
    </div>
@endsection
