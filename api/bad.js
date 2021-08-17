export const badRequest = () => {
    const response = {
        "message": "bad request",
        "example": "/api/v1/github/lastcommit?repo=somerepo&user=user&branch=branch",
        "defaults": "user - minlaxz, branch - main",
        "required": "repo"
    }
    return new Response(JSON.stringify(response), {
        headers: {
            'Content-Type': 'application/json',
            ...corsHeaders
        }, status: 400
    })
}