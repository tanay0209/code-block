import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ICompilerSliceState = {
  code: {
    html:
      `<div class="container">
    <h1>Welcome to My Page</h1>
    <button onclick="changeBackgroundColor()">Change Background Color</button>
</div>
        `,
    css:
      `body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

.container {
  text-align: center;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}`,
    javascript:
      `function changeBackgroundColor() {
  const colors = ["#ffcccc", "#ccffcc", "#ccccff", "#ffffcc", "#ffccff"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
}

        `
  },
  currentLanguage: "html",
  isOwner: false
}

const compilerSlice = createSlice({
  name: "compilerSlice",
  initialState,
  reducers: {
    updateCurrentLanguage: (state, action: PayloadAction<ICompilerSliceState["currentLanguage"]>) => {
      state.currentLanguage = action.payload
    },
    updateCode: (state, action: PayloadAction<string>) => {
      state.code[state.currentLanguage] = action.payload
    },
    updateEntireCode: (state, action: PayloadAction<ICodeStructure>) => {
      state.code = action.payload
    },
    updateCodeOwner: (state, action: PayloadAction<boolean>) => {
      state.isOwner = action.payload
    }
  }
})

export default compilerSlice.reducer

export const { updateCurrentLanguage, updateCode, updateEntireCode, updateCodeOwner } = compilerSlice.actions