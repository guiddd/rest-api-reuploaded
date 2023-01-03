"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
require("./App.css");
const Home_1 = __importDefault(require("./components/Home"));
function App() {
    return (<div className='p-16 font-mono w-full flex justify-center '>
      <Home_1.default />
    </div>);
}
exports.default = App;
//# sourceMappingURL=App.js.map