$(() => {
	// #region CONFIG
	let isCharging = false;
	let isAirplane = false;
	let audioVolume = 0.1;

	let audioCharge = new Audio('./audio/charge.mp3');
	audioCharge.volume = audioVolume;
	let audioClick = new Audio('./audio/click.mp3');
	audioClick.volume = audioVolume;

	let noSound = ['appChargeButton'];
	let noAppScreen = ['appChargeButton', 'appAirplaneButton'];
	// #endregion

	// #region TEST
	// toggleHomeScreen();
	updateSmartphone({
		batteryPercent: 88,
		currentTime: '23:09'
	});
	receiveContacts([
		{ name: 'Abbigail Mccabe', phone: '9300' },
		{ name: 'Brody Kaufman', phone: '9301' },
		{ name: 'Charlie Elliott', phone: '9302' },
		{ name: 'Eilish Maddox', phone: '9303' },
		{ name: 'Elliott Morales', phone: '9304' },
		{ name: 'Elwood Valencia', phone: '9305' },
		{ name: 'Fynley Bowers', phone: '9306' },
		{ name: 'Kingston Farrell', phone: '9307' },
		{ name: 'Kylie Edge', phone: '9308' },
		{ name: 'Lorelai Harmon', phone: '9309' },
		{ name: 'Marjorie Rayner', phone: '9310' },
		{ name: 'Owain Mathis', phone: '9311' },
		{ name: 'Peyton Harmon', phone: '9312' },
		{ name: 'Rami Franks', phone: '9313' },
		{ name: 'Reon Bean', phone: '9314' },
		{ name: 'Samara Wise', phone: '9315' },
		{ name: 'Simran Kirkland', phone: '9316' },
		{ name: 'Teri Berger', phone: '9317' },
		{ name: 'Tj Howell', phone: '9318' },
		{ name: 'Uzair Warner', phone: '9319' }
	]);
	// #endregion

	// #region FUNCTIONS
	function updateSmartphone(data) {
		let batteryIcon = 'battery-empty';
		if (data.batteryPercent >= 25) batteryIcon = 'battery-quarter';
		if (data.batteryPercent >= 50) batteryIcon = 'battery-half';
		if (data.batteryPercent >= 75) batteryIcon = 'battery-three-quarters';
		if (data.batteryPercent >= 90) batteryIcon = 'battery-full';
		$('#battery')
			.removeClass()
			.addClass('fas fa-' + batteryIcon);

		$('#clock').text(data.currentTime);
	}

	function receiveContacts(data) {
		if ($('#appContacts').length) {
			$('#appContactsList').html('');
			let newHTML = '';
			data.forEach((d) => {
				newHTML += `
				<div class='contact'>
					<div>${d.name}</div>
					<div>${d.phone}</div>
				</div>`;
			});
			$('#appContactsList').html(newHTML);
		}
	}

	function toggleHomeScreen(screen = null) {
		if ($('#homeScreen').is(':visible')) {
			$('#homeScreen').hide();
			$('#appScreen').show();
			$('#appScreen > div').hide();
			$('#homeButton').show();
			if (screen)
				$((showScreen = '#' + screen.replace('Button', ''))).show();
		} else {
			$('#homeScreen').show();
			$('#appScreen').hide();
			$('#homeButton').hide();
		}
	}
	// #endregion

	// #region ALT
	if ('alt' in window) {
		alt.on('smartphone:update', (data) => {
			updateSmartphone(data);
		});
		alt.on('smartphone:receiveContacts', (data) => {
			receiveContacts(data);
		});
	}
	// #endregion

	// #region EVENTS
	$('#appContactsSearch').on('keyup change', function() {
		let searchString = $(this)
			.val()
			.toLowerCase();
		if (searchString.length) {
			$('.contact').hide();
			$('.contact').each(function() {
				if (
					$(this)
						.children()
						.text()
						.toLowerCase()
						.includes(searchString)
				)
					$(this).show();
			});
		} else {
			$('.contact').show();
		}
	});

	$('#appChargeButton').click(() => {
		audioCharge.play();

		if (isCharging) {
			isCharging = false;
			$('#battery').css('color', '#FFF');
		} else {
			isCharging = true;
			$('#battery').css('color', 'rgb(110, 255, 128)');
		}
	});

	$('#appAirplaneButton').click(() => {
		if (isAirplane) {
			isAirplane = false;
			$('#signal')
				.removeClass('fa-plane')
				.addClass('fa-signal');
		} else {
			isAirplane = true;
			$('#signal')
				.removeClass('fa-signal')
				.addClass('fa-plane');
		}
	});

	$('#homeButton').click(() => {
		toggleHomeScreen();
	});

	$('.app').click(function() {
		if (!noSound.includes($(this).attr('id'))) audioClick.play();
		if (!noAppScreen.includes($(this).attr('id')))
			toggleHomeScreen($(this).attr('id'));
	});

	$('#appContactsButton').click(() => {
		if ('alt' in window) alt.emit('smartphone:requestContacts');
	});
	// #endregion
});
