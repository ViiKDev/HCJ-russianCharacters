const rusChars = ['А', 'Б', 'В', 'Г', 'Д', 'Е', 'Ё', 'Ж', 'З', 'И', 'Й', 'К', 'Л', 'М', 'Н', 'О', 'П', 'Р', 'С', 'Т', 'У', 'Ф', 'Х', 'Ц', 'Ч', 'Ш', 'Щ', 'Ь', 'Ы', 'Ъ', 'Э', 'Ю', 'Я']
var rusCharsDisplay = new Set(rusChars)
var rand
var letter
var precision = []
var overall = []
var right = 0
var wrong = 0
var soundEnabled = getSoundFromLS()
var theme = getThemeFromLS() //dark - default
var themes = ['Dark', 'Purple', 'Green', 'Light']

selectTheme(theme)
themeButtonIcon(false)
soundButtonIcon(false)

rusCharsDisplay.forEach((c, i) => {
	rusCharsDisplay[i] = c + c.toLowerCase();
})

selectChar()

document.querySelector('#answer').addEventListener('click', function () {
	playSound(rand + 1)
})

document.querySelector('#mute').addEventListener('click', function () {
	soundButtonIcon(true)
	localStorage.setItem('sound', soundEnabled)
})

document.querySelector('#theme').addEventListener('click', () => themeButtonIcon(true))

$('#answer').on('input', function ({ target }) {
	let x = target.value
	if (precision.length >= 10) {
		precision.shift()
	}
	$('#rw').removeClass('fa-check')
	$('#rw').removeClass('fa-times')
	$('#lastInput')[0].innerHTML = x.toUpperCase() + x.toLowerCase()
	if (x.toUpperCase() == letter) {
		$('#rw').toggleClass('fa-check')
		precision.push(1)
		overall.push(1)
		right += 1
		selectChar()
		playSound(rand + 1)
	} else {
		$('#rw').toggleClass('fa-times')
		precision.push(0)
		overall.push(0)
		wrong += 1
	}
	target.value = ''

	$('#precision')[0].innerHTML = `Last 10: ${calculatePrecision(precision)}% - Right/Wrong: ${right}/${wrong} - Overall: ${calculatePrecision(overall)}%`
})

function selectChar() {
	rand = Math.floor(Math.random() * rusChars.length)
	letter = rusChars[rand]
	const question = document.querySelector('#question')
	question.innerHTML = rusCharsDisplay[letter]
}

function calculatePrecision(array) {
	let y = 0
	array.forEach((index) => {
		y += index
	});
	y = Math.floor(y / array.length * 100)
	return y
}

function playSound(s) {
	var audio = document.querySelector('#audio');
	audio.setAttribute('src', 'wwwroot/ext/Sound' + s + '.mp3')
	if (soundEnabled) {
		audio.play()
	}
}

function themeCicle() {
	if (theme >= 3) {
		theme = 0
	} else {
		theme++
	}
	localStorage.setItem('theme', theme)
	selectTheme(theme)
}

function selectTheme(t) {
	if (t == 0) {

		document.documentElement.style.setProperty('--body-color', 'rgb(38, 38, 38)');
		document.documentElement.style.setProperty('--main-content-color', 'rgb(58, 58, 58)');
		document.documentElement.style.setProperty('--font-color', 'rgb(255, 255, 255)');
		document.documentElement.style.setProperty('--precision-color', 'rgb(207, 207, 207)');
		document.documentElement.style.setProperty('--buttons-background', '#ffffff15');
		document.documentElement.style.setProperty('--buttons-hover', '#ffffff21');
	} else if (t == 1) {

		document.documentElement.style.setProperty('--body-color', 'rgb(35, 15, 44)');
		document.documentElement.style.setProperty('--main-content-color', 'rgb(48, 23, 60)');
		document.documentElement.style.setProperty('--font-color', 'rgb(207, 207, 207)');
		document.documentElement.style.setProperty('--precision-color', 'rgb(190, 190, 190)');
		document.documentElement.style.setProperty('--buttons-background', '#ffffff15');
		document.documentElement.style.setProperty('--buttons-hover', '#ffffff21');
	} else if (t == 2) {

		document.documentElement.style.setProperty('--body-color', 'rgb(20, 58, 51)');
		document.documentElement.style.setProperty('--main-content-color', 'rgb(27, 78, 69)');
		document.documentElement.style.setProperty('--font-color', 'rgb(207, 207, 207)');
		document.documentElement.style.setProperty('--precision-color', 'rgb(190, 190, 190)');
		document.documentElement.style.setProperty('--buttons-background', '#ffffff15');
		document.documentElement.style.setProperty('--buttons-hover', '#ffffff21');
	} else if (t == themes.length - 1) {

		document.documentElement.style.setProperty('--body-color', 'rgb(253, 253, 253)');
		document.documentElement.style.setProperty('--main-content-color', 'rgb(211, 211, 211)');
		document.documentElement.style.setProperty('--font-color', 'rgb(0, 0, 0)');
		document.documentElement.style.setProperty('--precision-color', 'rgb(48, 48, 48)');
		document.documentElement.style.setProperty('--buttons-background', '#ffffff3c');
		document.documentElement.style.setProperty('--buttons-hover', '#ffffff6e');

	}

	document.querySelector('#theme').setAttribute('title', `${themes[t]} - Set to ${state = (typeof themes[t + 1] !== "undefined") ? themes[t + 1] : themes[0]}`)
}

function getThemeFromLS() {
	let lSTheme = localStorage.getItem('theme')
	return lSTheme ? parseInt(lSTheme) : 0
}

function getSoundFromLS() {
	let lSSound = localStorage.getItem('sound')
	return lSSound != null ? lSSound == 'true' ? true : false : true
}

function themeButtonIcon(arg) {
	$('#theme i').removeClass('fa-moon')
	$('#theme i').removeClass('fa-gear')
	$('#theme i').removeClass('fa-sun')
	if (arg) {
		themeCicle()
	}
	if (theme == 0) {
		$('#theme i').toggleClass('fa-moon')
	} else if (theme == themes.length - 1) {
		$('#theme i').toggleClass('fa-sun')
	} else {
		$('#theme i').toggleClass('fa-gear')
	}
}

function soundButtonIcon(arg) {
	if (arg) {
		soundEnabled = !soundEnabled
	}
	if (soundEnabled) {
		$('#mute i').addClass('fa-volume-high')
		$('#mute i').removeClass('fa-volume-xmark')
		document.querySelector('#mute').setAttribute('title', 'Mute')
	} else {
		$('#mute i').addClass('fa-volume-xmark')
		$('#mute i').removeClass('fa-volume-high')
		document.querySelector('#mute').setAttribute('title', 'Unmute')
	}
}