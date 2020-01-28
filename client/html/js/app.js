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

	function toggleHomeScreen() {
		if ($('#homeScreen').is(':visible')) {
			$('#homeScreen').hide();
			$('#appScreen').show();
			$('#homeButton').show();
		} else {
			$('#homeScreen').show();
			$('#appScreen').hide();
			$('#homeButton').hide();
		}
	}
	// #endregion

	// #region TEST
	updateSmartphone({
		batteryPercent: 88,
		currentTime: '23:09'
	});
	// #endregion

	// #region ALT
	if ('alt' in window) {
		alt.on('updateSmartphone', (data) => {
			updateSmartphone(data);
		});
	}
	// #endregion

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
		if (!noAppScreen.includes($(this).attr('id'))) toggleHomeScreen();
	});
});
