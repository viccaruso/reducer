import { useEffect, useReducer } from 'react';
import styles from './Counter.css';

const colors = {
  yellow: 'rgb(236, 222, 153)',
  green: 'rgb(52, 211, 153)',
  red: 'rgb(239, 68, 68)',
};

const counterState = { count: 0, color: '' };

const reducer = (state, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'RESET':
      return { ...state, count: 0 };
    case 'CHANGE_COLOR':
      return { ...state, color: action.payload.color };
    default:
      throw new Error('Invalid action performed in reducer.');
  }
};

export default function Counter() {
  const [state, dispatch] = useReducer(reducer, counterState);

  useEffect(() => {
    if (state.count === 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.yellow } });
    }

    if (state.count > 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.green } });
    }

    if (state.count < 0) {
      dispatch({ type: 'CHANGE_COLOR', payload: { color: colors.red } });
    }
  }, [state.count]);

  const increment = () => {
    dispatch({ type: 'INCREMENT' });
  };

  const decrement = () => {
    dispatch({ type: 'DECREMENT' });
  };

  const reset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <main className={styles.main}>
      <h1 style={{ color: state.color }}>{state.count}</h1>
      <div>
        <button
          type="button"
          onClick={increment}
          aria-label="increment"
          style={{ backgroundColor: colors.green }}
        >
          Increment
        </button>
        <button
          type="button"
          onClick={decrement}
          aria-label="decrement"
          style={{ backgroundColor: colors.red }}
        >
          Decrement
        </button>
        <button
          type="button"
          aria-label="reset"
          onClick={reset}
          style={{ backgroundColor: colors.yellow }}
        >
          Reset
        </button>
      </div>
    </main>
  );
}
