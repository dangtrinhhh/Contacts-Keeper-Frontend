import React, { useEffect, useRef, memo } from 'react';

const Component = ({ product, onClose }) => {
    const componentRef = useRef(null);

    // Handle clicking outside of the component to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            console.log("🚀 ~ event.target:", event.target)
            if (componentRef.current && !componentRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={componentRef}
            style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'white',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
                border: '1px solid #000'
            }}
        >
            <h2>Device name: {product.name}</h2>
            <h2>Device status: {product.status}</h2>
            <button onClick={() => onClose()}>Hide</button>
        </div>
    );
};

export default memo(Component);


// import { useReducer } from "react";
// import React from "react";

// // Tên component trùng tên file

// // 1. Init state: 0
// // 2. Actions: Up (state + 1) / Down (state - 1)
// // 3. Reducer
// // 4. Dispatch

// const initialState = 0;

// const UP_ACTION = 'up';
// const DOWN_ACTION = 'down';

// const reducer = (state, action) => {
//     console.log('Reducer is running !');
//     switch(action) {
//         case UP_ACTION:
//             return state + 1;
//         case DOWN_ACTION:
//             return state - 1;
//         default:
//             throw new Error('Action is invalid!');
//     }
// };

// function Component() {
//     // const [count, setCount] = useState(0);
//     const [count, dispatch] = useReducer(reducer, initialState);

//     return (
//         <React.Fragment>
//             <div>{count}</div>
//             <button onClick={() => dispatch(DOWN_ACTION)}>Down</button>
//             <button onClick={() => dispatch(UP_ACTION)}>Up</button>
//         </React.Fragment>
//     )
// }

// export default Component