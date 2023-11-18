import { createEffect } from 'solid-js';

const InputRange = ({ value, onChange }) => {
    console.log('updated InputRange');
    // createEffect(() => console.log("The latest value is", value));
	return (
		<div class="pb-8">
          <label for="minmax-range" class="block mb-2 text-sm font-medium text-gray-900 text-white">Iterations Count ({value})</label>
          <input onInput={onChange} id="minmax-range" type="range" min="1" max="5" value={value()} class="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>
	);
};

export default InputRange;