let albums = []

const addAlbumButton = document.getElementById('add-album-button');
const list = document.getElementById('list');
const titleInput = document.getElementById('text1');
const artistInput = document.getElementById('text2');

function updateList() {
    document.getElementById("list").innerHTML = ''
    albums.forEach(albums => {
        const liElement = document.createElement('li');
        liElement.id = albums._id;
        liElement.classList.add('album-item');

        //delete button
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.addEventListener('click', function(e) {
            e.stopPropagation();
            deleteAlbum(albums._id);
        })  

        //edit functionality - this section is AI generated
        const textSpan = document.createElement('span');
        textSpan.innerText = `${albums.title || 'Untitled'} - ${albums.artist || 'Unknown'}`;
        textSpan.classList.add('album-text');

        textSpan.contentEditable = true; 
        textSpan.addEventListener('dblclick', (e) => {
            e.stopPropagation();
            textSpan.focus(); 
        });

        textSpan.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                textSpan.blur(); 
            }
        });

        textSpan.addEventListener('blur', () => {
            const newText = textSpan.innerText.trim();
            const oldText = `${albums.title || 'Untitled'} - ${albums.artist || 'Unknown'}`;

            if (newText !== oldText) {
                const parts = newText.split(' - ');
                const newTitle = parts[0] || albums.title;
                const newArtist = parts[1] || albums.artist;
                
                editAlbum(albums._id, newTitle, newArtist);
            }
        });

        liElement.appendChild(textSpan); 
        //end of AI generated code

        liElement.appendChild(deleteButton);
        list.appendChild(liElement);
    });
}

addAlbumButton.addEventListener('click', async function () {
    let titleValue = document.getElementById('text1').value;
    let artistValue = document.getElementById('text2').value;

    await addAlbum(titleValue, artistValue); 

    titleInput.value = '';
    artistInput.value = '';
});

async function getAlbums() {
    const response = await fetch('users/');
    const data = await response.json();
    console.log('albums', data);
    albums = data;
    updateList();
}

getAlbums();

// add new album
async function addAlbum(title,artist) {
    const postData = {
        title: title,
        artist: artist
    }
    const response = await fetch('users/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(postData) 
    });
    const data = await response.json();
    console.log('added album:', data);
    getAlbums();
}

// delete an album
async function deleteAlbum(id) {
    const response = await fetch('users/' + id, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log('deleted item', data);
    getAlbums();
}

//edit an album
async function editAlbum(id, newTitle, newArtist) {
    const updatedData = {
        title: newTitle,
        artist: newArtist
    };

    try {
        const response = await fetch('users/' + id, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) throw new Error('Update failed');

        const data = await response.json();
        console.log('updated album:', data);

        getAlbums(); 

    } catch (error) {
        console.error("Error editing album:", error);
        alert("Failed to update album.");
    }
}