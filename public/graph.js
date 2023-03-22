const stepsData = {
	type: 'bar',
	data: {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				data: [10, 20, 5, 20, 40, 5],
				backgroundColor: '#17A220',
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
	},
};
const sleepTimeData = {
	type: 'bar',
	data: {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: '#17A220',
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
	},
};
const heartRateData = {
	type: 'line',
	data: {
		labels: ['1', '2', '3', '4', '5', '6'],
		datasets: [
			{
				data: [12, 19, 3, 5, 2, 3],
				backgroundColor: '#17A220',
				borderColor: 'green'
			},
		],
	},
	options: {
		plugins: {
			legend: {
				display: false,
			},
		},
	},
};

const changeTab = (event, tabName) => {
	const changeContentDisplay = () => {
		const tabContent = document.getElementsByClassName("tab-content");
		for (let i = 0; i < tabContent.length; i++) {
			tabContent[i].style.display = "none";
		}
	};
	const changeTabActive = () => {
		const tabLinks = document.getElementsByClassName("tab-links");
		for (let i = 0; i < tabLinks.length; i++) {
			tabLinks[i].className = tabLinks[i].className.replace(" active", "");
		}
	};
	const addActive = (event, tabName) => {
		document.getElementById(tabName).style.display = "block";
		event.currentTarget.className += " active";
	};
	changeContentDisplay();
	changeTabActive();
	addActive(event,tabName);
}

(() => {
	new Chart(document.getElementById('stepsChart'), stepsData);
	new Chart(document.getElementById('sleepTimeChart'), sleepTimeData);
	new Chart(document.getElementById('heartRateChart'), heartRateData);

	document.getElementById("defaultOpen").click();
})();