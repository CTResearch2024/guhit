@extends(backpack_view('blank'))
@section('before_styles')
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

@endsection

@section('content')
<div class="container-fluid">
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="{{ backpack_url() }}">Home</a></li>
            <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
    </nav>

    <!-- Search Bar -->
    <form class="d-flex mb-4">
        <input class="form-control me-2" type="search" placeholder="Search..." aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
    </form>

    <!-- User Role Boxes -->
    <div class="row">
        @php
            $boxClasses = 'col-lg-3 col-md-6 mb-4';
            $cardClasses = 'card d-flex flex-row align-items-center shadow-sm';
            $cardStyle = 'min-height: 50px; padding-left: 20px;';
            $iconSize = 'fa-3x';
            $textContainerStyle = 'margin-left: 20px; flex-grow: 1; margin-top: 10px; margin-bottom: 10px; ';
            $textSize = 'font-size: 20px;';
        @endphp

        <!-- New Members Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #ffc107; color: white; {{ $cardStyle }}">
                <i class="fas fa-users {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Users</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $newMembersCount }}</p>
                </div>
            </div>
        </div>

        <!-- Moderators Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #007bff; color: white; {{ $cardStyle }}">
                <i class="fas fa-user-shield {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Moderators</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $moderatorsCount }}</p>
                </div>
            </div>
        </div>

        <!-- Content Managers Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #28a745; color: white; {{ $cardStyle }}">
                <i class="fas fa-tasks {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Content Managers</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $contentManagersCount }}</p>
                </div>
            </div>
        </div>

        <!-- Admins Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #dc3545; color: white; {{ $cardStyle }}">
                <i class="fas fa-user-cog {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Admins</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $adminsCount }}</p>
                </div>
            </div>
        </div>

        <!-- Minted NFTs Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #17a2b8; color: white; {{ $cardStyle }}">
                <i class="fas fa-coins {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Minted NFTs</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $mintedNftsCount }}</p>
                </div>
            </div>
        </div>

        <!-- Submitted Artworks Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #6f42c1; color: white; {{ $cardStyle }}">
                <i class="fas fa-paint-brush {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Submitted Artworks</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $submittedArtworksCount }}</p>
                </div>
            </div>
        </div>

        <!-- Rejected Artworks Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #f54242; color: white; {{ $cardStyle }}">
                <i class="fas fa-times-circle {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Rejected Artworks</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $rejectedArtworksCount }}</p>
                </div>
            </div>
        </div>

        <!-- Approved Artworks Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #42f55d; color: white; {{ $cardStyle }}">
                <i class="fas fa-check-circle {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Approved Artworks</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $approvedArtworksCount }}</p>
                </div>
            </div>
        </div>

        <!-- Pending Artworks Box -->
        <div class="{{ $boxClasses }}">
            <div class="{{ $cardClasses }}" style="background-color: #f5da42; color: white; {{ $cardStyle }}">
                <i class="fas fa-hourglass-half {{ $iconSize }}"></i>
                <div style="{{ $textContainerStyle }}">
                    <h5 class="card-title">Pending Artworks</h5>
                    <p class="card-text" style="{{ $textSize }}">{{ $pendingArtworksCount }}</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Divider -->
    <hr class="my-4" />

    <!-- Chart Section -->
    <div class="row">
        <div class="col-12">
            <canvas id="artworkSubmissionsChart" width="400" height="150"></canvas>
        </div>
    </div>

</div>

<!-- Include Chart.js and Chart Initialization Script -->
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
    const ctx = document.getElementById('artworkSubmissionsChart').getContext('2d');
    
    const artworkSubmissionsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [
                @foreach ($artworkSubmissions as $submission)
                    "{{ $submission->date }}",
                @endforeach
            ],
            datasets: [
                {
                    label: 'Submitted Artworks',
                    data: [
                        @foreach ($artworkSubmissions as $submission)
                            {{ $submission->submitted }},
                        @endforeach
                    ],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Approved Artworks',
                    data: [
                        @foreach ($artworkSubmissions as $submission)
                            {{ $submission->approved }},
                        @endforeach
                    ],
                    borderColor: 'rgba(54, 162, 235, 1)', // Blue for approved
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Rejected Artworks',
                    data: [
                        @foreach ($artworkSubmissions as $submission)
                            {{ $submission->rejected }},
                        @endforeach
                    ],
                    borderColor: 'rgba(255, 99, 132, 1)', // Red for rejected
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Minted Artworks',
                    data: [
                        @foreach ($artworkSubmissions as $submission)
                            {{ $submission->minted }},
                        @endforeach
                    ],
                    borderColor: 'rgba(153, 102, 255, 1)', // Purple for minted
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Artwork Submissions and Status',
                    font: {
                        size: 18
                    }
                }
            }
        }
    });
    </script>
    @endsection
    
