import { createSignal, onCleanup, createEffect } from "solid-js";
import { render } from "solid-js/web";

import { InputSelect, InputRange } from './components';
import { updateShape, updateIterations } from './modules/threejs/three';
import './style.css';

const SHAPE_TYPES = [
	{ name: 'Circle', value: 'circles' },
	{ name: 'Square', value: 'squares' },
	{ name: 'Triangle', value: 'triangles' },
];

const Form = () => {
	const [shape, setShape] = createSignal(SHAPE_TYPES[1].value);
	const [iteration, setIteration] = createSignal(2);

	createEffect(() => {
		updateShape(shape());
		console.log('updated shape');
	});
	createEffect(() => {
		updateIterations(iteration());
		console.log('updated iteration');
	});

	return (
		<>
			<InputSelect
				options={SHAPE_TYPES}
				value={shape}
				onChange={(e) => setShape(e.target.value)}
			/>
			<InputRange
				value={iteration}
				onChange={(e) => setIteration(e.target.value)}
			/>
		</>
	);
};

render(() => <Form />, document.getElementById("app"));
