@if (backpack_user()->is_admin) 
    <a href="{{ route('admin.withdrawFunds') }}" class="btn btn-primary">
        Withdraw Funds
    </a>
@endif