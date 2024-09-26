{{-- This file is used for menu items by any Backpack v6 theme --}}
<li class="nav-item">
    <a class="nav-link" href="{{ backpack_url('dashboard') }}">
        <i class="la la-home nav-icon"></i> {{ trans('backpack::base.dashboard') }}
    </a>
</li>

{{-- Admin Menu Items --}}
@if(backpack_user()->role_id === 2)  {{-- Admin --}}
    <x-backpack::menu-item title="Users" icon="la la-users" :link="backpack_url('user')" />
    <x-backpack::menu-item title="Roles" icon="la la-user-tag" :link="backpack_url('role')" />
    <x-backpack::menu-item title="Request badges" icon="la la-question" :link="backpack_url('request-badge')" />
    <x-backpack::menu-item title="NFT settings" icon="la la-cog" :link="backpack_url('n-f-t-setting')" />
@endif

{{-- Moderator Menu Items --}}
@if(backpack_user()->role_id === 3)  {{-- Moderator --}}
    <x-backpack::menu-item title="Submitted Artworks" icon="la la-paint-brush" :link="backpack_url('submitted-artwork')" />
@endif

<!-- <x-backpack::menu-item title="Messages" icon="la la-question" :link="backpack_url('message')" /> -->


{{-- Moderator Menu Items --}}
@if(backpack_user()->role_id === 4)  {{-- Moderator --}}
<x-backpack::menu-item title="Carousel images" icon="la la-question" :link="backpack_url('carousel-image')" />
@endif