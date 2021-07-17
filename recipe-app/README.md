# Routing Tutorial

## Rout guards

The router supports multiple guard interfaces:

- **CanActivate** to mediate navigation to a route.
- **CanActivateChild** to mediate navigation to a child route.
- **CanDeactivate** to mediate navigation away from the current route.
- **Resolve** to perform route data retrieval before route activation.
- **CanLoad** to mediate navigation to a feature module loaded asynchronously.

### CanActive
- Limit access by rol or user

#### Use a guard to redirect the user to the login page

- Generate Guard

    - `ng generate guard auth/auth`

### CanActivateChild
- Limit the access to the child routes
- Similar to CanActive, but runs before any child route access

### CanDeactivate
- Handle unsave changes

You need to handle the user confirmation so
- `ng generate service dialog`

Generate the guard for canDeactivate
- Same steps than CanActivate, but choose carefully

### Resolve
- Pre ferch data before render it

You need to create a service to handle a resolve
- `ng generate service crisis-center/crisis-detail-resolver`

### Async Load
- Use it when you have modules that are going to be load for specific reasons

#### can load guard
- Use with CanActive, the latest only prevents the access, the former will avoid unnecessary loading

#### Preload Background
LOAD
