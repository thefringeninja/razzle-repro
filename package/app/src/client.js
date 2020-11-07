import React from 'react';
import {hydrate} from 'react-dom';
import {loadableReady} from "@loadable/component";

loadableReady().then(() => {
	hydrate(
		<div />,
		document.getElementById('root')
	);
});


if (module.hot) {
	module.hot.accept();
}
