function generateUrl(username){
    fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => {
        if(!response.ok){
            console.log(response.status)
            throw new Error(`Status Error Code: ${response.status}`)
        }
        return response.json()
    })
    .then(data => {
        console.log(data)
        const repos = [];
        for(let i = 1; i < data.length; i++){
            repos.push(`<p>${data[i].name}: <a href=${data[i].html_url} target=_blank>Repo Link</a></p>`)
        }
        $('main').html(repos);
        $('main').removeClass('hidden')
    })
    .catch(error => {
        console.log(error);
        $('main').html('<p>I was unable to find that username.  Please try again.</p>')
    })
}

function formSubmission(){
    $('form').submit(e => {
        e.preventDefault();
        let username = $(e.target).find('input[name="user-name"]').val();
        generateUrl(username);
    })
}


$(formSubmission());