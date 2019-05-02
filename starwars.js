/*_______________________________________________________
Centro Federal de Educação Tecnológica de Minas Gerais
Programação WEB: *** STAR WARS ***
Alunas: Daniele Lima, Daniela Lourenço
_______________________________________________________*/
(async () => {
	const response = await fetch('https://swapi.co/api/films/')
	const movies = await response.json()
	const nav = document.querySelector('#movies')
	const ul = document.createElement('ul')
	const current = localStorage.getItem('currentMovie') || 1
	const openingMusic = document.querySelector('#openingMusic')
	movies.results.forEach((movie) => {
		const li = document.createElement('li')
		li.setAttribute('data-episode-url', movie.url)
		li.innerText = `Episode ${movie.episode_id} - ${movie.title}`
		li.addEventListener('click', async (event) => {
			const responseMovie = await fetch(event.srcElement.getAttribute('data-episode-url'))
			const currentMovie = await responseMovie.json()
			const text = document.querySelector('.reading-animation')
			text.innerText = `Episode ${currentMovie.episode_id}\n${currentMovie.title}\n${currentMovie.opening_crawl}`
			localStorage.setItem('currenttMovie', currentMovie.episode_id)
			text.classList.remove('reading-animation');
			text.style.visibility = 'hidden';
			setTimeout(() => {
				text.classList.add('reading-animation');
				text.style.visibility = 'visible';
				openingMusic.currentTime = 9;
				openingMusic.play()
			}, 7);
		})
		ul.appendChild(li)
		if(movie.episode_id == current) {
			li.click()
		}
	})
	nav.appendChild(ul)
})()
