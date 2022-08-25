<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Snippet;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SnippetPolicy
{
    use HandlesAuthorization;

    /**
     * Create a new policy instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function update(User $user, Snippet $snippet)
    {
        return $user->id === $snippet->user_id
            ? Response::allow()
            :
            Response::deny("You do not own this snippet");
    }

    public function delete(User $user, Snippet $snippet)
    {
        return $user->id === $snippet->user_id
            ? Response::allow()
            :
            Response::deny("You do not own this snippet");
    }

    public function store(User $user, Snippet $snippet)
    {
        return $user->id === $snippet->user_id
            ? Response::allow()
            :
            Response::deny("You do not own this snippet");
    }
}
