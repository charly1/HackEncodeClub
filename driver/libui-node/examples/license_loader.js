'use strict';

const libui = require('..');

const {
	size,
	datePicker,
	dateTimePicker,
	timePicker,
	separator,
	label,
	window,
	entry,
	searchEntry,
	passwordEntry,
	hBox,
	group,
	button,
	colors,
	colorButton,
	checkBox,
	spinbox,
	slider,
	progressBar,
	vBox,
	combobox,
	editableCombobox,
	radioButtons,
	tab,
	menu
} = require('./utils.js');

const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
reprehenderit
`;

let win = null;
let spin;
let slide;
let progress;
let colorBtn;
let labelLicense1;
let labelLicense2;
let btnLicense;

const onClosing = () => {
	win.close();
	libui.stopLoop();
	process.exit()
};

libui.Ui.onShouldQuit(() => {
	onClosing();
});

function onContentSizeChanged() {
	console.log(`window size: (${win.contentSize.w} x ${win.contentSize.h})`);
}

const updateValue = value => {
	if (value === spin.value) {
		return;
	}
	spin.value = value;
	slide.value = value;
	progress.value = value;
};

menu([
	{
		label: 'File',
		submenu: [
			{
				role: 'quit'
			}
		]
	},
	{
		label: 'Window',
		submenu: [
			{
				label: 'Full screen',
				click: () => {
					win.fullscreen = !win.fullscreen;
				}
			},
			{
				label: 'Borderless',
				click: () => {
					win.borderless = !win.borderless;
				}
			},
			{
				label: 'Reset size',
				click: () => {
					win.contentSize = size(400, 300);
				}
			}
		]
	}
]);

const winProps = {
	hasMenubar: true,
	title: 'My Great Software',
	width: 400,
	height: 300,
	onClosing,
	onContentSizeChanged: onContentSizeChanged
};

var btn_callbackRelay = () => { callback_btn() };
var callback_btn = () => {console.log("btn clicked")};

win = window(
	winProps,
	hBox(
		{padded: true},
		group(
				{margined: true, title: 'License Management'},
				(label({text: ''})), //empty
				(btnLicense=button({text: 'Button', onClicked: btn_callbackRelay})),
				(label({text: ''})), //empty
				(labelLicense1= label({text: ''})),
				(labelLicense2= label({text: ''})),
			)
		),
	);

win.show();
libui.startLoop();

module.exports = {
	setLabelText: function (text1, text2=null) { labelLicense1.setText(text1);  if (text2) {labelLicense2.setText(text2);}},

	setBtnText: function (text) { btnLicense.setText(text); },
	setBtnCallBack: function (cb) {callback_btn = cb; },
}