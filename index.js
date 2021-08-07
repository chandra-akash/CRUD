const express = require( 'express' )
var users = require( "./users.json" );
const app = express();
const port = 8000;
app.use( express.json() );

app.get( '/', ( req, res ) =>
{
    console.log( 'Welcome To Home Page' );
    res.send( 'Welcome To Home Page' );
} );

app.get( '/users', ( req, res ) =>
{
    console.log( 'users: ', users );
    res.send( users );
} );

app.post( '/users', ( req, res ) =>
{
    let newAddUser = req.body
    console.log( "newAddUser: ", req.body );
    let details = [ ...users, newAddUser ]
    console.log( 'post details: ', details );
    console.log( 'New User Successfully added' );
    res.send( details );
} );

app.patch( '/users/:id', ( req, res ) =>
{
    let patch_id = req.params.id;
    console.log( 'patch_id: ', patch_id );
    console.log( 'body_name: ', req.body.first_name );

    let new_first_name = req.body.first_name;
    let new_last_name = req.body.last_name;
    let new_email = req.body.email;
    let new_gender = req.body.gender;
    let new_ip_address = req.body.ip_address;
    let new_age = req.body.age;

    users.map( ( el ) =>
    {
        if ( el.id == patch_id )
        {
            console.log( 'patch_el_id: ', el.id );
            console.log( 'patch_el_name: ', el.first_name );

            el.first_name = new_first_name;
            el.last_name = new_last_name;
            el.email = new_email;
            el.gender = new_gender;
            el.ip_address = new_ip_address;
            el.age = new_age;
        }
    } );

    console.log( 'updated users:', users );
    res.send( users )

    console.log( `The user with the id: ${ patch_id } has been updated` );
    res.send( `The user with the id: ${ patch_id } has been updated` );
} );

app.delete( '/users/:id', ( req, res ) =>
{
    let del_id = req.params.id;
    users = users.filter( ( user ) => user.id != del_id );

    console.log( 'updated users:', users );
    res.send( users )

    console.log( `The user with the id: ${ del_id } has been deleted` );
    res.send( `The user with the id: ${ del_id } has been deleted` );
} );

app.listen( port, () =>
{
    console.log( `app listening on port ${ port }!` )
} );