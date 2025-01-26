import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
}

a {
    text-decoration: none;
    color: inherit;
}

a:hover {
    text-decoration: underline;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

button {
    cursor: pointer;
}

input, textarea {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 10px;
}

button {
    background: #007bff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #0056b3;
    }
}
`;

export default GlobalStyles;